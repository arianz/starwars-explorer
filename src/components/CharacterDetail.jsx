import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCharacter, getHomeworld, getFilms } from '../services/swapi';
import characterImage from '../data/characterImage';
import Loader from '../components/Loader';

export default function CharacterDetail() {
  const { id } = useParams();
  const [char, setChar] = useState(null);
  const [homeworld, setHomeworld] = useState('...');
  const [films, setFilms] = useState([]);
  const [species, setSpecies] = useState('...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const charRes = await getCharacter(id);
        const c = charRes.data;
        setChar(c);

        const [hw, filmData, speciesData] = await Promise.all([
          c.homeworld ? getHomeworld(c.homeworld) : { data: { name: 'Unknown' } },
          getFilms(c.films),
          c.species.length ? getHomeworld(c.species[0]) : { data: { name: 'Human' } }
        ]);

        setHomeworld(hw.data.name);
        setFilms(filmData.map(f => f.data.title));
        setSpecies(speciesData.data.name);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id]);

  if (loading || !char) return <Loader fullScreen />;

  const imageFile = characterImage[char.name] || 'unknown';

  return (
    <div className="container py-5">
      <Link 
        to="/characters" 
        className="btn btn-outline-warning btn-lg mb-4 fw-medium d-inline-flex align-items-center"
      >
        Back to Galaxy
      </Link>

      <div className="card bg-transparent text-light shadow-lg">
        <div className="row g-0">
          {/* Gambar di kiri (full lebar di HP) */}
          <div className="col-md-5 border border-warning border-2 rounded-3">
            <img
              src={`/images/characters/${imageFile}.jpg`}
              alt={char.name}
              className="img-fluid rounded h-100"
              style={{ objectFit: 'cover', minHeight: '500px' }}
              onError={(e) => (e.target.src = '/images/characters/unknown.jpg')}
            />
          </div>

          {/* Detail di kanan */}
          <div className="col-md-7">
            <div className="card-body p-4">
              <h1 className="card-title text-warning text-center display-4 fw-bold mb-4">
                {char.name}
              </h1>

              <table className="table table-dark table-striped mb-4">
                <tbody>
                  <tr>
                    <td className="w-50 fw-medium text-warning">Homeworld</td>
                    <td>{homeworld}</td>
                  </tr>
                  <tr>
                    <td className="fw-medium text-warning">Birth Year</td>
                    <td>{char.birth_year}</td>
                  </tr>
                  <tr>
                    <td className="fw-medium text-warning">Height</td>
                    <td>{char.height} cm</td>
                  </tr>
                  <tr>
                    <td className="fw-medium text-warning">Mass</td>
                    <td>{char.mass} kg</td>
                  </tr>
                  <tr>
                    <td className="fw-medium text-warning">Eye Color</td>
                    <td className="text-capitalize">{char.eye_color}</td>
                  </tr>
                  <tr>
                    <td className="fw-medium text-warning">Species</td>
                    <td>{species}</td>
                  </tr>
                </tbody>
              </table>

              {films.length > 0 && (
                <>
                  <h4 className="text-warning mb-3">Appears in Films</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {films.map((film, i) => (
                      <span 
                        key={i} 
                        className="badge bg-warning text-dark fs-6 px-3 py-2"
                      >
                        {film}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}