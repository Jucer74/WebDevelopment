# HTML - Practice
Crear una pagina para mostrar su Curriculum utilizando unicamente componentes HTML y CSS (No Bootstrap ni JavaScript)

La pagina debe ser similar a la siguiente imagen:

![Curriculum](/Plantillas/Home.jpg)


Con las siguientes Opciones

- Home
- Resume
- Work
- Contact

Cada una de ellas las puede encontrar en el directorio de Plantillas, asi como algunas indicaciones de como se debe realizar el proceso.

# Condiciones
- La Pagina debe ocupar el total de la venana del navegador estando maximizado
- Cada opcion debe cargar los datos de cu cotenido sin refrescar toda la pagina solo la porción que le corresponde
- Solo debe utilizar componente HTML y CSS no componentes Bootstrap o cualquier otra libreria o framework, ni tampoco debe usar Javascript 

# Walkthrough

## Navegacion

1. Creremos la pagina principal llamada **index.html** en donde construiremos el armazon principal utlizando el siguiente contenido.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Curriculum</title>
</head>
<body>
    <header>
        <h1>Header</h1>
    </header>

    <main>
        <h1>Main</h1>
    </main>

    <footer>
        <h1>Footer</h1>
    </footer>
</body>
</html>
```

2. Adicionamos las paginas de cada una de las opciones unicamente con el nmobre de cada una de ellas asi:

- **home.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>
<body>
    <h1>Home</h1>
</body>
</html>
```

- **resume.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>
</head>
<body>
    <h1>Resume</h1>
</body>
</html>
```

- **work.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Work</title>
</head>
<body>
    <h1>Work</h1>
</body>
</html>
```

- **contact.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact</title>
</head>
<body>
    <h1>Contact</h1>
</body>
</html>
```


3. Activemos la Navegacion en la pagina de **index**, para ello adicionaremos el elemento **iframe** con el objetivo de solo cargar la opción corespondiente sin tener qu erecargar toda la pagina asi:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Curriculum</title>
</head>
<body>
    <header>
        <h1>Header</h1>
        <ol>
            <li><a id="linkHome" href="/home.html" target="iframeMain">Home</a></li>
            <li><a id="linkResume" href="/resume.html" target="iframeMain">Resume</a></li>
            <li><a id="linkWork" href="/work.html" target="iframeMain">Work</a></li>
            <li><a id="linkContact" href="/contact.html" target="iframeMain">Contact</a></li>
        </ol>
    </header>

    <main>
        <h1>Main</h1>
        <iframe src="/home.html" title="Curriculum" name="iframeMain"></iframe>
    </main>

    <footer>
        <h1>Footer</h1>
    </footer>
</body>
</html>
```
Tenga presente que cada una de las opciones esta referenciando a la pagina html correspondiente y que el **target** hace referencia al iframe denominado **iframeMain**, con el fin de renderizar dentro de este la pagina correspondiente.

Notese tambien qhe el iframe, tiene por defecto la pagina **home.html** como pagina inicial.

En este punto pude probrar la navegacion para validar que esta funcionando corectamente.

![Navegacion](/Plantillas/01-Navigation.jpg)


## Secciones
4. Ahora integremos identifiquemos los colores para que los podamos usar en todas las paginas, para ello utilizaremos los codigo RGB de cada uno y les daremos un nombre para poderlos utilizar en el componente indicado

- <span style="background-color: #353A40;">#353A40</span> : darkgray
- <span style="background-color: #F7F7F7;">#F7F7F7</span> : lightgray
- <span style="background-color: #000000;">#000000</span> : black
- <span style="background-color: #FFFFFF;">#FFFFFF</span> : white
- <span style="background-color: #007AFF;">#007AFF</span> : blue
- <span style="background-color: #27A844;">#27A844</span> : green
- <span style="background-color: #FEC107;">#FEC107</span> : yellow
- <span style="background-color: #DC3546;">#DC3546</span> : red
- <span style="background-color: #2DA643;">#2DA643</span> : bar

5. Adicionemos la hoja de estio denominada **styles.css** dentro del directorio **css** y agregemos la sccion raiz con los colores especificados como variables para reutilizar en los demas estylos asi como las dimensiones de la pagina principal.

