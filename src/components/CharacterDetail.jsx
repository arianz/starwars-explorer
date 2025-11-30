// pages/CharacterDetail.jsx (hanya ganti bagian imageUrl)
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
      <Link to="/characters" className="btn btn-warning mb-4 fw-bold">← Back to Galaxy</Link>
      
      <div className="row g-5 align-items-center">
        <div className="col-md-5 text-center">
          <img 
            src={`/images/characters/${imageFile}.jpg`}
            alt={char.name}
            className="img-fluid rounded-4 shadow-lg"
            style={{ maxHeight: '550px', objectFit: 'cover' }}
            onError={(e) => e.target.src = '/images/characters/unknown.jpg'}
          />
          <h1 className="mt-4 text-warning display-5 fw-bold">{char.name}</h1>
        </div>

        <div className="col-md-7">
          <div className="card bg-dark text-light border-warning">
            <div className="card-body">
              <h3 className="text-warning mb-4">Character Profile</h3>
              <table className="table table-dark table-striped">
                <tbody>
                  <tr><td width="40%">Homeworld</td><td><strong>{homeworld}</strong></td></tr>
                  <tr><td>Birth Year</td><td><strong>{char.birth_year}</strong></td></tr>
                  <tr><td>Height</td><td><strong>{char.height} cm</strong></td></tr>
                  <tr><td>Mass</td><td><strong>{char.mass} kg</strong></td></tr>
                  <tr><td>Eye Color</td><td><strong>{char.eye_color}</strong></td></tr>
                  <tr><td>Species</td><td><strong>{species}</strong></td></tr>
                </tbody>
              </table>

              {films.length > 0 && (
                <>
                  <h4 className="text-warning mt-4">Appears in</h4>
                  <div className="row">
                    {films.map((film, i) => (
                      <div key={i} className="col-6 mb-2">
                        <span className="badge bg-warning text-dark fs-6">{film}</span>
                      </div>
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