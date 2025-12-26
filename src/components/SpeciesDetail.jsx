import { useState, useEffect } from 'react';
import speciesImage from "../data/speciesImage";
import { getPlanet } from '../services/swapi';

export default function SpeciesDetail({ species, onClose }) {
  const imageName = speciesImage[species.name] || 'unknown';
  const [homeworldName, setHomeworldName] = useState('Loading...');
  const [loadingHomeworld, setLoadingHomeworld] = useState(true);

  useEffect(() => {
    const fetchHomeworld = async () => {
      if (!species.homeworld) {
        setHomeworldName('Unknown');
        setLoadingHomeworld(false);
        return;
      }

      try {
        // Ambil ID planet dari URL
        const planetId = species.homeworld.split('/').filter(Boolean).pop();
        const res = await getPlanet(planetId);
        setHomeworldName(res.data.name);
      } catch (err) {
        console.error('Gagal fetch homeworld:', err);
        setHomeworldName('Unknown');
      } finally {
        setLoadingHomeworld(false);
      }
    };

    fetchHomeworld();
  }, [species]);

  return (
    <>
      <div 
        className="modal fade show d-block" 
        tabIndex="-1" 
        onClick={onClose}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div 
            className="modal-content bg-black bg-opacity-75 text-light border border-warning border-2 shadow-lg" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="modal-header border-0 pb-2">
              <h3 className="modal-title text-warning w-100 text-center fs-2">
                {species.name}
              </h3>
            </div>

            {/* Body */}
            <div className="modal-body pt-2">
              <div className="row align-items-center g-4">
                <div className="col-md-5 text-center">
                  <div className="position-relative d-inline-block">
                    <img
                      src={`/images/species/${imageName}.jpg`}
                      alt={species.name}
                      className="img-fluid rounded-circle border border-warning border-2 shadow-lg"
                      style={{
                        width: '250px',
                        height: '250px',
                        objectFit: 'cover',
                      }}
                      onError={(e) => (e.target.src = '/images/species/unknown.jpg')}
                    />
                  </div>
                </div>

                {/* Detail Info */}
                <div className="col-md-7">
                  <div className="bg-transparent rounded-3 p-4">
                    <table className="table table-dark table-striped mb-0">
                      <tbody>
                        <tr>
                          <td className="text-warning py-2">Classification</td>
                          <td className="text-capitalize py-2">{species.classification}</td>
                        </tr>
                        <tr>
                          <td className="text-warning py-2">Average Height</td>
                          <td className="py-2">
                            {species.average_height === 'unknown' ? 'Unknown' : `${species.average_height} cm`}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-warning py-2">Average Lifespan</td>
                          <td className="py-2">
                            {species.average_lifespan === 'unknown' 
                              ? 'Unknown' 
                              : species.average_lifespan === 'indefinite'
                              ? 'Indefinite'
                              : `${species.average_lifespan} years`
                            }
                          </td>
                        </tr>
                        <tr>
                          <td className="text-warning py-2">Language</td>
                          <td className="text-capitalize py-2">{species.language}</td>
                        </tr>
                        <tr>
                          <td className="text-warning py-2">Homeworld</td>
                          <td className="py-2">
                            {loadingHomeworld ? (
                              <span className="text-muted fst-italic">Loading planet...</span>
                            ) : (
                              homeworldName === '' ? 'Unknown' : homeworldName
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer border-0 justify-content-center pb-4">
              <button 
                type="button" 
                className="btn btn-outline-warning btn-lg px-5" 
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}