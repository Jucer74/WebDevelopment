# Services
En esta sección veremos como desacoplar nuestra aplicacion, delegando la responsabilidad del llamado del a API a una libreria de servicos que se encargara de dicha operacion. Para entender mejor este concepto miremos la siguiente imagen.

![Services](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-05-Services/Services-01.png)

# Librería de Servicios
1. Seleccionamos el icono de la solución y hacemos click derecho. en el menú flotante escogemos la opción Add y luego **New Project**.

![Services](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-05-Services/Services-02.png)

2. Cambiamos el tipo por **Library** y filtramos usando las palabras **Class Library** y del listado seleccionamos la que referencia a **Class Library .Net Core**

![Services](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-05-Services/Services-03.png)

Asegurse de que sea **.Net Core** para evitar incompatibilidades

3. Asignele el Nombre de **WebDev.Services** y segurese de estarlo creando en el mismo directorio donde esta toda la aplicación.

![Services](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-05-Services/Services-04.png)

4. Cambie el Nombre del archivo **Class1.cs** a **UsersService.cs**, haciendo click derecho sobre el archivo y selecionando renombrar (Rename)

![Services](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-05-Services/Services-05.png)

5. Ahora vamos a adicionar cambios en la configuracion de nuestro Sitio web para poder configurar la Url de nuestra API de Usuarios. para ellos vamos a agregar una nueva seccion en el archivo de **appsettings.json** asi:

```json
{
   "Logging": {
      "LogLevel": {
         "Default": "Information",
         "Microsoft": "Warning",
         "Microsoft.Hosting.Lifetime": "Information"
      }
   },
   "AllowedHosts": "*",
   "ApiConfiguration": {
      "ApiUsersUrl": "https://localhost:5001/",
      "ApiLoginUrl": "https://localhost:5001/"
   }
}
```
6. Adicionamos un nuevo folder llamado **Config** y dentro una nueva clase llamada **ApiConfiguration.cs**, para poder almacenar los datos de esta nueva Sección.

![Services](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-05-Services/Services-06.png)

Le asignamos el siguiente contenido:

```csharp
namespace WebDev.Application.Config
{
  public class ApiConfiguration
  {
    public string ApiUsersUrl { get; set; }
    public string ApiLoginUrl { get; set; }
  }
}
```

Con esto dejamos preparados los datos necesarios para cargar las Url de nuestras APIs.


7. Referenciamos nuestro proyecto de servicios dentro de nuestro sitio haciendo click derecho sobre Dependencies y seleccionado la opción **Add Project Reference...**

![Services](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-05-Services/Services-07.png)


8. Seleccione el proyecto **WebDev.Services** y acepte los cambios.
 
![Services](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-05-Services/Services-08.png)


9. Ahora adicionaremos la lectura de la nueva sección, haciendo llamado al servicio de Configure en la clase **Startup**, en el método de **ConfigureServices** , para ello necesitamos incluir el llamado al modelo y luego la carga de la configuración, asi que ejecutaremos los siguientes pasos:

- Adicione el Namespace de los modelos a la lista de los Using al inicio de la clase asi:

```csharp
using WebDev.Application.Config;
```

- Adicione el llamado de la configuración

```csharp
public void ConfigureServices(IServiceCollection services)
{
  services.AddControllersWithViews();
  services.Configure<ApiConfiguration>(Configuration.GetSection("ApiConfiguration"));
}
```
Estos pasos nos habilitan la lectura del archivo de configuración de nuestro proyecto y obtiene el contenido de la sección **ApiConfiguration** y su resultado lo asigna a nuestro modelo del mismo nombre, esto permite que esta configuración pueda ser inyectada a culquier otro objeto, como por ejemplo el controlador de Usuarios de nuestro mismo proyecto.

10. En nuestro controlador de usuarios vamos a adicionar el llamado de la configuración inyectada por nuestra clase StartUp asi:

- Adicione el namespace de servicios y el de Config en la sección de los using:

```csharp
using WebDev.Application.Config;
using WebDev.Services;
```
- Incluya la creacion de la variable de configuración local

```csharp
private readonly ApiConfiguration _apiConfiguration;
```

