import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin } from 'react-icons/fa';

const iconStyle = (Icon) => <Icon />;

export const footerSocialData = [
	{
		name: 'Facebook',
		icon: iconStyle(FaFacebook),
	},
	{
		name: 'Instagram',
		icon: iconStyle(FaInstagram),
	},
	{
		name: 'YouTube',
		icon: iconStyle(FaYoutube),
	},
	{
		name: 'Twitter',
		icon: iconStyle(FaTwitter),
	},
	{
		name: 'LinkedIn',
		icon: iconStyle(FaLinkedin),
	},
];

export const footerData = [
	{
		title: 'Principal',
		links: ['Blog', 'Preguntas frecuentes', 'Soporte', 'Sobre nosotros'],
	},
	{
		title: 'Producto',
		links: ['Iniciar sesión', 'Personal', 'Negocios', 'Equipo'],
	},
	{
		title: 'Prensa',
		links: ['Logos', 'Eventos', 'Historias', 'Oficina'],
	},
	{
		title: 'Legal',
		links: ['GDPR', 'Política de privacidad', 'Términos de servicio', 'Aviso legal'],
	},
];
