import { Link } from 'react-router-dom';
import characterImage from '../data/characterImage';
import '../styles/CharacterCard.css';

export default function CharacterCard({ character }) {
  const id = character.url.split('/').slice(-2, -1)[0];
  const imageFile = characterImage[character.name] || 'unknown';

  return (
    <Link to={`/character/${id}`} className="text-decoration-none d-block">
      <div className="character-card position-relative overflow-hidden rounded shadow">
        <div className="image-container">
          <img 
            src={`/images/characters/${imageFile}.jpg`}
            alt={character.name}
            className="character-img"
            onError={(e) => {
              e.target.src = '/images/characters/unknown.jpg';
            }}
          />
        </div>
        <div className="character-overlay position-absolute bottom-0 start-0 end-0 bg-gradient-dark p-3">
          <h5 className="character-name text-light mb-0 text-center fw-bold">
            {character.name}
          </h5>
        </div>
      </div>
    </Link>
  );
}