import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import CharacterCard from '../components/CharacterCard';
import Loader from '../components/Loader';
import { searchCharacters } from '../services/swapi';

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const fetchAllCharacters = async (searchQuery = '') => {
    setLoading(true);
    let all = [];
    let page = 1;

    try {
      while (true) {
        const res = await searchCharacters(searchQuery, page);
        if (!res.data.results.length) break;

        all = [...all, ...res.data.results];

        if (!res.data.next) {
          setHasMore(false);
          break;
        }
        page++;
      }
      setCharacters(all);
    } catch (err) {
      console.error('Failed to fetch characters:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCharacters(query);
  }, [query]);

  return (
    <div className="container py-5">
      <h1 className="text-center text-warning mb-4 display-5">CHARACTERS</h1>
      
      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={(e) => e.preventDefault()}
        placeholder="Search characters..."
      />

      {loading ? (
        <div className="text-center py-5">
          <Loader />
          <p className="text-light mt-3">Loading all characters from a galaxy far, far away...</p>
        </div>
      ) : characters.length === 0 ? (
        <p className="text-center text-light">No characters found.</p>
      ) : (
        <>
          <div className="masonry-grid">
            {characters.map((c) => (
              <div key={c.url} className="masonry-item">
                <CharacterCard character={c} />
              </div>
            ))}
          </div>

          {!hasMore && (
            <div className="text-center mt-5">
              <p className="text-light opacity-75">
                You've explored all characters in the galaxy!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}