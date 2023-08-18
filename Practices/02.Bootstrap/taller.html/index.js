document.addEventListener("DOMContentLoaded", function () {
    const openRegistrationModalButton = document.getElementById("openRegistrationModal");
    const loginButton = document.querySelector(".btn-primary");
  
    


  // Agrega un evento al botón de registrarse
openRegistrationModalButton.addEventListener("click", function (event) {
  event.preventDefault(); // Evita que el formulario se envíe

  // Carga el contenido de "registro.html"
  fetch("registro.html")
    .then((response) => response.text())
    .then((html) => {
      // Muestra el contenido en el contenedor
      const contentContainer = document.getElementById("contentContainer");
      contentContainer.innerHTML = html;

      // Agregar eventos a los botones de cancelar y aceptar
      const cancelButton = document.getElementById("cancelButton");
      const acceptButton = document.getElementById("acceptButton");

      cancelButton.addEventListener("click", function () {
        // Vuelve a cargar el contenido del index.html
        fetch("index.html")
          .then((response) => response.text())
          .then((html) => {
            contentContainer.innerHTML = html;
          })
          .catch((error) => {
            console.error("Error al cargar el contenido:", error);
          });
      });

      acceptButton.addEventListener("click", function () {
        // Aquí puedes agregar la lógica para procesar el registro
        // Después de registrar, puedes regresar al index.html o a donde sea necesario
      });
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
});

});

  

    