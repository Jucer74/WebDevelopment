document.addEventListener("DOMContentLoaded", function () {
    // Vars
    const loginForm = document.getElementById("login-form");
    const loginButton = document.getElementById("login-button");
    const emailError = document.getElementById("email-error");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validar los campos y habilitar/deshabilitar el botón de login
    function validateFields() {
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");

        const isEmailValid = emailPattern.test(usernameInput.value.trim());
        const isPasswordValid = passwordInput.value.trim() !== "";

        if (isEmailValid && isPasswordValid) {
            loginButton.removeAttribute("disabled");
        } else {
            loginButton.setAttribute("disabled", "true");
        }

        if (usernameInput.value.trim() === "") {
            emailError.style.display = "none";
        } else {
            emailError.style.display = isEmailValid ? "none" : "block";
        }
    }

    // Evento de cambio en los campos del formulario
    loginForm.addEventListener("input", validateFields);

    // Evento de envío del formulario
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el envío del formulario (por ahora)

        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");

        if (emailPattern.test(usernameInput.value.trim()) && passwordInput.value.trim() !== "") {
            // Redireccionar a la página de inicio
            window.location.href = '../Home/Home.html';
        }
    });

    // Evento del botón de redirección al formulario de inicio de sesión
    const loginButtonRedirrect = document.getElementById("login-button-redirect");
    loginButtonRedirrect.addEventListener('click', function () {
        // Redirecciona a la página de inicio de sesión
        window.location.href = '../Login/Login.html';
    });

    // Inicializar el estado del botón de login al cargar la página
    validateFields();
});
document.addEventListener("DOMContentLoaded", function () {
    // Vars
    const loginForm = document.getElementById("login-form");
    const loginButton = document.getElementById("login-button");
    const emailError = document.getElementById("email-error");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validar los campos y habilitar/deshabilitar el botón de login
    function validateFields() {
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");

        const isEmailValid = emailPattern.test(usernameInput.value.trim());
        const isPasswordValid = passwordInput.value.trim() !== "";

        if (isEmailValid && isPasswordValid) {
            loginButton.removeAttribute("disabled");
        } else {
            loginButton.setAttribute("disabled", "true");
        }

        if (usernameInput.value.trim() === "") {
            emailError.style.display = "none";
        } else {
            emailError.style.display = isEmailValid ? "none" : "block";
            emailError.textContent = "Please enter a valid email address.";
        }
    }

    // Evento de cambio en los campos del formulario
    loginForm.addEventListener("input", validateFields);

    // Evento de envío del formulario
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el envío del formulario (por ahora)

        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");

        if (emailPattern.test(usernameInput.value.trim()) && passwordInput.value.trim() !== "") {
            // Redireccionar a la página de inicio
            window.location.href = '../Home/Home.html';
        }
    });

    // Evento del botón de redirección al formulario de inicio de sesión
    const loginButtonRedirrect = document.getElementById("login-button-redirect");
    loginButtonRedirrect.addEventListener('click', function () {
        // Redirecciona a la página de inicio de sesión
        window.location.href = '../Login/Login.html';
    });

    // Inicializar el estado del botón de login al cargar la página
    validateFields();
});
