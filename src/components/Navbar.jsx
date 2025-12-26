import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Navbar.css';

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const activeStyle = {
    borderBottom: '2px solid #FFE81F'
  };

  const inactiveStyle = {
    color: '#ffffff'
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent sticky-top" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1050 }}>
        <div className="container mt-2">
          <NavLink to="/" className="navbar-brand">
            <img 
              src="images/star-wars-logo.png" 
              alt="Star Wars Logo" 
              style={{ height: '40px' }}
            />
          </NavLink>

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
              <li><NavLink to="/" end style={({ isActive }) => isActive ? activeStyle : inactiveStyle} className="nav-link text-light">Home</NavLink></li>
              <li><NavLink to="/characters" style={({ isActive }) => isActive ? activeStyle : inactiveStyle} className="nav-link text-light">Characters</NavLink></li>
              <li><NavLink to="/planets" style={({ isActive }) => isActive ? activeStyle : inactiveStyle} className="nav-link text-light">Planets</NavLink></li>
              <li><NavLink to="/species" style={({ isActive }) => isActive ? activeStyle : inactiveStyle} className="nav-link text-light">Species</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>

      {showMobileMenu && (
        <div className="mobile-menu-overlay" onClick={() => setShowMobileMenu(false)}>
          <div className="mobile-menu-content" onClick={e => e.stopPropagation()}>
            
            <div className="mobile-menu-header">
              <img 
                src="images/star-wars-logo.png" 
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