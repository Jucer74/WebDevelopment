document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const loginEmail = document.getElementById('loginEmail').value;
        const loginPassword = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: loginEmail,
                    password: loginPassword
                })
            });

            const data = await response.json();

            if (data.success) {
                window.location.href = 'home.html'; // Reemplaza con la URL de la interfaz home
            } else {
                alert('Correo o contraseña incorrectos. Por favor, verifique.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
