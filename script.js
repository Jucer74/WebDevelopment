document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("registerUsername").value;
        const name = document.getElementById("registerName").value;
        const email = document.getElementById("registerEmail").value;
        const birthday = document.getElementById("registerBirthday").value;
        const gender = document.getElementById("registerGender").value;
        const password = document.getElementById("registerPassword").value;

        const userData = {
            username: username,
            name: name,
            email: email,
            birthday: birthday,
            gender: gender,
            password: password
        };

        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Registro exitoso. Ahora puedes iniciar sesión.");
                window.location.href = "../login.html"; // Redirigir a la página de inicio de sesión
            }
        })
        .catch(error => {
            console.error("Error al registrar usuario:", error);
        });
    });
});
