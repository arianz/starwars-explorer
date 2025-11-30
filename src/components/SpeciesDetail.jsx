import speciesImage from "../data/spesiesImage";
export default function SpeciesDetail({ species, onClose }) {
  const imageName = speciesImage[species.name] || 'unknown.jpg';

  return (
    <div className="modal-backdrop" style={{background: 'rgba(0,0,0,0.9)'}} onClick={onClose}>
      <div className="bg-dark text-light p-5 rounded" style={{maxWidth: '600px', margin: '5% auto'}} onClick={e => e.stopPropagation()}>
        <button className="btn-close btn-close-white float-end" onClick={onClose}></button>
        
        <div className="row">
          <div className="col-md-5 text-center">
            <img 
              src={`/images/species/${imageName}.jpg`} 
              alt={species.name}
              className="img-fluid rounded-circle border border-warning"
              style={{width: '200px', height: '200px', objectFit: 'cover'}}
            />
          </div>
          <div className="col-md-7">
            <h2 className="text-warning">{species.name}</h2>
            <hr className="border-secondary"/>
            <p><strong>Classification:</strong> {species.classification}</p>
            <p><strong>Average Height:</strong> {species.average_height} cm</p>
            <p><strong>Average Lifespan:</strong> {species.average_lifespan} years</p>
            <p><strong>Language:</strong> {species.language}</p>
            <p><strong>Homeworld:</strong> {species.homeworld ? 'Known' : 'Unknown'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}