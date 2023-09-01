// Obtener elementos del formulario de registro
const registrationForm = document.getElementById("registrationForm");
const passwordInput = document.getElementById("pwd");
const confirmPasswordInput = document.getElementById("Cpwd");
const passwordMismatchModal = new bootstrap.Modal(document.getElementById("passwordMismatchModal")); // Crea un aviso de contrase�as no coincidente

// Listener para el formulario de registro
registrationForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el env�o autom�tico del formulario

    // Obtener los valores del formulario de registro
    const email = document.getElementById("email").value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Verificar si las contrase�as coinciden
    if (password !== confirmPassword) {
        passwordMismatchModal.show(); // Mostrar el aviso de contrase�as no coincidentes
        return;
    }

    // Crear un objeto de usuario
    const user = {
        email: email,
        password: password,
    };

    // Guardar el usuario en localStorage
    localStorage.setItem("user", JSON.stringify(user));

    alert("Usuario registrado exitosamente");

    // Redirigir al index principal
    window.location.href = "/Home/Index";
});