- Modifique el contructor del controlador para recibir la configuración que inyecta la clase **StartUp**.

```csharp
public UsersController(IOptions<ApiConfiguration> apiConfiguration)
```

- Asigne el valor del parámetro que se inyecta a la variable de la clase

```csharp
_apiConfiguration = apiConfiguration.Value;
```

11. Adicione un punto de interrupción en esta ultima linea y ejecute de nuevo el proyecto para ver el contenido de las variables que recibe el controlador, esto lo puede hacer presionando la tecla **F9** en esta linea (de igual forma puede eliminar el punto de interrupción) y ahora ejecute la aplicación y seleccione la opción de **Users**.

12. Ahora volvamos a nuestra clase **UsersService** y la modificamos para que reciba la Url de esta configuración, adicionando un constructor parametrizado y la variable interna para manejar dicha Url.

- Adicione una propiedad de colo lectura para validar la Url base del manejo de usuarios

```csharp
private string BaseUrl { get; }
```
- Adicione el Constructor que reciba la url base del servicio y lo asigne a la propiedad.

```csharp
public UsersService(string baseUrl)
{
  BaseUrl = baseUrl;
}
```

13. Adicionamos un Folder llamado **Entities** y creamos una nueva clase llamada **UserDto.cs**, que basicamente es igual al contenido de nuestra clase del modelo de la aplicacion.

![Services](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-05-Services/Services-09.png)

```csharp
namespace WebDev.Services.Entities
{
  public class UserDto
  {
    public int Id { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }

    private UserDto()
    {

    }

    public static UserDto Build(int id, string email, string name, string username, string password)
    {
      return new UserDto
      {
        Id = id,
        Email = email,
        Name = name,
        Username = username,
        Password = password
      };
    }

  }
}
```
Este va a ser nuestro objeto de transporte de los datos de la API hacia la aplicación.

14. Adicionamos este nuevo namespace a nuestro controlador en la sección de using.

```csharp
using WebDev.Services.Entities;
```
De esta forma preparamos al controlador a recibir los Dto para asignar los datos.

15. En nuestro proyecto de servicios vamos a adicionar las librerias necesarias para poder consumir una API usando HTTP, adicionando los siguientes Nugets:
	- System.Net.Http
	- Microsoft.AspNet.WebApi.Client

16. Ahora en nuestra clase **UsersService** vamos a adicionar los namespaces correspondientes al uso de Http y lo necesarios para nuestras entidades.

```csharp
using Newtonsoft.Json;
using System.Net.Http;  
using System.Net.Http.Headers; 
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WebDev.Services.Entities;
```
17. Adicione la vble privada **httpClient** para asignar la conexión http.

```csharp
private HttpClient _httpClient;
```

18. Adicione el metodo **SetupHttpConnection**

```csharp
private void SetupHttpConnection(HttpClient httpClient, string baseUrl)
{
  //Passing service base url  
  httpClient.BaseAddress = new Uri(baseUrl);

  httpClient.DefaultRequestHeaders.Clear();

  //Define request data format  
  httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
}
```

19. Modifique el constructor y Adicione el llamado al metodo **SetupHttpConnection**   

```csharp
public UsersService(string baseUrl)
{
  BaseUrl = baseUrl;

  _httpClient = new HttpClient();

  SetupHttpConnection(_httpClient, baseUrl);
}
```

20. Ahora en nuestra clase **UsersService** vamos a crear los métodos correspondientes a cada una de las Opciones del CRUD, consumiendo los servicios de nuestra WebApi

- GetUsers
- GetUserById
- AddUser
- UpdateUser
- DeleteUser

## GetUsers

