# Proyecto
Tomando como Base su proyecto asignado, Implemente una solucion que incluya el desarrollo de una aplicacion web, utilizando los conceptos vistos en clase y las guias y videos sumistrados hasta el momento que permitan cumplir los siquientes requisitos:


## Requisitos

### Funcionales
1. **Login** <br>
La aplicacion debe incluir una pagina de Login que **debe ser la primer pagina** al iniciar la aplicacion y que debe permitir el ingreso al usuario, utilizando las credenciales basicas como: (Usuario/Contraseña)

2. **Registro** <br> 
La aplicacion debe permitir registrar a un nuevo usuario en caso de no tener credenciales y debe validar que los campos ingresados cumplan con las reglas de longitud, tipo, y nulidad o requerido. como base puede utilizar los siguientes campos:<br>

|   Campo          |     Tipo     | Requerido |          Reglas          |
|:----------------:|:------------:|:---------:|:------------------------:|
| Id               | int          |     Si    |                          |
| UserEmail        | Varchar(300) |     Si    | Debe ser un email Valido |
| FirstName        | Varchar(50)  |     Si    |                          |
| LastName         | Varchar(50)  |     Si    |                          |
| Password         | Varchar(20)  |     Si    |                          |
| ConfirmPassword  | Varchar(20)  |     Si    |                          |

La confimacion de la Contraseña es un campo que no se debe mapear o almacenar en el repositorio de los datos, pero si debe coincidir con la contraseña principal al momento de ser ingresada.

3. **Landing Page** <br>
Despues de ingresar a la aplicacion y pasar la pagina de login se despliega la pagina principal , en donde se debe desplegar un carrousel, que puede muostrar informacion relacionada con los productos o servicios o algun tipo de publicidad o alguna sección necesaria en el marco de las necesidades del proyecto.

4. **CRUD / Master Detail** <br>
- La aplicacion debe Mostrar en su Menu o barra de Navegacion las opciones que enlacen a los datos Maestros y a los datos de los detalles, y que permitan realizar las operaciones de administracion de los mismos (CRUD), como por ejemplo Crear, Obtener, Listar y Eliminar algun elemento del Maestro y de sus detalles.
- Es Importante Tener Presente que los datos del Maestro deben permitir Navegar a los detalles propios de su Tipo, es decir estando seleccionando un dato maestro, puedo ir a obtener todos los datos detalles asociados a ese codigo Maestro. Por ejemplo: Si tenemos las categorias de un tipos de Producto, y listando dichas categorias, deberia tener una Opcion desde esa lista que me permita obtEner todos los productos asociados a dicha categoria.
- Los detalles o productos, deben incluir una imagen, foto o cualquier otor elemento que referencie a una imagen que sea desplegada en la lista de los mismos y que pueda ser subida o actualizada en las opciones de CRUD de los detalles.


1. **Formulario de Contacto** <br>
Dentro de las Opciones que se depliegan en el menu o barra de navegación debe existir una opcion que haga referencia a **Contactenos**, en donde se despliega un formulario con los datos de :

- Nombre
- Email
- Pregunta o Comenario

Y que ademas debe mostrar un componente de geolocalizacion que muestre en un mapa, una ubicacion relacionada con el proyecto, por ejemplo la ubicacion de las oficinas, o algun otro dato relacionado con la ubicacion geoespacial relacionada.


### Técnicos
A nivel del Front la aplicacion debe ser desarrollada utilizando **ReactJS** cumpliendo las siguientes caracteristicas:

#### Caracteristicas
1. Responsive / Adaptative
2. Homogeneidad de la Interface gráfica (UX/UI)
- Botones
- Colores
- Fuentes

Para ello puede utilizar cualquiera de las siguientes Librerias de Estilos (CSS)
  - Bootstrap
  - Tailwind
  - Material UI

3. Debe utilizar de alguna forma la libreria Redux, para almancenar y asociar el estado de algun elemento de la interaz, como por ejemplo los datos de Token de autenticacion o los datos del Usuario que ingresa a la aplicacion.

#### Consumo de API
Para el Consumo de los datos puede utilizar cualquiera de las Siguientes Opciones
- Json-Server
- FAST API / MySql Database
- WebApi .Net / MySql Database

# Notas
- Le Proyecto debe ser subido al repositorio en su rama correspondinete dentro de la carpeta lamada  y no por fuera de ella
- En el transcurso de las clases se deben ir mostrando avances y realizar preguntas para aclarar dudas
- La Calificacion dependera de la calidad del proyecto y del cmplimiento de lso requisitos, asi como las explicaciones dadas en clase.

