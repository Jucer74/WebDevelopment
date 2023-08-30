## Autor: Juan David Jimenez

## Fecha: 27-07-2023

## Practica 1 uso de HTML, CSS y JS

### Descripcion

Esta practica consiste en crear una pagina web que contenga un Home, Resum, Work, Contact que sea una SPA (Single Page Application) y que sea responsive, ademas de que se debe de utilizar HTML, CSS y JS para su creacion.

## Nota

Se uso JS para crear la SPA ya que la arquitectura esta basada en componentes como si fuese react ya que esto facilita la elaboracion y buenas practicas de codigo y para que sea responsive se uso CSS Grid y CSS Flexbox, ademas de que se uso el modulo de python http.server para poder ejecutar un servidor local y poder visualizar la pagina web.

-Se agrego documentacion al codigo en partes vitales y importantes para su entendimiento.

### Requerimientos

- [x] Subir a la rama del repositorio en GitHub llamado jundavjim
- [x] Crear una pagina web con HTML, CSS y JS
- [x] Crear un archivo README.md con la descripcion del proyecto
- [x] Responsive
- [x] SPA
- [x] Usar CSS Grid y CSS Flexbox
- [x] Usar modulo de python http.server para ejecutar un servidor local

##

## Pagina Web Como usarla

Se debe de clonar el repositorio con el siguiente comando:

```bash
git clone
```

Depues de clonar el repositorio se debe de entrar a la carpeta del proyecto con el siguiente comando:

```bash
cd practica_d_w
```

Instalar python en caso de no tenerlo instalado, para instalarlo se debe de ejecutar el siguiente comando:

```bash
sudo apt-get install python
```

Para poder usar la pagina web se debe ejecutar un servidor local, en este caso se utilizo el modulo de python http.server, para ejecutarlo se debe de ejecutar el siguiente comando en la terminal:

```bash
python2 -m http.server
python3 -m http.server
```

Una vez ejecutado el comando se debe de abrir el navegador y escribir la siguiente direccion:

```bash
http://localhost:8000/
```

##

## Estructura de Archivos

```bash
.
├── index.html
├── public
│   ├── icons
│   ├── img
│   │   ├── giyutomioka.jpeg
│   │   ├── image1.jpg
│   │   ├── image2.jpg
│   │   ├── image3.jpg
│   │   ├── image4.jpg
│   │   ├── image5.jpg
│   │   ├── image6.jpg
│   │   ├── image7.jpg
│   │   ├── image8.jpg
│   │   └── logonube.png
│   └── styles
│       ├── contact.css
│       ├── footer.css
│       ├── home.css
│       ├── navbar.css
│       ├── resume.css
│       └── work.css
├── read.md
└── src
    └── pages
        └── components
            ├── Contact
            │   └── Contact.html
            ├── Footer
            │   └── Footer.html
            ├── Home
            │   └── Home.html
            ├── main.js
            ├── Navbar
            │   └── Navbar.html
            ├── Resume
            │   └── Resume.html
            └── Work
                └── Work.html

13 directories, 25 files
```

##