```csharp
public async Task<List<UserDto>> GetUsers()
{
  var usersList = new List<UserDto>();

  // Sending request to find web api REST service resource to Get All Users using HttpClient
  HttpResponseMessage response = await _httpClient.GetAsync("api/Users");

  // Checking the response is successful or not which is sent using HttpClient
  if (response.IsSuccessStatusCode)
  {
    // Storing the content response recieved from web api
    var responseContent = response.Content.ReadAsStringAsync().Result;

    //Deserializing the response recieved from web api and storing into the Employee list
    usersList = JsonConvert.DeserializeObject<List<UserDto>>(responseContent);
  }

  return usersList;
}

```
## GetUserById
```csharp
public async Task<UserDto> GetUserById(int id)
{
  UserDto user = null;

  // Sending request to find web api REST service resource to Get All Users using HttpClient
  HttpResponseMessage response = await _httpClient.GetAsync($"api/Users/{id}");

  // Checking the response is successful or not which is sent using HttpClient
  if (response.IsSuccessStatusCode)
  {
    // Storing the content response recieved from web api
    var responseContent = response.Content.ReadAsStringAsync().Result;

    //Deserializing the response recieved from web api and storing into the Employee list
    user = JsonConvert.DeserializeObject<UserDto>(responseContent);
  }

  return user;
}
```

## AddUser
```csharp
public async Task<UserDto> AddUser(UserDto user)
{
  UserDto userDtoResponse = null;

  StringContent content = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");

  // Sending request to find web api REST service resource to Add an User using HttpClient
  HttpResponseMessage response = await _httpClient.PostAsync($"api/Users", content);

  // Checking the response is successful or not which is sent using HttpClient
  if (response.IsSuccessStatusCode)
  {
    // Storing the content response recieved from web api
    var responseContent = response.Content.ReadAsStringAsync().Result;

    //Deserializing the response recieved from web api and storing into the Employee list
    userDtoResponse = JsonConvert.DeserializeObject<UserDto>(responseContent);
  }

  return userDtoResponse;
}
```

## UpdateUser
```csharp
public async Task<UserDto> UpdateUser(UserDto user)
{
  UserDto userDtoResponse = null;

  StringContent content = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");

  // Sending request to find web api REST service resource to Add an User using HttpClient
  HttpResponseMessage response = await _httpClient.PutAsync($"api/Users/{user.Id}", content);

  // Checking the response is successful or not which is sent using HttpClient
  if (response.IsSuccessStatusCode)
  {
    // Storing the content response recieved from web api
    var responseContent = response.Content.ReadAsStringAsync().Result;

    //Deserializing the response recieved from web api
    userDtoResponse = JsonConvert.DeserializeObject<UserDto>(responseContent);
  }

  return userDtoResponse;
}

```

## DeleteUser
```csharp
public async Task<UserDto> DeleteUser(int id)
{
  UserDto userDtoResponse = null;

  // Sending request to find web api REST service resource to Delete the User using HttpClient
  HttpResponseMessage response = await _httpClient.DeleteAsync($"api/Users/{id}");

  // Checking the response is successful or not which is sent using HttpClient
  if (response.IsSuccessStatusCode)
  {
    // Storing the content response recieved from web api
    var responseContent = response.Content.ReadAsStringAsync().Result;

    // Deserializing the response recieved from web api
    userDtoResponse = JsonConvert.DeserializeObject<UserDto>(responseContent);
  }

  return userDtoResponse;
}
```

# Cambios en el Controlador
Ahora realizaremos los cambios a nivel del controlador para llamar a los servicios

1. Adicionamos la librria para manejo asincronico

```csharp
using WebDev.Services.Entities;
```

2. Adicionamos nuestra variable para los servicios

```csharp
private UsersService usersService;
```

3. A nivel del Constructor instanciamos el nuevo servicio con la Url correspondiente.

```csharp
public UsersController(IOptions<ApiConfiguration> apiConfiguration)
{
  _apiConfiguration = apiConfiguration.Value;

  usersService = new UsersService(_apiConfiguration.ApiUsersUrl);
}
```

4. Adicionamos dos metodos **Mapeadores** nuevos al final de la clase para realizar las conversiones de los datos entre el modelo y el Dto.

```csharp
private User MapperToUser(UserDto userDto)
{
  return new User
  {
    Id = userDto.Id,
    Email = userDto.Email,
    Name = userDto.Name,
    Username = userDto.Username,
    Password = userDto.Password
  };
}

private UserDto MapperToUserDto(User user)
{
  return UserDto.Build(
    id: user.Id,
    email: user.Email,
    name: user.Name,
    username: user.Username,
    password: user.Password
  );
}

```

