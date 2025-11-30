export default function Home() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center text-center px-4">
      <div>
        <img 
          src="http://bit.ly/4hTiM8X" 
          alt="Star Wars Logo" 
          className="img-fluid mb-5 animate__animated animate__fadeIn" 
          style={{ maxWidth: '250px' }} // Ukuran logo rapi
        />
        <h2 className="display-5 text-light mb-4 animate__animated animate__fadeIn animate__delay-1s">
          GALAXY EXPLORER
        </h2>
        <p className="lead text-light mb-4 animate__animated animate__fadeIn animate__delay-2s">
          Jelajahi ribuan karakter, planet, film, dan spesies dari galaksi yang jauh, jauh sekali...
        </p>
      </div>
    </div>
  );
}