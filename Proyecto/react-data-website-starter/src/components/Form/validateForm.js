export default function validateForm({ name, email, password, confirmPass }) {
	if (!name.trim()) {
		return 'Nombre requerido';
	}
	// else if (!/^[A-Za-z]+/.test(name.trim())) {
	//   errors.name = 'Enter a valid name';
	// }

	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!email) {
		return 'Correo requerido';
	} else if (regex.test(email.toLocalLowerCase)) {
		return 'La dirección de correo electrónico no es válida';
	}
	return null;
}
