// pages/Species.jsx
import { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import SpeciesDetail from '../components/SpeciesDetail';        
import { searchSpecies } from '../services/swapi';
import spesiesImage from '../data/spesiesImage';                  

export default function Species() {
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchSpecies = async () => {
    setLoading(true);
    let all = [];
    let page = 1;

    try {
      while (true) {
        const res = await searchSpecies('', page);
        if (!res.data.results.length) break;

        const filtered = res.data.results.filter(s =>
          Object.keys(spesiesImage).includes(s.name)
        );

        all = [...all, ...filtered];

        if (!res.data.next) break;
        page++;
      }

      const sorted = all.sort((a, b) => {
        const keys = Object.keys(spesiesImage);
        return keys.indexOf(a.name) - keys.indexOf(b.name);
      });

      setSpecies(sorted);
    } catch (err) {
      console.error('Error fetching species:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecies();
  }, []);

  if (loading) return <Loader />;
  if (species.length === 0) return <p className="text-center text-light mt-5">No species found.</p>;

  return (
    <div className="container py-5">
      <h1 className="text-center text-warning display-5 mb-5">
        SPECIES OF THE GALAXY
      </h1>

      <div className="row row-cols-2 row-cols-md-4 row-cols-lg-5 g-3 g-lg-4 justify-content-center">
        {species.map((s) => {
          const imgKey = spesiesImage[s.name];
          return (
            <div className="col" key={s.url}>
              <div
                className="text-center cursor-pointer"
                onClick={() => setSelected(s)}
              >
                <div className="species-circle mx-auto mb-3 rounded-circle overflow-hidden border border-warning border-1 shadow-lg">
                  <img
                    src={`/images/species/${imgKey}.jpg`}
                    alt={s.name}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                    onError={(e) => e.target.src = '/images/species/unknown.jpg'}
                  />
                </div>
                <h5 className="text-light mt-2">
                  {s.name.toUpperCase()}
                </h5>
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <SpeciesDetail species={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}