```css
/* Global Variales */
:root {
    /* Colors */
    --color-darkgray: #353A40;
    --color-lightgray: #F7F7F7;
    --color-black: #000000;
    --color-white: #FFFFFF;
    --color-blue: #007AFF;
    --color-green: #27A844;
    --color-yellow: #FEC107;
    --color-red: #DC3546;
    --color-bar: #2DA643;
    /* Dimensions */
    --header-height: 20%;
    --main-height: 70%;
    --footer-height: 10%;
    --content-width: 100%;
    --content-height: 100%;
}
```
6. En la pagina de **index.html** agregemos la referencia a la hoja de estilos, en el **heade** de la pagina

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/styles.css">    
    <title>Curriculum</title>
</head>
```

7. Ahora en la hoja de estilos, Redimensionaremos las secciones de **header**, **main** y **footer** para identificarlas dentro de la pagina, utilizando las variables de las dimensiones y usando algunos de los colores definidos:

```css
/* Main Sections*/
header {
    height: var(--header-height);
    border: 3px solid var(--color-yellow);
}

main {
    height: var(--main-height);
    border: 3px solid var(--color-blue);
}

footer {
    height: var(--footer-height);
    border: 3px solid var(--color-red);
}
```
![Navegacion](/Plantillas/02-Sections.jpg)

## Dimensiones
8. Notese que las secciones no ocupan todo el tamaño de la pantalla, por lo que ahora adicionaremos la dimension principal de cada una de ellas dentro de la pagina, aplicando los siguientes estilos:

```css
/* Dimensions */
html, body, iframe  {
    margin: 0; 
    padding: 0;
    border: 0;
    height: var(--content-height);
    width: var(--content-width);
}

/* Main Sections */
```
Esta session la definimos antes de las Secciones principales

9. Ahora pondremos, momentaneamente, entre comentarios la lista de enlaces y nuestro iframe, para ver como queda definida nuestra pagina:

```html
<body>
    <header>
        <h1>Header</h1>
        <!-- <ol>
            <li><a id="linkHome" href="/home.html" target="iframeMain">Home</a></li>
            <li><a id="linkResume" href="/resume.html" target="iframeMain">Resume</a></li>
            <li><a id="linkWork" href="/work.html" target="iframeMain">Work</a></li>
            <li><a id="linkContact" href="/contact.html" target="iframeMain">Contact</a></li>
        </ol> -->
    </header>

    <main>
        <h1>Main</h1>
        <!-- <iframe src="/home.html" title="Curriculum" name="iframeMain"></iframe> -->
    </main>

    <footer>
        <h1>Footer</h1>
    </footer>
</body>
```

Veamos que nuestra pagina ahora ocupa todo el tamaño de la pantalla y se reajusta si el navegador cambia de tamaño.

![Dimensiones](/Plantillas/03-Dimensions.jpg)

## Encabezado
Ahora que ya tenemos nuestra pagina lista vamos a centrarnos en el **encabezado**, para ello vamos a dividirlo de forma que podamos ir situando los elementos por porciones o divisiones.

10. Dividimos el encabezado primero posicionando la foto de la persona y a su lado las acciones, para ello creamos las siguientes divisiones y realizamos los siguientes cambios

- Eliminar el titulos de seccion (**h1**)
- Crear la Division de tipo **container** para poder distribuir las partes dentro de la misma seccion
- Crear la division de **divPhoto** y **divActions** en el **header**
- Crear los estilos para los elementos de **div** y **box** para estas divisiones

Para esto agregaremos los siguientes estilos:

```css
/* Containers */
.container-row {
    display: flex;
    flex-wrap: nowrap;    
    height: 100%;
    flex-direction: row;
}

.container-col {
    display: flex;
    flex-wrap: nowrap;    
    width: 100%;
    flex-direction: column;
}

/* Boxes */
.box {
    border: 1px solid black;
    align-items: center;
}

.box-flex {
    flex: 1;
    flex-wrap: nowrap;
}

.box-photo {
    width: 15%;
}
```

Ahora adicionaremos las divisiones ala pagina de **index.html**

```html
    <header>
        <div id="divHeader" class="container-row">
            <div di="divPhoto" class="box box-photo">
                photo
            </div>
            <div id="divActions" class="box box-flex">
                actions
            </div>
        </div>
        <!-- <ol>
            <li><a id="linkHome" href="/home.html" target="iframeMain">Home</a></li>
            <li><a id="linkResume" href="/resume.html" target="iframeMain">Resume</a></li>
            <li><a id="linkWork" href="/work.html" target="iframeMain">Work</a></li>
            <li><a id="linkContact" href="/contact.html" target="iframeMain">Contact</a></li>
        </ol> -->
    </header>
