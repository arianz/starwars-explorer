import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import CharacterCard from '../components/CharacterCard';
import Loader from '../components/Loader';
import { searchCharacters } from '../services/swapi';
import '../styles/Characters.css';

const ITEMS_PER_PAGE = 8;

export default function Characters() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchAllCharacters = async (query = '') => {
    setLoading(true);
    let all = [];
    let page = 1;

    try {
      while (true) {
        const res = await searchCharacters(query, page);
        if (!res.data.results.length) break;

        all = [...all, ...res.data.results];

        if (!res.data.next) break;
        page++;
      }
      setAllCharacters(all);
    } catch (err) {
      console.error('Failed to fetch characters:', err);
      setAllCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchAllCharacters(searchQuery);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue.trim());
  };

  const filteredCharacters = allCharacters;
  const totalFiltered = filteredCharacters.length;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalFiltered);
  const currentCharacters = filteredCharacters.slice(startIndex, endIndex);

  const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE);

  const goToPrevious = () => {
    setCurrentPage(prev => prev === 1 ? totalPages || 1 : prev - 1);
  };

  const goToNext = () => {
    setCurrentPage(prev => prev === totalPages ? 1 : prev + 1);
  };

  const displayedCount = currentCharacters.length;
  let gridColsClass = 'row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4';
  
  if (displayedCount <= 2) {
    gridColsClass = 'row-cols-2 row-cols-sm-2';
  } else if (displayedCount <= 4) {
    gridColsClass = 'row-cols-2 row-cols-sm-2 row-cols-md-3';
  } else if (displayedCount <= 6) {
    gridColsClass = 'row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4';
  }

  return (
    <div className="container py-5">
      <h1 className="text-center text-warning mb-4 display-5">
        CHARACTERS
      </h1>

      <SearchBar
        query={inputValue}
        setQuery={setInputValue}
        onSearch={handleSearch}
        placeholder="Search characters by name..."
        className="mb-5"
      />

      {loading ? (
        <div className="text-center py-5">
          <Loader />
          <p className="text-light mt-4 fs-5">
            Retrieving data from the Jedi Archives...
          </p>
        </div>
      ) : totalFiltered === 0 ? (
        <div className="text-center py-5">
          <h3 className="text-light opacity-75">
            {searchQuery ? `No characters found for "${searchQuery}"` : 'No characters available'}
          </h3>
        </div>
      ) : (
        <>
          <div className={`row g-4 justify-content-center mb-5 ${gridColsClass}`}>
            {currentCharacters.map((c) => (
              <div key={c.url} className="col">
                <CharacterCard character={c} />
              </div>
            ))}
          </div>

          <div className="text-center text-light mb-4">
            {searchQuery ? (
              <span>
                Found <strong>{totalFiltered}</strong> character{totalFiltered > 1 ? 's' : ''} for "<strong>{searchQuery}</strong>"
                {totalFiltered > ITEMS_PER_PAGE && (
                  <> • Showing <strong>{startIndex + 1}</strong> - <strong>{endIndex}</strong></>
                )}
              </span>
            ) : (
              <span>
                Showing <strong>{startIndex + 1}</strong> - <strong>{endIndex}</strong> of <strong>{totalFiltered}</strong> characters
              </span>
            )}
          </div>

          {totalPages > 1 && (
            <nav aria-label="Character pagination" className="d-flex justify-content-center">
              <ul className="pagination pagination-lg">
                <li className="page-item">
                  <button
                    className="page-link bg-transparent text-warning border-warning pagination-btn"
                    onClick={goToPrevious}
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
                  >
                    <span aria-hidden="true">Next</span>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
}