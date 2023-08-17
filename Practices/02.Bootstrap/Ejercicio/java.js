
const redireccionar = document.getElementById('boton-redireccionar');
redireccionar.addEventListener(click, inicio());


function inicio(){

    window.location.href = "./Inicio.html";

}

const redireccionar2 = document.getElementById('redireccionar2');
redireccionar2.addEventListener(click, mostrar2());

function mostrar2(){

    window.location.href = "./index.html";

}