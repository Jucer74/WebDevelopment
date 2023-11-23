

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "../styles/home.css";




import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';

// Importa las imágenes locales
import slider1 from '../images/slider-1.jpg';
import slider2 from '../images/slider-2.jpg';
import slider3 from '../images/slider-3.jpg';
import slider4 from '../images/slider-4.jpg';
import card1 from '../images/card/card1.png';
import card2 from '../images/card/card2.png';
import card3 from '../images/card/card3.png';
import card4 from '../images/card/card4.png';
import card5 from '../images/card/card5.png';

function Home() {
  const auth = useSelector(x => x.auth.value);

  const showAlert = () => {
    Swal.fire({
      title: `Welcome ${auth?.firstName}!`,
      text: "Drive into Adventure: Your Key to a Seamless Rental Experience!",
      icon: "success"   
    });
  };

  // Llamada a la función de alerta
  showAlert();

  return (
    
    
    
    <div>
      <Carousel>
        <div>
          <img src={slider1} alt="Slide 1" />
          <p className="legend">Porsche is famous for its powerful and high-performance engines. Engines can range from more efficient powertrain options to highly powerful engines in sporty models.</p>
        </div>
        <div>
          <img src={slider2} alt="Slide 2" />
          <p className="legend">Mercedes-Benz engines are known for their performance and efficiency. The brand offers a variety of engine options, from more economical engines to high-performance engines in sports and AMG models.</p>
        </div>
        <div>
          <img src={slider3} alt="Slide 3" />
          <p className="legend">Nissan engines range from more fuel-efficient options to more powerful engines in sport models and trucks. The brand has also ventured into electric vehicles, such as the Nissan Leaf.</p>
        </div>
        <div>
          <img src={slider4} alt="Slide 4" />
          <p className="legend">The Mustang is famous for its powerful engines and performance options. The engine range includes options from more efficient engines to high-performance engines, especially in the GT and Shelby versions.</p>
        </div>
      </Carousel>

      <div>
        <h1>Our Cars</h1>
      </div>

      <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
      <MDBCol>
        <MDBCard>
          <MDBCardImage
            img src={card1}
            alt='Carro1'
            position='top'

          />
          <MDBCardBody>
            <MDBCardTitle>Toyota Camry Red</MDBCardTitle>
            <MDBCardText>
            The Toyota Camry is a mid-size car manufactured by the Japanese company Toyota. 
            First introduced in 1982, the Camry has gone through several generations and has become one of the best-selling cars worldwide.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
     <MDBCol DBCol>
        <MDBCard>
          <MDBCardImage
            img src={card2}
            alt='Carro2'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Toyota Camry White</MDBCardTitle>
            <MDBCardText>
            The Toyota Camry is a mid-size car manufactured by the Japanese company Toyota. 
            First introduced in 1982, the Camry has gone through several generations and has become one of the best-selling cars worldwide.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard>
          <MDBCardImage
            img src={card3}
            alt='Carro3'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>BMW</MDBCardTitle>
            <MDBCardText>
              BMW, which stands for Bayerische Motoren Werke AG (Bavarian Motor Works in English), 
              is a German multinational company that produces luxury vehicles and motorcycles.The company was founded in 1916 and has its headquarters in Munich, Germany.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard>
          <MDBCardImage
            img src={card4}
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Mercedes-Benz</MDBCardTitle>
            <MDBCardText>
            Mercedes-Benz is a German global automobile marque and a division of Daimler AG.
            The brand is synonymous with high-quality craftsmanship, cutting-edge technology, and a focus on comfort and innovation.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol DBCol>
        <MDBCard>
          <MDBCardImage
            img src={card5}
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Nissan</MDBCardTitle>
            <MDBCardText>
            Nissan Motor Co., Ltd. is a Japanese multinational automobile manufacturer. 
            It is one of the largest automakers in the world and is part of the Renault–Nissan–Mitsubishi Alliance. Nissan's headquarters are located in Yokohama, Japan.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol DBCol>
        <MDBCard>
          <MDBCardImage
            img src={card1}
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Toyota Camry S (Sport)</MDBCardTitle>
            <MDBCardText>
            The Toyota Camry S, a dynamic fusion of elegance and speed that transforms your driving experience into an exhilarating journey. 
            this sporty sedan redefines the classic Camry with a touch of adrenaline..
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      </MDBRow>
    </div>

  );
}

export { Home };
