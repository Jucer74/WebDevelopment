import React from 'react';
import { Carousel} from 'react-bootstrap';
import './Carousel.css'; 

export const CarouselHome = () => {
    return (
    <div className='bg-white'>
       <Carousel>
            <Carousel.Item>
            <img src="/img/Banner1.png" alt='' className="d-block w-100" />
            </Carousel.Item>
            <Carousel.Item>
            <img src="/img/Banner2.png" alt='' className="d-block w-100" />
            </Carousel.Item>
            <Carousel.Item>
            <img src="/img/Banner3.png" alt='' className="d-block w-100" />
            </Carousel.Item>
            <Carousel.Item>
            <img src="/img/Banner4.png" alt='' className="d-block w-100" />
            </Carousel.Item>
      </Carousel>
    </div>

    );
  };