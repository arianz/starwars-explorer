import { Link } from 'react-router-dom';
import characterImage from '../data/characterImage';

export default function CharacterCard({ character }) {
  const id = character.url.split('/').slice(-2, -1)[0];
  
  // Coba cari di mapping lokal, kalau nggak ada → fallback placeholder
  const imageFile = characterImage[character.name] || 'unknown';

  return (
    <Link to={`/character/${id}`} className="text-decoration-none d-block">
      <div className="character-card position-relative overflow-hidden rounded shadow">
        <img 
          src={`/images/characters/${imageFile}.jpg`}
          alt={character.name}
          className="character-img w-100 h-100"
          style={{ objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = '/images/characters/unknown.jpg'; // fallback
          }}
        />
        <div className="character-overlay position-absolute bottom-0 start-0 end-0 bg-gradient-dark p-3">
          <h5 className="character-name text-light mb-0 text-center fw-bold">
            {character.name}
          </h5>
        </div>
      </div>
    </Link>
  );
}