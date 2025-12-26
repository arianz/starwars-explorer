import { Link } from 'react-router-dom';
import planetImageMap from '../data/planetImage';
import '../styles/PlanetCard.css';

const DEFAULT_IMAGE = '/images/planets/placeholder.png';

export default function PlanetCard({ planet, size = 'medium' }) {
  const planetName = planet.name.toLowerCase().trim();
  const imageFileName = planetImageMap[planetName] || planetName.replace(/\s+/g, '-');
  const imageSrc = `/images/planets/${imageFileName}.png`;

  return (
    <div className={`planet-card ${size}`} style={{ pointerEvents: 'none' }}>
      <Link to={`/planet/${planet.url.split('/').slice(-2, -1)[0]}`} className="planet-link" style={{ pointerEvents: 'auto' }}>
        <div className="planet-image">
          <img
            src={imageSrc}
            alt={planet.name}
            onError={(e) => {
              e.target.src = DEFAULT_IMAGE;
            }}
          />
        </div>
      </Link>
    </div>
  );
}