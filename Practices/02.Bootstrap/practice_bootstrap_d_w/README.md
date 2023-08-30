## Autor
Juan David Jimenez Atehortua

## Practica de desarrollo web con bootstrap

### Descripcion

Esta es una practica de desarrollo web con bootstrap, en la cual se implementa un sitio web con un diseño responsive, el cual se adapta a cualquier dispositivo.

### Tecnologias

- HTML
- CSS
- JavaScript
- Bootstrap

### Requisitos de desarrollo
```bash
-[x]Crear un sitio web para la administracion de un negocio.
-[x]El sitio web debe ser responsive.
-[x]El sitio web debe tener un menu de navegacion.
-[x]El sitio web debe tener un login.
-[x]El sitio web debe tener un formulario de registro.
-[x]El sitio web debe tener un home.
-[x]El sitio web debe tener un footer.
```
## Observaciones y Comportamientos:
```bash
-[x]Deben Utilizar Bootstrap para el diseño de los componentes principales de las paginas
-[x]Pueden utilizar codigo HTML, CSS y Javascript en caso de ser necesario y que no se supla por los  componentes de Bootstrap
-[x]Las paginas deben ser Adaptative y Responsive
-[x]La primer Pagina a desplegar es la pagina de Login
-[x]La pagina de Login debe validar los campos requeridos y si todo esta bien pasar al Menu, de lo contrario mostrar los mensajes respectivos
-[x]El Login debe Validar el Email y mostrar unmensaje en caso de que no sea un correo valido
-[x]Al selecionar el link de registro de la pagina de login, debe cargar la pagina de registro en modo Modal
-[x]En el Registro se debe validar que todos los campos sean requeridos y en caso de faltar alguno, debe mostrar los mensajes respectivos
-[x]El Campo de usario, debe validar que el campo sea un email y en caso de no serlo, debe mostrar el mensaje correspondiente
-[x]Los Nombres y apellidos deben ser requeridos
-[x]La fecha es requerida y debe ser valida y usar un DateTime Picker para evitar digitarla
-[x]El sexo debe tener el valor seleccionado por defecto
-[x]Al Aceptar o cancelar debe ir a la pagina de Login nuevamente
-[x]En la pagina de Menu, debemostrar las opciones de Categorias, productos pero estos enlaces deben estar activos pero su target debe ser la misma pagina (#)
-[x]El Home y la palabra PricatApp, deben ir tambien a la misma pagina
-[x]El Menu, debe mostrar un Carrusel, con al menos 5 imagenes que pueden avanzar por seleccion o en forma automatica , cada 2 segundos
```
## Navbar
```bash
-[x]El navbar debe tener un logo.
-[x]El navbar debe tener un titulo de la empresa.
-[x]El navbar debe tener un menu de navegacion.
-[x]El navbar debe tener un botn de categorias.
-[x]El navbar debe tener un boton de productos.
-[x]El navbar debe tener un boton de administracion.
-[x]El navbar debe tener un boton de inventario.
-[x]El navbar debe tener un boton de tools.
-[x]El navbar debe tener un boton de soporte.
-[x]El navbar debe tener un perfil de usuario debe ser la imagen como un circulo y por debajo el titulo al final end.
```
## Login
```bash
-[x]El login debe tener un titulo.
-[x]El login debe tener un input de usuario.
-[x]El login debe tener un input de contraseña.
-[x]El login debe tener un boton de login.
-[x]El login debe tener un boton de registro.
```
## Registro
```bash
-[x]El registro debe ser de forma modal integrado en el login.
-[x]El registro debe tener un titulo.
-[x]El registro debe tener un input de nombre.
-[x]El registro debe tener un input de lastname.
-[x]El registro debe tener un input de usuario.
-[x]El registro debe tener un input de contraseña.
-[x]El registro debe tener un input de confirmar contraseña.
-[x]El registro debe tener un input de fecha de nacimiento.
-[x]El registro debe tener un input de genero.
-[x]El registro debe tener un boton de registro.
-[x]El registro debe tener un boton de login.
-[x]El registro debe tener un boton de cancelas.
```
## Home
```bash
-[x]El home debe tener un titulo.
-[x]El home debe tener un subtitulo.
-[x]El home debe tener un carousel de presentacion de productos.
```
## Categorias
```bash
-[x]Las categorias deben tener un titulo.
-[x]Las categorias deben tener un subtitulo.
-[x]Las categorias deben tener una tabla con los atributos de la categoria (id,nombre,descripcion,categoria).
-[x]Las categorias deben tener un boton de agregar categoria.
-[x]Las categorias deben tener un boton de editar categoria.
-[x]Las categorias deben tener un boton de eliminar categoria.
```

