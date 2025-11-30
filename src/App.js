import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Characters from './pages/Characters';
import Planets from './pages/Planets';
import Species from './pages/Species';
import CharacterDetail from './components/CharacterDetail';
import PlanetDetail from './components/PlanetDetail';
import SpeciesDetail from './components/SpeciesDetail';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/planet/:id" element={<PlanetDetail />} />
        <Route path="/species" element={<Species />} />
        <Route path="/species/:id" element={<SpeciesDetail />} />
      </Routes>
    </Router>
  );
}