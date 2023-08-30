Evaluación Práctica (60%)

Implemente una aplicación denominada MovieRank, que permita:

    El Login o ingreso a la aplicacion
    Login

    El Registro de un nuevo usuario
    Register

    El despliegue del menu principal de navegacion con Logo, Nombre de la aplicacion, opcion principal al CRUD de los elementos, el avatar e informacion del usuario asi como la lista en Carousel de los 10 primeros elementos
    Menu

    Cada Opcion del Carousel contiene, una CARD con la imagen del elemento respectivo, el Nombre o Titulo, asi como una barra de progreso que marca un valor que puede ser un Rate o un tiempo faltante, segun sea el caso, asi como un boton que depliega los detalles del elemento.
    CarouselCard

    La opcion de CRUD despliega en una tabla los elementos de la aplicacion y permite adicionar, Editar, ver detalles y eliminar un elemento
    CRUD

    Al seleccionar la accion (Create. Edit, Details, Delete) se despliegan el formulario para capturar o validar los datos con la informacion correspondiente: Actions

Consideraciones

    Utilice como base la solucion MovieRankMVC de este mismo Directorio.
    Utilice la definicion de MVC para el Modelo de los datos
    Utilice HTML5, CSS3 y Javascript en las paginas que lo requieran
    Elimine el codigo sobrante
    Los datos deben almacenarse en memoria, posiblemente en una lista statica que podra ser pasada a la vista directamente o usando el objeto dinamico ViewBag.

---

## Desarrollo

| Funcionales        | No funcionales            | Comentario                                 |
|--------------------|---------------------------|--------------------------------------------|
| - [ ] Login        | - [ ] mensajes validación | con el modal de login                      |
| - [ ] Register     | - [ ] modal login         |                                            |
| - [ ] DB usuarios  | - [ ] responsive home     |                                            |
| - [x] DB movies(1) | - [ ] responsive crud     | si encuentran otra melo                    |
| - [ ] CRUD movies  | - [ ] carrousel           |                                            |
| - [ ] model movies | - [ ] sm md lg revisar    |                                            |
| - [ ]              | - [ ] HTTPS 5001          | - [ ] Al editar traer los datos existentes |

Veamos si podemos manejarnos por medio de las siguientes carpetas:

* `Vistas`
* `Modelos`
* `Controladores`
* `wwwroot/Public`
* Si es algo nuevo, crear una carpetica nueva y ya :D

---

### Apuntes de la clase

AppName = MovieRank
CRUD = Movies
Rate = 1 - 10 / step 0.1
30 Movies
Duration = hh:mm
Genre = Action|Adventure|Sci-Fi

Al subir una foto, actualizar la de la ui

! config de las imagenes y urls en Appsettings
! mostrar cuadros de confirmacion

# UsersController

- [ ] Login
- [ ] Register

# MoviesController

- [ ] Index
- [ ] Create
- [ ] Edit
- [ ] Details
- [ ] Delete

List<Movies> : static -> ViewBag?Movies.

! debe ser con https

! port: //localhost:5001/_____

Martes 29 - 6:00 pm

user: admin@email.com
password: P4ssw0rd*01