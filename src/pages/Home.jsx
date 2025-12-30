import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

export default function Home() {
  return (
    <>
      <div 
        className="min-vh-100 d-flex align-items-center justify-content-center text-center position-relative"
      >
        <div>
          <img
            src="/images/star-wars-homepage.png"
            alt="Star Wars Logo"
            className="img-fluid mb-4 px-3"
            style={{ maxWidth: '400px' }}
          />
          <p className="lead text-light mb-5 px-3">
            Explore various characters, planets, and species from a galaxy far, far away...
          </p>
        </div>
      </div>

      <Container className="py-3 text-light">
        
        <Row className="align-items-center mb-5">
          <Col md={6} className="mb-4 mb-md-0 text-center">
            <Image 
              src="/images/posters/star-wars-saga.jpg" 
              alt="Star Wars Skywalker Saga" 
              fluid 
              rounded 
              style={{ maxHeight: '60vh', objectFit: 'contain' }}
            />
          </Col>

          <Col md={6}>
            <h2 className="my-4 text-center">What is <b className="text-warning">Star Wars</b>?</h2>
            <p>
              <b>Star Wars</b> is an epic space opera franchise created by George Lucas in 1977. Set in a galaxy far, far away, it tells the story of the eternal battle between good (Jedi, Rebellion) and evil (Sith, Empire). 
              The main storyline follows the Skywalker family across nine episodic films known as the "Skywalker Saga", plus spin-off movies, series, books, and games that have made it a global cultural phenomenon for generations.
            </p>
          </Col>
        </Row>

        <div className="text-center my-5">
          <hr 
            style={{
              border: 'none',
              height: '4px',
              backgroundColor: '#ffd700',
              width: '40%',
              margin: '0 auto',
              opacity: 0.9
            }} 
          />
        </div>

        <h2 className="text-center mb-3">Star Wars Saga</h2>
        <Carousel className="mb-5" indicators={true} controls={true} pause="false">
          <Carousel.Item>
            <div className="text-center py-3">
              <Image 
                className="d-block w-100" 
                src="/images/posters/original_trilogy.jpg" 
                alt="Original Trilogy" 
                fluid 
                rounded 
                style={{ maxHeight: '70vh', objectFit: 'contain' }}
              />
            </div>
            <div className="py-4 px-3 mx-auto" style={{ maxWidth: '900px' }}>
              <h5 className="mb-3 text-warning">The Original Trilogy (1977 - 1983)</h5>
              <p className="mb-5">
                Episodes IV - VI: A New Hope, The Empire Strikes Back, Return of the Jedi.<br />
                The classic adventure of Luke Skywalker, Princess Leia, Han Solo, and the redemption of Darth Vader.
              </p>
            </div>
          </Carousel.Item>

          {/* Prequel Trilogy */}
          <Carousel.Item>
            <div className="text-center py-3">
              <Image 
                className="d-block w-100" 
                src="/images/posters/prequel_trilogy.jpg" 
                alt="Prequel Trilogy" 
                fluid 
                rounded 
                style={{ maxHeight: '70vh', objectFit: 'contain' }}
              />
            </div>
            <div className="py-4 px-3 mx-auto" style={{ maxWidth: '900px' }}>
              <h5 className="mb-3 text-warning">The Prequel Trilogy (1999 - 2005)</h5>
              <p className="mb-5">
                Episodes I - III: The Phantom Menace, Attack of the Clones, Revenge of the Sith.<br />
                The tragic origin of Darth Vader and the fall of the Republic.
              </p>
            </div>
          </Carousel.Item>

          {/* Sequel Trilogy */}
          <Carousel.Item>
            <div className="text-center py-3">
              <Image 
                className="d-block w-100" 
                src="/images/posters/sequel_trilogy.jpg" 
                alt="Sequel Trilogy" 
                fluid 
                rounded 
                style={{ maxHeight: '70vh', objectFit: 'contain' }}
              />
            </div>
            <div className="py-4 px-3 mx-auto" style={{ maxWidth: '900px' }}>
              <h5 className="mb-3 text-warning">The Sequel Trilogy (2015 - 2019)</h5>
              <p className="mb-5">
                Episodes VII - IX: The Force Awakens, The Last Jedi, The Rise of Skywalker.<br />
                A new generation featuring Rey, Finn, Poe, and the return of classic heroes.
              </p>
            </div>
          </Carousel.Item>
        </Carousel>
      </Container>
    </>
  );
}