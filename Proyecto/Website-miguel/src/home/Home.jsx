import { Carousel, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import carru1 from '../assets/carru1.jpg';
import carru2 from '../assets/carru2.jpg';
import carru3 from '../assets/carru3.jpg';
import carru4 from '../assets/carru4.jpg';
import carru5 from '../assets/carru5.jpg';
import imagenCake from '../assets/cake.jpg';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import '../styles.css/styles.css';
import Pizza1 from '../assets/one.png';
import Pizza2 from '../assets/two.png';
import Pizza3 from '../assets/three.png';
import Pizza4 from '../assets/four.png';
import Pizza5 from '../assets/five.png';
import Banner1 from '../assets/banner.jpg';
import Banner2 from '../assets/banner1.jpg';
import Banner3 from '../assets/banner2.jpeg';
import Banner4 from '../assets/banner3.jpg';
import '../styles.css/Contact.css';


// Resto del código del componente Home
export { Home };

function Home() {
  const auth = useSelector(x => x.auth.value);

  // Función para mostrar la alerta
  const showAlert = () => {
    Swal.fire({
      title: `Welcome ${auth?.firstName}!`,
      text: "To the Miguel's Pizza Restaurant",
      icon: 'success',
    });
    
  };

  // Llamada a la función de alerta
  showAlert();

  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={carru1} alt="Primera diapositiva" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carru2} alt="Segunda diapositiva" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carru3} alt="Tercera diapositiva" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carru4} alt="Primera diapositiva" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carru5} alt="Primera diapositiva" />
        </Carousel.Item>
      </Carousel>

      <div className="d-flex justify-content-around mt-4">
  {/* Tarjeta 1 (Izquierda) */}
  <Card style={{ width: '18rem', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#670506', marginRight: '20px' }}>
    <Card.Img variant="top" src={Pizza3} />
    <Card.Body className="text-center">
      <Card.Title className="mb-3" style={{ color: 'white' }}>Pepperoni Pizza</Card.Title>
      <Card.Text className="mb-3" style={{ color: 'white' }}>
        $20 USD
      </Card.Text>
    </Card.Body>
  </Card>

  {/* Tarjeta 2 (Izquierda) */}
  <Card style={{ width: '18rem', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#670506', marginRight: '20px' }}>
    <Card.Img variant="top" src={Pizza2} />
    <Card.Body className="text-center">
      <Card.Title className="mb-3" style={{ color: 'white' }}>Napolitana Pizza</Card.Title>
      <Card.Text className="mb-3" style={{ color: 'white' }}>
        $50 USD
      </Card.Text>
    </Card.Body>
  </Card>

  {/* Tarjeta 3 (Centro) */}
  <Card style={{ width: '20rem', height: '25rem', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#670506' }}>
    <Card.Img variant="top" src={Pizza1} />
    <Card.Body className="text-center">
      <Card.Title className="mb-3" style={{ color: 'white' }}>Muzzarrella Pizza</Card.Title>
      <Card.Text className="mb-3" style={{ color: 'white' }}>
        $70 USD
      </Card.Text>
    </Card.Body>
  </Card>

  {/* Tarjeta 4 (Derecha) */}
  <Card style={{ width: '18rem', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#670506', marginLeft: '20px' }}>
    <Card.Img variant="top" src={Pizza4} />
    <Card.Body className="text-center">
      <Card.Title className="mb-3" style={{ color: 'white' }}>Vegetarian Pizza</Card.Title>
      <Card.Text className="mb-3" style={{ color: 'white' }}>
        $100 USD
      </Card.Text>
    </Card.Body>
  </Card>

  {/* Tarjeta 5 (Derecha) */}
  <Card style={{ width: '18rem', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#670506', marginLeft: '20px' }}>
    <Card.Img variant="top" src={Pizza5} />
    <Card.Body className="text-center">
      <Card.Title className="mb-3" style={{ color: 'white' }}>Americana Pizza</Card.Title>
      <Card.Text className="mb-3" style={{ color: 'white' }}>
        $150 USD
      </Card.Text>
    </Card.Body>
  </Card>
</div>



      <div className="text-center mt-4">
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 900 }}>OUR PRODUCTS</h2>
      </div>

      <div className="text-center mt-4">
        <p style={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '24px' }}>
          AMAZING PIZZAS & <br />
          THE BEST INGREDIENTS
        </p>
        <p style={{ fontFamily: 'Poppins', fontWeight: 200, fontSize: '16px' }}>
          In the cozy corner of our pizzeria, each slice is a masterpiece of irresistible flavors.
          From the softness of the dough to the explosion of fresh ingredients, every bite is a culinary adventure.
        </p>
        <p style={{ fontFamily: 'Poppins', fontWeight: 300, fontStyle: 'italic', fontSize: '14px' }}>
          Because the perfect moments always include pizza. We hope to see you soon!
        </p>
      </div>

      <div className="d-flex justify-content-around mt-4">
        {/* Card 1 */}
        <Card style={{ width: '18rem', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Card.Img variant="top" src={Banner3} />
          <Card.Body>
            <Card.Title>The best prices</Card.Title>
            <Card.Text>
            Pizzas from $20 usd, come now.
            </Card.Text>
            <Button variant="primary" className="submit-button-2">View</Button>
          </Card.Body>
        </Card>
        {/* Card 2 */}
        <Card style={{ width: '18rem', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Card.Img variant="top" src={Banner2} />
          <Card.Body>
            <Card.Title>Delicious Ingredients</Card.Title>
            <Card.Text>
            We have all flavors, 100% quality.
            </Card.Text>
            <Button variant="primary" className="submit-button-2">View</Button>
          </Card.Body>
        </Card>
        {/* Card 3 */}
        <Card style={{ width: '18rem', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Card.Img variant="top" src={Banner1} />
          <Card.Body>
            <Card.Title>24/7 customer service</Card.Title>
            <Card.Text>
            Free home anywhere.
            </Card.Text>
            <Button variant="primary" className="submit-button-2">View</Button>
          </Card.Body>
        </Card>
        {/* Card 4 */}
        <Card style={{ width: '18rem', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Card.Img variant="top" src={Banner4} />
          <Card.Body>
            <Card.Title>Offers every weekend</Card.Title>
            <Card.Text>
            Pizzas with 50% discount.
            </Card.Text>
            <Button variant="primary" className="submit-button-2">View</Button>
          </Card.Body>
        </Card>
      </div>

      {/* Footer */}
      <footer className="footer mt-4">
        <div className="container">
          <div className="row">
            {/* Redes Sociales */}
            <div className="col-md-4">
              <h4>Social Media</h4>
              <div className="social-icons">
                <FontAwesomeIcon icon={faInstagram} className="icon" />
                <FontAwesomeIcon icon={faFacebook} className="icon" />
                <FontAwesomeIcon icon={faWhatsapp} className="icon" />
              </div>
            </div>

            {/* Restaurants */}
            <div className="col-md-4">
              <h4>Restaurants</h4>
              <ul>
                <li>Sheffield</li>
                <li>Cali</li>
                <li>Singapore</li>
              </ul>
            </div>

            {/* Soporte */}
            <div className="col-md-4">
              <h4>Support</h4>
              <ul>
                <li>Help and Frequently Asked Questions (FAQ)</li>
                <li>Terms and Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}