4. Modificamos todos nuestros metodos cambiando el modo de ejecucion a manejo asincronico y con tipo Tarea.

## Index
```csharp
// GET: UsersController
[HttpGet]
public async Task<ActionResult> Index()
{
  IList<UserDto> users = await usersService.GetUsers();

  _userList = users.Select(userDto =>MapperToUser(userDto)).ToList();

  return View(_userList);
}
```

## Details
```csharp
// GET: UsersController/Details/5
[HttpGet]
public async Task<ActionResult> Details(int id)
{
  var userFound = await usersService.GetUserById(id);

  if (userFound == null)
  {
    return NotFound();
  }

  var user = MapperToUser(userFound);

  return View(user);
}
```

## Create
```csharp
// GET: UsersController/Create
[HttpGet]
public ActionResult Create()
{
  return View();
}

// POST: UsersController/Create
[HttpPost]
[ValidateAntiForgeryToken]
public async Task<ActionResult> Create(User user)
{
  try
  {
    if (ModelState.IsValid)
    {
      var userAdded = await usersService.AddUser(MapperToUserDto(user));
    }

    return RedirectToAction(nameof(Index));
  }
  catch
  {
    return View();
  }
}
```

## Edit
```csharp
// GET: UsersController/Edit/5
[HttpGet]
public async Task<ActionResult> Edit(int id)
{
  var userFound = await usersService.GetUserById(id);

  if (userFound == null)
  {
    return NotFound();
  }

  var user = MapperToUser(userFound);

  return View(user);
}

// POST: UsersController/Edit/5
[HttpPost]
[ValidateAntiForgeryToken]
public async Task<ActionResult> Edit(User user)
{
  try
  {
    if (ModelState.IsValid)
    {
      var userModified = await usersService.UpdateUser(MapperToUserDto(user));

      return RedirectToAction(nameof(Index));
    }
    return View(user);
  }
  catch
  {
    return View();
  }
}

```

## Delete
```csharp
// GET: UsersController/Delete/5
[HttpGet]
public async Task<ActionResult> Delete(int id)
{
  var userFound = await usersService.GetUserById(id);

  if (userFound == null)
  {
    return NotFound();
  }

  var user = MapperToUser(userFound);

  return View(user);
}

// POST: UsersController/Delete/5
[HttpPost]
[ValidateAntiForgeryToken]
public async Task<ActionResult> Delete(User user)
{
  try
  {
    var userFound = await usersService.GetUserById(user.Id);

    if (userFound == null)
    {
      return View();
    }

    var userDeleted = await usersService.DeleteUser(user.Id);

    return RedirectToAction(nameof(Index));
  }
  catch
  {
    return View();
  }
}
```

## Probemos
1. Levantemos nuestra API en una ventana de comandos.
- Nos cambiamos hasta el directorio en donde esta nuestro proyecto

por ejemplo:

    cd "D:\Documents\My Repositories\WebDev\Proyecto\Api\WebDev.Api\WebDev.Api"

y ejecutamos el comando

    dotnet run

vemos que la Api retorna el EndPoint por donde esta funcionando en este caso

    https://localhost:5001

esta es la URL que necesitamos para nuestro archivo de **AppSetting.json**

2. Ejecutamos nuestro proyecto y vamos ejecutando paso a paso nuestras instrucciones.


## Problemas de Certificados
Si se llega a presentar un error con algo relacionado con el manejo de certificados o conexion SSL, realice los siguientes ajustes a nivel de la clase **UsersService**.

1. Adiicone la siguiente variable a la clase.
```csharp
private HttpClientHandler _httpClientHandler;
```
2. A nivel del constructor de la clase cambie la siguiente asignacion:

```csharp
_httpClient = new HttpClient();
```
por estas lineas
```csharp
_httpClientHandler = new HttpClientHandler();
_httpClientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
_httpClient = new HttpClient(_httpClientHandler);
```

Lo que se esta haciendo en este caso es omitir el manejo del certificado y no realizar la validacion, por eso se retorna **true** en el manejador anonimo de la certificacion.
