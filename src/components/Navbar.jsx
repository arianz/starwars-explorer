import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      {/* Navbar Utama */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent sticky-top" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1050 }}>
        <div className="container mt-2">
          <NavLink to="/" className="navbar-brand">
            <img 
              src="https://www.freepnglogos.com/uploads/star-wars-logo-png-10.png" 
              alt="Star Wars Logo" 
              style={{ height: '40px' }}
            />
          </NavLink>

          {/* Toggler */}
          <button 
            className="navbar-toggler"
            type="button"
            onClick={() => setShowMobileMenu(true)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Desktop Menu */}
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto gap-4">
              <li><NavLink to="/" end className="nav-link text-light">Home</NavLink></li>
              <li><NavLink to="/characters" className="nav-link text-light">Characters</NavLink></li>
              <li><NavLink to="/planets" className="nav-link text-light">Planets</NavLink></li>
              <li><NavLink to="/species" className="nav-link text-light">Species</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Popup Menu — Clean & Simple */}
      {showMobileMenu && (
        <div className="mobile-menu-overlay" onClick={() => setShowMobileMenu(false)}>
          <div className="mobile-menu-content" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="mobile-menu-header">
              <img 
                src="https://www.freepnglogos.com/uploads/star-wars-logo-png-10.png" 
                alt="Star Wars" 
                className="mobile-logo"
              />
              <button 
                className="btn-close-mobile"
                onClick={() => setShowMobileMenu(false)}
              >
                ×
              </button>
            </div>

            {/* Menu Links */}
            <ul className="mobile-menu-list">
              <li><NavLink to="/" end onClick={() => setShowMobileMenu(false)} className="mobile-menu-link">Home</NavLink></li>
              <li><NavLink to="/characters" onClick={() => setShowMobileMenu(false)} className="mobile-menu-link">Characters</NavLink></li>
              <li><NavLink to="/planets" onClick={() => setShowMobileMenu(false)} className="mobile-menu-link">Planets</NavLink></li>
              <li><NavLink to="/species" onClick={() => setShowMobileMenu(false)} className="mobile-menu-link">Species</NavLink></li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}