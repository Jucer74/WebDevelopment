import React from 'react';

import { BsFillShieldLockFill } from 'react-icons/bs';
import { IoIosOptions } from 'react-icons/io';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BiSupport, BiDollar } from 'react-icons/bi';
import { GrHostMaintenance } from 'react-icons/gr';
const iconStyle = (Icon) => <Icon size="3rem" color="#0f0f0f" />;

export const featuresData = [
	{
		name: 'Reserva Segura',
		description: 'Priorizamos la seguridad de tu información de reserva para una experiencia sin preocupaciones',
		icon: iconStyle(BsFillShieldLockFill),
		imgClass: 'one',
	},
	{
		name: 'Planificación Fácil',
		description: 'Nuestra plataforma está diseñada para una planificación de viaje fácil e integración sin problemas',
		icon: iconStyle(IoIosOptions),
		imgClass: 'two',
	},
	{
		name: 'Servicios Confiables',
		description: 'Confía en nosotros para servicios confiables y soluciones de viaje sostenibles',
		icon: iconStyle(GrHostMaintenance),
		imgClass: 'three',
	},
	{
		name: 'Soporte de Viaje 24/7',
		description: 'Nuestro equipo de soporte está disponible las 24 horas, los 7 días de la semana para ayudarte durante tu viaje',
		icon: iconStyle(BiSupport),
		imgClass: 'four',
	},
	{
		name: 'Mejor Valor',
		description: 'Obtén el mejor valor por tu dinero con nuestra oferta competitiva y servicios',
		icon: iconStyle(BiDollar),
		imgClass: 'five',
	},
	{
		name: 'Alcance Global',
		description:
			'Explora destinos en todo el mundo con nuestra red global, garantizando escalabilidad y velocidad',
		icon: iconStyle(AiOutlineCloudUpload),
		imgClass: 'six',
	},
];
