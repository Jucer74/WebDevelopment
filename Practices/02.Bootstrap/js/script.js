function register() {
  const username = document.getElementById("regUsername").value;
  const firstName = document.getElementById("regFirstName").value;
  const lastName = document.getElementById("regLastName").value;
  const birthdate = document.getElementById("regBirthdate").value;
  const gender = document.querySelector(
    'input[name="regGender"]:checked'
  ).value;
  const password = document.getElementById("regPassword").value;
  const confirmPassword = document.getElementById("regConfirmPassword").value;

  const userData = {
    username,
    firstName,
    lastName,
    birthdate,
    gender,
    password,
    confirmPassword,
  };

  localStorage.setItem("userData", JSON.stringify(userData));

  window.location.href = "../index.html";
}

function returned() {
  window.location.href = "../index.html";
}

function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const savedData = JSON.parse(localStorage.getItem("userData"));

  if (
    savedData &&
    savedData.username === username &&
    savedData.password === password
  ) {
    alert("Inicio de sesión exitoso");
    window.location.href = "../home.html";
  } else {
    alert("Usuario o contraseña incorrectos");
    window.location.href = "../index.html";
  }
}
