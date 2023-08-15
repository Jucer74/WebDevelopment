document.addEventListener("DOMContentLoaded", function () {
    // Variables para los campos del formulario
    const username = document.getElementById("username-register");
    //const name = document.getElementById("name");
    //const lastname = document.getElementById("lastname");
    //const dateofbirth = document.getElementById("dateofbirth");
    const password = document.getElementById("password-register");
    const confirmpassword = document.getElementById("confirm-password");
    const emailError = document.getElementById("email-error-register");
    const registerForm = document.getElementById("register-form");
    const passwordError = document.getElementById("password-error");

    // Expresiones regulares para validar los campos
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    // Evento para validar el formulario
    registerForm.addEventListener("submit", function (event) {
        // Validar que el email sea correcto
        if (!emailPattern.test(username.value.trim())) {
            emailError.textContent = "Invalid email.";
            emailError.style.display = "block";
            event.preventDefault(); // Evitar que el formulario se envíe si hay errores
        } else {
            emailError.style.display = "none";
        }

        // Validar que las contraseñas coincidan
        if (password.value !== confirmpassword.value.trim()) {
            passwordError.textContent = "Passwords do not match.";
            passwordError.style.display = "block";
            event.preventDefault(); // Evitar que el formulario se envíe si hay errores
        } else {
            passwordError.style.display = "none";
        }

        // Validar que la contraseña cumpla con los requisitos
        if (!passwordRegex.test(password.value.trim())) {
            passwordError.textContent = "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number.";
            passwordError.style.display = "block";
            event.preventDefault(); // Evitar que el formulario se envíe si hay errores
        } else {
            passwordError.style.display = "none";
        }
    });
});
