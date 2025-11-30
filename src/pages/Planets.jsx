import { useState, useEffect, useRef } from 'react';
import PlanetCard from '../components/PlanetCard';
import Loader from '../components/Loader';
import { searchPlanets } from '../services/swapi';
import featuredPlanetNames from '../data/featuredPlanets';

export default function Planets() {
  const [planets, setPlanets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Touch swipe refs
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Fetch semua featured planets (tanpa search)
  const fetchAllPlanets = async () => {
    setLoading(true);
    let allPlanets = [];
    let page = 1;

    try {
      while (true) {
        const res = await searchPlanets('', page);
        if (!res.data.results.length) break;

        const filtered = res.data.results.filter(planet =>
          featuredPlanetNames.includes(planet.name)
        );
        allPlanets = [...allPlanets, ...filtered];

        if (!res.data.next) break;
        page++;
      }

      // Urutkan sesuai featuredPlanetNames
      const sortedPlanets = allPlanets.sort((a, b) => {
        const indexA = featuredPlanetNames.indexOf(a.name);
        const indexB = featuredPlanetNames.indexOf(b.name);
        return indexA - indexB;
      });

      setPlanets(sortedPlanets);
      setCurrentIndex(0);
    } catch (err) {
      console.error('Error fetching planets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPlanets();
  }, []);

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + planets.length) % planets.length);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % planets.length);
  };

  // Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
  };

  if (loading) return <Loader />;
  if (planets.length === 0) return <p className="text-center text-light mt-5">No planets found.</p>;

  const currentPlanet = planets[currentIndex];

  return (
    <div className="single-planet-page">
      <div className="container py-5">
        <h1 className="text-center text-warning display-5 mb-4">PLANETS OF THE GALAXY</h1>

        {/* MAIN SHOWCASE */}
        <div
          className="planet-showcase"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >

          {/* Panah hanya di desktop */}
          {planets.length > 1 && (
            <>
              <button className="nav-arrow left desktop-only" onClick={goToPrev}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="nav-arrow right desktop-only" onClick={goToNext}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </>
          )}

          {/* Orbit Planets */}
          <div className="planets-orbit-container">
            <div className="prev-planet">
              <PlanetCard
                planet={planets[(currentIndex - 1 + planets.length) % planets.length]}
                size="tiny"
              />
            </div>

            <div className="center-planet-wrapper">
              <PlanetCard planet={currentPlanet} size="hero" />
            </div>

            <div className="next-planet">
              <PlanetCard
                planet={planets[(currentIndex + 1) % planets.length]}
                size="tiny"
              />
            </div>
          </div>

          {/* Infinite Dot Indicator (mobile only) */}
          <div className="dot-indicator mobile-only">
            {(() => {
              const total = planets.length;
              const visible = 5;
              const half = Math.floor(visible / 2);
              const dots = [];

              for (let i = -half; i <= half; i++) {
                const index = (currentIndex + i + total) % total;
                const distance = Math.abs(i);
                const isActive = i === 0;
                const isNearEdge = distance === half;

                dots.push(
                  <span
                    key={index}
                    className={`infinite-dot ${isActive ? 'active' : ''}`}
                    style={{
                      opacity: isActive ? 1 : isNearEdge ? 0.4 : 0.7,
                      transform: `scale(${isActive ? 1.6 : isNearEdge ? 0.6 : 0.9})`,
                    }}
                    onClick={() => setCurrentIndex(index)}
                  />
                );
              }
              return dots;
            })()}
          </div>

          {/* Planet Details */}
          <div className="planet-details">
            <h2 className="planet-title">{currentPlanet.name.toLowerCase()}</h2>
          </div>
        </div>

        {/* Counter di bawah */}
        <div className="text-center text-light opacity-75">
          <strong>{currentIndex + 1}</strong> / <strong>{planets.length}</strong>
        </div>
      </div>
    </div>
  );
}