## Productos
```bash
-[x]Los productos deben tener un titulo.
-[x]Los productos deben tener un subtitulo.
-[x]Los productos deben tener imagenes de los productos.
-[x]Los productos deben tener una tabla con los atributos del producto (id,nombre,descripcion,categoria,imagen,cantidad).
-[x]Los productos deben tener un boton de agregar producto.
-[x]Los productos deben tener un boton de editar producto.
-[x]Los productos deben tener un boton de eliminar producto.
```

## Estructura del proyecto
```bash
.
├── Javascript
│   ├── Category.js
│   ├── Home.js
│   ├── Login.js
│   ├── Product.js
│   └── Register.js
├── Public
│   ├── icons
│   │   ├── amd.svg
│   │   ├── nintendo-switch.svg
│   │   ├── pc-display.svg
│   │   ├── person-bounding-box.svg
│   │   ├── playstation.svg
│   │   └── xbox.svg
│   ├── img
│   │   ├── Background
│   │   │   ├── retro-aesthetic-arcade-cabinets-hczrmjgb41oigta4.jpg
│   │   │   └── speed-pacman-gaming-ytf8gwwevf5vs2a9.jpg
│   │   ├── Carousel
│   │   │   ├── artiom-vallat-H-qqp_Eqaww-unsplash.jpg
│   │   │   ├── carl-raw-m3hn2Kn5Bns-unsplash.jpg
│   │   │   ├── florian-olivo-Mf23RF8xArY-unsplash.jpg
│   │   │   ├── hannah-rodrigo-mf_3yZnC6ug-unsplash.jpg
│   │   │   └── sigmund-By-tZImt0Ms-unsplash.jpg
│   │   ├── Games
│   │   │   ├── minecraft-6eL_lMJDwjM-unsplash.jpg
│   │   │   ├── need-for-seed-RgJqQPZupgM-unsplash.jpg
│   │   │   └── warzone-nmTm7knUnqs-unsplash.jpg
│   │   ├── Login
│   │   │   └── man-and-robot-gaming-on-sunset-pyjpe9hg4oqwi8em.jpg
│   │   ├── Pc
│   │   │   ├── eldein-ring-8zvGIv4pw1I-unsplash.jpg
│   │   │   ├── pokemon-ASpmEI-unsplash.jpg
│   │   │   └── spider-man-PXjQaGxi4JA-unsplash.jpg
│   │   ├── Play
│   │   │   ├── control-1-YsPnamiHdmI-unsplash.jpg
│   │   │   ├── control-2-w0erZAfnkjg-unsplash.jpg
│   │   │   └── fifa-ikz8R6LGbK8-unsplash.jpg
│   │   └── Xbox
│   │       ├── control-Y56xXBtlL0k-unsplash.jpg
│   │       ├── fornite-qgInQSplXBU-unsplash.jpg
│   │       └── xbox-console-H3wPbf3-_-Q-unsplash.jpg
│   └── Styles
│       ├── Carousel.css
│       ├── Category.css
│       ├── Home.css
│       ├── Login.css
│       ├── Product.css
│       └── Register.css
├── README.md
└── src
    └── pages
        └── components
            ├── Carousel
            │   └── Carousel.html
            ├── Category
            │   ├── Category.html
            │   ├── Games.html
            │   ├── Pc.html
            │   ├── Play.html
            │   └── Xbox.html
            ├── Home
            │   └── Home.html
            ├── Login
            │   └── Login.html
            └── Product
                └── Product.html

20 directories, 47 files
```
