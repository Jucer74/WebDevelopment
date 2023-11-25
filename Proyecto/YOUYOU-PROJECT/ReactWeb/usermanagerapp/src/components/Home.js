import React from 'react';
import { Carousel, Container } from 'react-bootstrap';

export const Home = () => {
  return (
    <Container style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Bienvenidos A Nuestra Agencia De Agentes Deportivos</h2>
      <Carousel style={{ margin: '20px 0' }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFpCjXRMAV5SIyTo3AD8Ecfz5qXmO7G357Yg&usqp=CAU"
            alt="First slide"
          />
        </Carousel.Item>
        <img
            className="d-block w-100"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqn6JTqYiZYRkRKkncigIZSP29eOvrd3_q5AMchP-nisUfEWMU5r6SD8DSB1wiO7afhmI&usqp=CAU"
            alt="First slide"
          />
      </Carousel>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <div style={boxStyle}>
          <h3>Who We Are?</h3>
          <p>
            We are an agency seeking sports agents to provide improvement in sports.
          </p>
        </div>
        <div style={boxStyle}>
          <h3>Our Mission</h3>
          <p>
            In our company, we are committed to providing our best service as sports agents for clubs and others. Our team is composed of dedicated professionals working towards excellence.
          </p>
        </div>
        <div style={boxStyle}>
          <h3>What We Offer</h3>
          <p>
            Whether you are seeking improvement for your sports club or organization, we can help you enhance and bring quality to your organization. We are committed to making improvements for you.
          </p>
        </div>
      </div>
      <div style={{ maxWidth: '600px', margin: '20px auto' }}>
        <h3>Contact Us</h3>
        <p>
          Thank you for choosing us. If you have any questions or would like to get in touch, please contact us.
        </p>
      </div>
    </Container>
  );
};

const boxStyle = {
  flex: '1',
  minWidth: '300px',
  maxWidth: '400px',
  margin: '10px',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

export default Home;
