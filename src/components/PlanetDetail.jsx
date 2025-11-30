import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPlanet, getFilms } from '../services/swapi';
import Loader from './Loader';

export default function PlanetDetail() {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const planetRes = await getPlanet(id);
        const p = planetRes.data;
        setPlanet(p);

        const filmData = await getFilms(p.films);
        setFilms(filmData.map(f => f.data.title));
      } catch (err) {
        console.error('Gagal load detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
      <Loader />
    </div>
  );

  if (!planet) return <p className="text-center text-warning py-5">Planet not found</p>;

  return (
    <div className="container py-5" style={{ position: 'relative', zIndex: 1 }}>
      <Link to="/planets" className="btn btn-warning mb-4 fw-bold">Back to Planets</Link>
      <h1 className="text-center text-warning mb-5">{planet.name}</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-dark text-light">
            <div className="card-body">
              <h3 className="text-warning mb-4">Basic Info</h3>
              <table className="table table-dark table-striped">
                <tbody>
                  <tr><td>Population</td><td><strong>{planet.population === 'unknown' ? '???' : Number(planet.population).toLocaleString()}</strong></td></tr>
                  <tr><td>Climate</td><td><strong>{planet.climate}</strong></td></tr>
                  <tr><td>Terrain</td><td><strong>{planet.terrain}</strong></td></tr>
                  <tr><td>Diameter</td><td><strong>{planet.diameter} km</strong></td></tr>
                  <tr><td>Gravity</td><td><strong>{planet.gravity}</strong></td></tr>
                  <tr><td>Surface Water</td><td><strong>{planet.surface_water}%</strong></td></tr>
                  <tr><td>Rotation Period</td><td><strong>{planet.rotation_period} hours</strong></td></tr>
                  <tr><td>Orbital Period</td><td><strong>{planet.orbital_period} days</strong></td></tr>
                </tbody>
              </table>

              {planet.residents.length > 0 && (
                <>
                  <h3 className="text-warning mt-5 mb-3">Notable Residents</h3>
                  <ul className="list-group">
                    {planet.residents.map((res, i) => {
                      const resId = res.split('/').slice(-2, -1)[0];
                      return (
                        <li key={i} className="list-group-item bg-secondary text-light">
                          <Link to={`/character/${resId}`} className="text-warning">Resident ID: {resId}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}

              {films.length > 0 && (
                <>
                  <h3 className="text-warning mt-5 mb-3">Appears in Films</h3>
                  <ol className="list-group list-group-numbered">
                    {films.map((f, i) => (
                      <li key={i} className="list-group-item bg-secondary text-light border-warning">
                        {f}
                      </li>
                    ))}
                  </ol>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}