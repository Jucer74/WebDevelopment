function register() {
    const username = document.getElementById("email-user").value;
    const firstname = document.getElementById("inputname").value;
    const lastname = document.getElementById("inputlastname").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const password = document.getElementById("inputpass").value;

    const userdata = {
        username,
        firstname,
        lastname,
        gender,
        password,
    };

    localStorage.setItem("userdata", JSON.stringify(userdata));
    window.location.href = "./login.html";
}

function returned() {
    window.location.href = "./login.html";
}

function login() {
    const username = document.getElementById("email-user").value;
    const password = document.getElementById("passinput").value;

    const savedData = JSON.parse(localStorage.getItem("userdata"));

    if (savedData && savedData.username === username && savedData.password === password) {
        alert("Inicio de sesión exitoso");
        window.location.href = "./page.html";
    } else {
        alert("Usuario o contraseña incorrectos");
        window.location.href = "./login.html";
    }
}