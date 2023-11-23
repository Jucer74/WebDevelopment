import React from 'react';
import { MyCarousel } from './Carrusel';
import { Contact } from './Contact';

export const Home = () => (
    <div>
        <React.Fragment>
            <MyCarousel/>
            <Contact/>
        </React.Fragment>
    </div>
)