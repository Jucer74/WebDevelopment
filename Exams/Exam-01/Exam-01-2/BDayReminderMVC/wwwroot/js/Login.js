// Obtener elementos del formulario de inicio de sesi�n
const loginForm = document.getElementById("loginForm");
const loginEmailInput = document.getElementById("loginEmail");
const loginPwdInput = document.getElementById("loginPwd");

// Listener para el formulario de inicio de sesi�n
loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el env�o autom�tico del formulario

    // Obtener las credenciales ingresadas
    const enteredEmail = loginEmailInput.value;
    const enteredPassword = loginPwdInput.value;

    // Verificar si ya existe un usuario almacenado
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
        // Mostrar mensaje de error en el formulario
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.style.display = "block";
        return;
    }

    // Verificar las credenciales ingresadas con las almacenadas
    if (enteredEmail === storedUser.email && enteredPassword === storedUser.password) {
        alert("Inicio de sesi�n exitoso");
        window.location.href = "/HomeController1/Index";
        // Aqu� podr�as redirigir al usuario a su p�gina principal, por ejemplo.
    } else {
        alert("Credenciales incorrectas. Int�ntalo de nuevo.");
    }
});