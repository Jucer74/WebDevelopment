import { useSelector } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import slider1 from '../images/1.jpg';
import slider2 from '../images/2.jpg';
import slider3 from '../images/3.jpg';
import slider4 from '../images/4.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

export { Home };

function Home() {
  const auth = useSelector((x) => x.auth.value);

  return (
    <div className="container mt-4">
      <h1 className="text-center">Hi {auth?.firstName}! Welcome to this site!</h1>

      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src={slider1}
            alt="Renault Sandero"
            style={{ maxHeight: '550px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="text-white">
            <h3>Renault Sandero</h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src={slider2}
            alt="Spark GT"
            style={{ maxHeight: '550px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="text-white">
            <h3>Spark GT</h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src={slider3}
            alt="Kia Picanto"
            style={{ maxHeight: '550px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="text-white">
            <h3>Kia Picanto</h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src={slider4}
            alt="Ford Fiesta"
            style={{ maxHeight: '550px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="text-white">
            <h3>Ford Fiesta</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}


