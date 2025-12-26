import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPlanet, getFilms, getCharacter } from '../services/swapi'; // Tambah getCharacter
import characterImage from '../data/characterImage'; // Pakai mapping gambar yang sama
import Loader from './Loader';

export default function PlanetDetail() {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [films, setFilms] = useState([]);
  const [residents, setResidents] = useState([]); // Array objek {id, name, imageFile}
  const [loading, setLoading] = useState(true);
  const [loadingResidents, setLoadingResidents] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const planetRes = await getPlanet(id);
        const p = planetRes.data;
        setPlanet(p);

        if (p.films.length > 0) {
          const filmData = await getFilms(p.films);
          setFilms(filmData.map(f => f.data.title));
        }

        // Fetch residents
        if (p.residents.length > 0) {
          setLoadingResidents(true);
          const residentPromises = p.residents.map(async (url) => {
            try {
              const resId = url.split('/').slice(-2, -1)[0];
              const charRes = await getCharacter(resId);
              const char = charRes.data;
              const imageFile = characterImage[char.name] || 'unknown';
              return { id: resId, name: char.name, imageFile };
            } catch (err) {
              console.error('Gagal fetch resident:', err);
              return null;
            }
          });

          const residentData = (await Promise.all(residentPromises)).filter(Boolean);
          setResidents(residentData);
        } else {
          setResidents([]);
        }
      } catch (err) {
        console.error('Gagal load detail planet:', err);
      } finally {
        setLoading(false);
        setLoadingResidents(false);
      }
    };
    fetchAll();
  }, [id]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-transparent">
        <Loader />
      </div>
    );
  }

  if (!planet) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-warning">Planet not found</h2>
        <Link to="/planets" className="btn btn-outline-warning mt-4">← Back to Planets</Link>
      </div>
    );
  }

  const formattedPopulation = planet.population === 'unknown' 
    ? 'Unknown' 
    : Number(planet.population).toLocaleString();

  return (
    <div className="container py-5">
      <Link 
        to="/planets" 
        className="btn btn-outline-warning btn-lg mb-4 fw-medium d-inline-flex align-items-center gap-2"
      >
        Back to Planets
      </Link>

      <h1 className="display-4 text-center text-warning mt-5 mb-3 fw-bold">
        {planet.name}
      </h1>

      <div className="row justify-content-center">
        <div className="col-lg-10 col-xxl-9">
          <div className="card bg-transparent text-light shadow-lg">
            <div className="card-body">
              <h4 className="text-warning mb-3">Basic Information</h4>
              <table className="table table-dark table-striped mb-5">
                <tbody>
                  <tr><td className="fw-bold text-warning w-50">Population</td><td>{formattedPopulation}</td></tr>
                  <tr><td className="fw-bold text-warning">Climate</td><td className="text-capitalize">{planet.climate}</td></tr>
                  <tr><td className="fw-bold text-warning">Terrain</td><td className="text-capitalize">{planet.terrain}</td></tr>
                  <tr><td className="fw-bold text-warning">Diameter</td><td>{planet.diameter === 'unknown' ? 'Unknown' : `${Number(planet.diameter).toLocaleString()} km`}</td></tr>
                  <tr><td className="fw-bold text-warning">Gravity</td><td>{planet.gravity}</td></tr>
                  <tr><td className="fw-bold text-warning">Surface Water</td><td>{planet.surface_water === 'unknown' ? 'Unknown' : `${planet.surface_water}%`}</td></tr>
                  <tr><td className="fw-bold text-warning">Rotation Period</td><td>{planet.rotation_period} hours</td></tr>
                  <tr><td className="fw-bold text-warning">Orbital Period</td><td>{planet.orbital_period} days</td></tr>
                </tbody>
              </table>

              {/* Notable Residents dengan Foto & Nama */}
              {planet.residents.length > 0 && (
                <div className="mb-5">
                  <h4 className="text-warning mb-3">Notable Residents</h4>
                  {loadingResidents ? (
                    <div className="text-center py-4">
                      <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Loading residents...</span>
                      </div>
                    </div>
                  ) : residents.length > 0 ? (
                    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                      {residents.map((resident) => (
                        <div key={resident.id} className="col">
                          <Link to={`/character/${resident.id}`} className="text-decoration-none">
                            <div className="position-relative rounded overflow-hidden shadow-sm hover-shadow-lg transition-all" style={{ height: '220px' }}>
                              <img
                                src={`/images/characters/${resident.imageFile}.jpg`}
                                alt={resident.name}
                                className="w-100 h-100"
                                style={{ objectFit: 'cover' }}
                                onError={(e) => (e.target.src = '/images/characters/unknown.jpg')}
                              />
                              {/* Overlay Gradient + Nama */}
                              <div className="position-absolute bottom-0 start-0 end-0 p-3 text-center"
                                  style={{
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))',
                                  }}>
                                <h6 className="text-warning fw-medium mb-0 fs-5 text-shadow">
                                  {resident.name}
                                </h6>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No notable residents found</p>
                  )}
                </div>
              )}

              {/* Appears in Films */}
              {films.length > 0 && (
                <div>
                  <h4 className="text-warning mb-3">Appears in Films</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {films.map((film, i) => (
                      <span key={i} className="badge bg-warning text-dark fs-6 px-3 py-2 rounded-pill">
                        {film}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}