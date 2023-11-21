// Importar las bibliotecas y estilos necesarios
import React, { useState } from 'react';
import {
	FormColumn,
	FormWrapper,
	FormInput,
	FormSection,
	FormRow,
	FormLabel,
	FormInputRow,
	FormMessage,
	FormButton,
	FormTitle,
} from './FormStyles';
import { Container } from '../../globalStyles';
import validateForm from './validateForm';

// Componente funcional principal del formulario
const Form = () => {
	// Estados para manejar los valores de los campos, mensajes de error y éxito, y la geolocalización
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [comment, setComment] = useState('');
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [geolocation, setGeolocation] = useState(null);

	// Función para manejar el envío del formulario
	const handleSubmit = (e) => {
		e.preventDefault();
		// Validar el formulario usando la función de validación
		const resultError = validateForm({ name, email, comment });

		// Manejar el resultado de la validación
		if (resultError !== null) {
			setError(resultError);
			return;
		}

		// Simular obtención de geolocalización (puede llevar tiempo en una aplicación real)
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setGeolocation(position.coords);
				console.log('Geolocation:', position.coords);
			},
			(error) => console.error('Error getting geolocation:', error)
		);

		// Limpiar los campos y mensajes después de un envío exitoso
		setName('');
		setEmail('');
		setComment('');
		setError(null);
		setSuccess('¡El comentario se envió correctamente!');
	};

	// Definir las variantes de animación para los mensajes
	const messageVariants = {
		hidden: { y: 30, opacity: 0 },
		animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
	};

	// Definir la estructura de los datos del formulario
	const formData = [
		{ label: 'Nombre', value: name, onChange: (e) => setName(e.target.value), type: 'text' },
		{ label: 'Correo', value: email, onChange: (e) => setEmail(e.target.value), type: 'email' },
		
		{
			label: 'Comentario',
			value: comment,
			onChange: (e) => setComment(e.target.value),
			type: 'textarea',
		},
	];

	// Renderizar el componente del formulario
	return (
		<FormSection>
			<Container>
				<FormRow>
					<FormColumn small>
						<FormTitle>Contactenos</FormTitle>
						<FormWrapper onSubmit={handleSubmit}>
							{/* Mapear los datos del formulario a los elementos de entrada */}
							{formData.map((el, index) => (
								<FormInputRow key={index}>
									<FormLabel>{el.label}</FormLabel>
									<FormInput
										type={el.type}
										placeholder={`Ingresa tu ${el.label.toLocaleLowerCase()}`}
										value={el.value}
										onChange={el.onChange}
									/>
								</FormInputRow>
							))}
							<FormButton type="submit">Enviar</FormButton>
						</FormWrapper>
						{/* Mostrar mensajes de error o éxito */}
						{error && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
								error
							>
								{error}
							</FormMessage>
						)}
						{success && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
							>
								{success}
							</FormMessage>
						)}
					</FormColumn>
					<FormColumn small>
						{/* Mostrar la geolocalización si está disponible */}
						{geolocation && (
							<div>
								<h3>Geolocation:</h3>
								<p>Latitude: {geolocation.latitude}</p>
								<p>Longitude: {geolocation.longitude}</p>
							</div>
						)}
						{/* Agregar el mapa de Google Maps */}
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.2241838016307!2d-76.38961602502714!3d3.5356492964386033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3a06be9a30dc11%3A0x9149d63166d2377!2sAeropuerto%20Internacional%20Alfonso%20Bonilla%20Aragón%20-%20Cali%20(CLO)!5e0!3m2!1ses!2sco!4v1700535394367!5m2!1ses!2sco"
							width="100%" height="538" title="Google Maps"
							frameborder="0" style={{ border: 0 }} allowfullscreen
						></iframe>
					</FormColumn>
				</FormRow>
			</Container>
		</FormSection>
	);
};

// Exportar el componente del formulario
export default Form;