```

![Dimensiones](/Plantillas/04-Header.jpg)

## Actions
11. Ahora modificamos la division de las acciones y creamos las divisiones siguientes:

- Nombre y Social (divNameSocial)
- Rol O Posicion (divRole)
- Menu de Navegacion (divNav)

Estos cambios los adicionaremos a nivel de la division de Acciones asi:

En los estilos:

```css
/* Boxes */
.box {
    border: 1px solid black;
    align-items: center;
}

.box-flex {
    flex: 1;
    flex-wrap: nowrap;
}

.box-photo {
    width: 15%;
}

.box-name-social
{
    height: 25%;
}

.box-role
{
    height: 25%;
    text-align: left;
    align-content: center;
}

.box-nav {
    height: 50%;
}
```

En la pagina **index.html**

```html
    <header>
        <div id="divHeader" class="container-row">
            <!-- photo -->
            <div di="divPhoto" class="box box-photo">
                photo
            </div>
            <!-- actions -->
            <div id="divActions" class="container-col box-flex">
                <!-- name and social -->
                <div id="divNameAndSocial" class="box box-name-social">
                    Name and Social
                </div>
                <!-- role or position -->
                <div id="divRole" class="box box-role">
                    Role or Position
                </div>
                <!-- nav -->
                <div id="divNav" class="box box-nav">
                    Nav
                </div>
            </div>
        </div>
        <!-- <ol>
            <li><a id="linkHome" href="/home.html" target="iframeMain">Home</a></li>
            <li><a id="linkResume" href="/resume.html" target="iframeMain">Resume</a></li>
            <li><a id="linkWork" href="/work.html" target="iframeMain">Work</a></li>
            <li><a id="linkContact" href="/contact.html" target="iframeMain">Contact</a></li>
        </ol> -->
    </header>
```
Con estos cambios obtendremos lo siguiente:

![Dimensiones](/Plantillas/05-Actions.jpg)

# Name and Social
12. Ahora modificaremos la sesion del Nombre y adicionaremos tambien los botones y enlaces a las redes sociales, y ajustando su contenido

```css
/* Boxes */
.box {
    border: 1px solid black;
    align-items: center;
}

.box-flex {
    flex: 1;
    flex-wrap: nowrap;
}

.box-photo {
    width: 15%;
}

.box-name-social
{
    height: 25%;
}

.box-role
{
    height: 25%;
    text-align: left;
    align-content: center;
}

.box-nav {
    height: 50%;
}

.box-name {
    width: 40%;
}

.box-social {
    width: 15%;
}
```

```html
    <header>
        <div id="divHeader" class="container-row">
            <!-- photo -->
            <div di="divPhoto" class="box box-photo">
                photo
            </div>
            <!-- actions -->
            <div id="divActions" class="container-col box-flex">
                <!-- name and social -->
                <div id="divNameAndSocial"  class="container-row box-flex box-name-social">
                    <div id="divName" class="box box-name">
                        Name
                    </div>
                    <div id="divTwitter" class="box box-social">
                        twitter
                    </div>
                    <div id="divFacebook" class="box box-social">
                        facebook
                    </div>
                    <div id="divInstagram" class="box box-social">
                        instagram
                    </div>
                    <div id="divgithub" class="box box-social">
                        github
                    </div>
                </div>
                <!-- role or position -->
                <div id="divRole" class="box box-role">
                    Role or Position
                </div>
                <!-- nav -->
                <div id="divNav" class="box box-nav">
                    Nav
                </div>
            </div>
        </div>
        <!-- <ol>
            <li><a id="linkHome" href="/home.html" target="iframeMain">Home</a></li>
            <li><a id="linkResume" href="/resume.html" target="iframeMain">Resume</a></li>
            <li><a id="linkWork" href="/work.html" target="iframeMain">Work</a></li>
            <li><a id="linkContact" href="/contact.html" target="iframeMain">Contact</a></li>
        </ol> -->
    </header>
```
En este punto tenemos algo como lo siguiente:

![Name And Social](/Plantillas/06-NameAndSocial.jpg)




