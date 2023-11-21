export const data = [
	{
		title: 'Parque Nacional Amboró',
		description:
			'Descubre la belleza del Parque Nacional Amboró en Bolivia, un paraíso natural lleno de bosques exuberantes y vida silvestre única.',
		image: './assets/clients.jpg',
	},
	{
		title: 'Río de Janeiro ',
		description: 'Descubre la vibrante belleza de Río de Janeiro, donde el sol brilla sobre playas doradas y el espíritu carioca te envuelve en su energía contagiosa.',
		image: './assets/security.jpg',
	},
	{
		title: 'Inglaterra',
		description: 'Sumérgete en la encantadora Inglaterra, donde el pasado histórico se fusiona con la modernidad, los verdes paisajes te invitan a explorar y la cultura británica te cautiva en cada rincón.',
		image: './assets/teamwork.jpg',
	},
	{
		title: 'Caño Cristales, Meta',
		description: 'Explora la fascinante belleza de Caño Cristales en Meta, Colombia. Sus vibrantes ríos de colores te dejarán maravillado, mientras te sumerges en un paisaje natural único y espectacular.',
		image: 'https://aventurecolombia.com/wp-content/uploads/2019/09/meta-macarena-ca%C3%B1o-cristales-colombia-ca%C3%B1o-Cristales%C2%A9mariocarvajal-USO-LIBRE-CREDITO-OBLIGATORIO-26.jpg',
	},
	{
		title: 'Cabo San Lucas',
		description: 'Disfruta del encanto de Cabo San Lucas, en Baja California Sur, México. Sus playas de aguas cristalinas, paisajes impresionantes y vibrante vida nocturna te esperan para vivir una experiencia inolvidable en este paraíso tropical.',
		image: 'https://www.gasmandesign.com/wp-content/uploads/2019/05/best-of-cabo-lovers-beach-2019-1024x580.jpg',
	},
];

export const sliderSettings = {
	arrows: false,
	slidesToShow: 3,
	focusOnselect: false,
	accessability: false,
	responsive: [
		{
			breakpoint: 1280,
			settings: {
				slidesToShow: 2,
			},
		},

		{
			breakpoint: 900,
			settings: {
				slidesToShow: 1,
			},
		},
	],
};
