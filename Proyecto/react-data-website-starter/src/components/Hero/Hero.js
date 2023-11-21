import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, MainHeading } from '../../globalStyles';
import { HeroVideo, HeroSection, HeroText, ButtonWrapper, HeroButton } from './HeroStyles';

const Hero = () => {
	return (
		<HeroSection>
			<HeroVideo src="./assets/hero1.mp4" autoPlay muted />
			<Container>
				<MainHeading>Bienvenidos a Travel</MainHeading>
				<HeroText>
				Explora. Sueña. Viaja.
				</HeroText>
			</Container>
		</HeroSection>
	);
};

export default Hero;
