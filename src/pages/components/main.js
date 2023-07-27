// Función para cargar el contenido de un archivo en un elemento
function loadComponent(component, targetId) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        document.getElementById(targetId).innerHTML = xhr.responseText;
      }
    };
    xhr.open("GET", `src/pages/components/${component}/${component}.html`, true);
    xhr.send();
  }
  
  // Cargar los componentes en sus respectivos contenedores al cargar la página
  window.onload = function() {
    loadComponent('Navbar', 'navbar');
    loadComponent('Home', 'content'); // Página de inicio por defecto
    loadComponent('Footer', 'footer');
  };
  