import { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import SpeciesDetail from '../components/SpeciesDetail';
import { searchSpecies } from '../services/swapi';
import speciesImage from '../data/speciesImage';
import '../styles/Species.css';

const ITEMS_PER_PAGE = 8;

export default function Species() {
  const [allSpecies, setAllSpecies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
          Object.keys(speciesImage).includes(s.name)
        );

        all = [...all, ...filtered];

        if (!res.data.next) break;
        page++;
      }

      const sorted = all.sort((a, b) => {
        const keys = Object.keys(speciesImage);
        return keys.indexOf(a.name) - keys.indexOf(b.name);
      });

      setAllSpecies(sorted);
    } catch (err) {
      console.error('Error fetching species:', err);
      setAllSpecies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecies();
  }, []);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSpecies = allSpecies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalSpecies = allSpecies.length;
  const totalPages = Math.ceil(totalSpecies / ITEMS_PER_PAGE);

  const goToPrevious = () => {
    setCurrentPage(prev => prev === 1 ? totalPages : prev - 1);
  };

  const goToNext = () => {
    setCurrentPage(prev => prev === totalPages ? 1 : prev + 1);
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <Loader />
      </div>
    );
  }

  if (totalSpecies === 0) {
    return <p className="text-center text-light mt-5 display-6">No species found.</p>;
  }

  return (
    <div className="container py-5">
      <h1 className="text-center text-warning display-5 mb-5">
        SPECIES
      </h1>

      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3 justify-content-center mb-5">
        {currentSpecies.map((s) => {
          const imgKey = speciesImage[s.name] || 'unknown';
          return (
            <div className="col" key={s.url}>
              <div
                className="text-center cursor-pointer species-card"
                onClick={() => setSelected(s)}
              >
                <div className="species-circle mx-auto mb-3 rounded-circle overflow-hidden border border-warning border-2 shadow-lg hover-shadow-lg transition">
                  <img
                    src={`/images/species/${imgKey}.jpg`}
                    alt={s.name}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                    onError={(e) => (e.target.src = '/images/species/unknown.jpg')}
                  />
                </div>
                <h5 className="text-light mt-2 text-shadow species-title">
                  {s.name.toLowerCase()}
                </h5>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center text-light mb-4">
        Showing <strong>{startIndex + 1}</strong> – <strong>{Math.min(startIndex + ITEMS_PER_PAGE, totalSpecies)}</strong> of <strong>{totalSpecies}</strong> species
      </div>

      <nav aria-label="Species pagination" className="d-flex justify-content-center">
        <ul className="pagination pagination-lg">
          <li className="page-item">
            <button
              className="page-link bg-transparent text-warning border-warning pagination-btn"
              onClick={goToPrevious}
              aria-label="Previous page"
            >
              <span aria-hidden="true">Previous</span>
            </button>
          </li>

          <li className="page-item disabled">
            <span className="page-link bg-warning border-warning text-dark fw-bold">
              {currentPage} / {totalPages}
            </span>
          </li>

          <li className="page-item">
            <button
              className="page-link bg-transparent text-warning border-warning pagination-btn"
              onClick={goToNext}
              aria-label="Next page"
            >
              <span aria-hidden="true">Next</span>
            </button>
          </li>
        </ul>
      </nav>

      {selected && (
        <SpeciesDetail species={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}