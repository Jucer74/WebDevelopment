# Creación de la API
Utilizando **Visual Studio 2019** vamos a crear la API para poder efectuar las acciones sobre la tabla de usuarios.

## Crear el proyecto
**1.** Seleccione crear nuevo proyecto.

**2.** En el lenguaje filtre por **C#**, en los tipos de proyectos filtre por **Web** y seleccione la pantilla **ASP.NET Core Web Application**.

![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-01.png)

**3.** Asigne el nombre **WebDev.Api** para el proyecto y en la ruta escoja el directorio **Proyecto/Api** y presione el boton de **Create**.

![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-02.png)

**4.** Seleccione el tipo de proyecto, en este caso **API**

![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-03.png)


## Sincronizar
En este punto puede sincronizar su rama con la rama de **develop** y abrir el proyecto en lugar de crearlo.


# El Modelo
Ahora vamos a pasar a referencia el Modelo, que es la representación de la tabla en una clase que podemos manipular dentro de .Net. Para ellos vamos a ejecutar los siguientes pasos:

**1.** A nivel del proyecto cree la carpeta **Model**, esto lo puede hacer seleccionado el nodo principal del proyecto **WebDeb.Api** y haciendo click derecho seleccionar **Add/Folder** del menú flotante.

![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-04.png)

**2.** En la Nueva carpeta **Model** haga click derecho y selecciona **Add/Class**.

![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-05.png)

**3.** Cambio el nombre de la clase a **User**, en este caso en singular ya que va a hacer referencia a un elemento de la tabla de Users a la vez.

![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-06.png)

**4.** Complemente la clase de la siguiente forma:

```csharp
namespace WebDev.Api.Model
{
  using System.ComponentModel.DataAnnotations;

  public class User
  {
    [Key]
    public int Id { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Password { get; set; }

    [Required]
    public string Username { get; set; }
  }
}
```
Se debe terne presente que el nombre de los campos deben ser exactamente iguales a como aparecen en la tabla de la base de datos, es decir nombre y tipo.

# El Contexto
Ahora adicionemos el contexto que es la representacion de lo que podria ser la base de datos, es decir se crean estructuras se Set de datos de los tipos definidos en el modelo, ademas de identificar la cadena de conexión y el tipo de base de datos que vamos usar. para ello ejecutemos los siguientes pasos:

**1.** Adicionemos uns nueva carpeta llamada Context a nuestro proyecto, de igual forma como hicimos la del modelo.
![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-07.png)

**2.** Sobre esta nueva carpeta adicionamos una nueva clase 
![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-08.png)

**3.** Le asignamos el nombre de **AppDbContext**.
![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-09.png)

**4.** En este punto y antes de entrar a complementar el Contexto vamos a instalar el Entity Framework Core, que es la libreria que nos permite mapear de forma directa el modelo con los objetos de la base de datos. Para ello ejecutaremos los siguientes pasos:

**a.** Sobre el Proyecto en la sección de **Dependencies** hacemos click derecho y en el menú flotante seleccionamos la opción **Manage NuGet Packages...**

![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-10.png)

**b.** En el administrador seleccionamos la opcion **Browse** y en la barra de busqueda escribimos **Entity Framework Core (EF)**. en los resultados de la busqueda seleccionamos la opción correspondiente en el panel derecho presionamos el botón de **install**. 

![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-11.png)

**c.** Confirme la lista de componentes a descargar e instalar.

![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-12.png)

**d.** Acepte la licencia Open Source de instalación y espere a que el proceso finalice.

![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-13.png)

**e.** Al finalizar debe obtener una respuesta similar a esta, sin reporte de errores, para garantizar que todo quedo bien instalado.

![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-14.png)

**5.** Ahora procedemos a complementar la clase **AppDbContext** de la siguiente manera:

- Adicionamos la referencia Entity Framework Core
	
```csharp
using Microsoft.EntityFrameworkCore;`
```
- Ponemos a nuetra clase a heredar de **DbContext**.
- Le adicionamos un constructor para que pueda ser instanciado por el **EF**.
- Adicionamos otro constructor que permita utilizar las opciones del **EF**, para poder instanciar los objetos en el contexto.

```csharp
public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
{
}
```
- Referenciamos a los Objetos de nuestro modelo.

```csharp
using WebDev.Api.Model;
```
- Ahora adicionamos el objeto que hace referencia a nuestra tabla de usuarios.

```csharp
public DbSet<User> Users { get; set; }
```
Debe tener presente que dentro del DbSet va la clase del Modelo y despues el Nombre de la tabla exactamente como se llama en la base de datos.

Al final tenemos algo como esto:

```csharp
namespace WebDev.Api.Context
{
  using Microsoft.EntityFrameworkCore;
  using WebDev.Api.Model;

  public class AppDbContext : DbContext
  {
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
  }
}
```

# La cadena de conexión.
Ahora pasaremos a establecer la cadena de conexión hacia la base de datos. Para ellos realizaremos los siguientes pasos:

1. Seleccionamos el archivo **appsettins.json** .
2. Al final y siguiendo las reglas de JSON, adicionamos uns nueva sección llamada **ConnectionStrings** .
3. En esta nueva sección creamos nuestra nueva cadena de conexión hacia la base de datos y la llamaremos **CnnStr**, en la cual referenciaremos los siguiente:
	- La fuente de los datos o nuestro servidor local: **localhost**
	- El catalogo inicial de datos o nombre de nuestra base de datos: **UsersDB**
	- El usuario de base de datos: **Admin**
	- El password del usuario: **Admin123**
	- Adicionamos la opción de multiple concurrencia: **MultipleActiveResultSets=true** 

Al final tenemos algo como lo siguiente:

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
   "ConnectionStrings": {
      "CnnStr":  "data source=localhost; initial catalog=UsersDB; User Id= Admin; Password= Admin123; MultipleActiveResultSets=true"
   }
}
```

4. Para hacer uso de la conexion a la base de datos SQL Server debemos importar el NuGet correspondiente, en este caso instalamos **Microsoft.EntityFrameworkCore.SqlServer**, lo hacemos de igual forma como instalamos el Entity Framework Core.

![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-15.png)

5. Ahora referenciemos la cadena de conexion dentro de los servicios de la aplicación, para ello modificaremos la clase **StartUp**

**a.** Importamos nuestro contexto y las librerias de Entity Framework Core y las correspondinetes a SQL Server, para ello incluimos las siguientes lineas:

```csharp
using WebDev.Api.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
 ```

**b.** Ahora modificaremos la función **ConfigureServices** para adicionar nuestro servicio de conexión, adicionando el llamdo de la cadena de conexión, de la siguiente forma:

```csharp
services.AddDbContext<AppDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("CnnStr")));
 ```

**c.** Al final nos debe quedar algo como esto:
```csharp
// This method gets called by the runtime. Use this method to add services to the container.
public void ConfigureServices(IServiceCollection services)
{
  services.AddControllers();
  services.AddDbContext<AppDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("CnnStr")));
}
```

# El Controlador
Ahora pasaremos a crear el controlador para poder acceder a los servicios propios de la base de atos interactuando con el Contexto y el modelo. para ello seguiemos los siguientes pasos:

**1.** Seleccione la carpeta de **Controllers** haciendo click derecho, y escogiendo la opción de **Add/Controller...**

![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-16.png)

**2.** Ahora seleccionaremos el tipo de Controller que necesitamos, en este caso será: **API Controller with actions, using Entity Framework**

![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-17.png)

3. Ahora seleccionamos nuestra clase del Modelo (**User**), la clase del contexto (**AppDbContext**) y validamos que se construye el nombre **UsersController** en el nombre del controlador. 

![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-18.png)

Tenga presente que el controlador siempre deberá llevar la palabra Controller al final, ya que esta es la forma en como .Net lo referencia internamente.

![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-19.png)

De esta forma ya hemos creado un nuevo controlador con todas las operaciones necesarias para interactuar con la base de datos.

## Version Final del Controlador
```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebDev.Api.Context;
using WebDev.Api.Model;

namespace WebDev.Api.Controller
{
   [Route("api/[controller]")]
   [ApiController]
   public class UsersController : ControllerBase
   {
      private readonly AppDbContext _context;

      public UsersController(AppDbContext context)
      {
         _context = context;
      }

      // GET: api/Users
      [HttpGet]
      public async Task<ActionResult<IEnumerable<User>>> GetUsers()
      {
         if (_context.Users == null)
         {
            return NotFound();
         }
         return await _context.Users.ToListAsync();
      }

      // GET: api/Users/5
      [HttpGet("{id}")]
      public async Task<ActionResult<User>> GetUser(int id)
      {
         if (_context.Users == null)
         {
            return NotFound();
         }
         var user = await _context.Users.FindAsync(id);

         if (user == null)
         {
            return NotFound();
         }

         return user;
      }

      // PUT: api/Users/5
      // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
      [HttpPut("{id}")]
      public async Task<IActionResult> PutUser(int id, User user)
      {
         if (id != user.Id)
         {
            return BadRequest();
         }

         _context.Entry(user).State = EntityState.Modified;

         try
         {
            await _context.SaveChangesAsync();
         }
         catch (DbUpdateConcurrencyException)
         {
            if (!UserExists(id))
            {
               return NotFound();
            }
            else
            {
               throw;
            }
         }

         return NoContent();
      }

      // POST: api/Users
      // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
      [HttpPost]
      public async Task<ActionResult<User>> PostUser(User user)
      {
         if (_context.Users == null)
         {
            return Problem("Entity set 'AppDbContext.Users'  is null.");
         }
         _context.Users.Add(user);
         await _context.SaveChangesAsync();

         //return CreatedAtAction("GetUser", new { id = user.Id }, user);
         return Created(string.Empty, new { id = user.Id });
      }

      // DELETE: api/Users/5
      [HttpDelete("{id}")]
      public async Task<IActionResult> DeleteUser(int id)
      {
         if (_context.Users == null)
         {
            return NotFound();
         }
         var user = await _context.Users.FindAsync(id);
         if (user == null)
         {
            return NotFound();
         }

         _context.Users.Remove(user);
         await _context.SaveChangesAsync();

         return NoContent();
      }

      private bool UserExists(int id)
      {
         return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
      }
   }
}
```

# Configurar el Arranque
Ahora vamos a cambiar nuestro proyecto para que al iniciar tome por defecto nuestro nuevo controlador y no el que trae por defecto que se llama **weatherforecast**, para ello ejecutaremos los siguientes pasos:

**1.** Selecciona el archivo **launchSettings.json** que esta dentro de la carpeta **Properties**.

![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-20.png)

**2.** Reemplace todas las referencias a **weatherforecast** por el nuevo controlador, en nuestro caso seria **api/users**, al final tendríamos algo como lo siguiente:

```json
{
  "$schema": "http://json.schemastore.org/launchsettings.json",
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "http://localhost:59565",
      "sslPort": 44314
    }
  },
  "profiles": {
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "launchUrl": "api/users",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "WebDev.Api": {
      "commandName": "Project",
      "launchBrowser": true,
      "launchUrl": "api/users",
      "applicationUrl": "https://localhost:5001;http://localhost:5000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

3. Por ultimo elimine los archivos que hacen referencia al APi por defecto, en este caso **WeatherForecast.cs** y **WeatherForecastController.cs**.

# Probemos que funciona
Para validar que todo esta funcionando correctamente ejecutaremos el proyecto, presionando la tecla **F5** y validaremos el resultado.

En este punto debemos ver algo parecido a esto:

![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-21.png)

Asi podemos ver la lista de todos los usuarios que tenemos en la tabla de nuestra base de datos.


De igual forma ahora podemos ejecutar todos las acciones utilizando nuestra API.

# Refinemos 
Ahora vamos a modificar algunas de las acciones para simplificar la respuesta.

1. Modificar la respuesta del metodo PostUser

```js
return Created(string.Empty, new { id = user.Id });
```

2. Modificar la respuesta dle metodo DeleteUser

```js
return NoContent();
```

De esta forma se simplifican las respuestas para este tipo de proyecto. mas adelantes adicionaremos el manejo de seguridad para evitar los riesgos de estas operaciones.




# Adicionemos SWAGGER
Para facilitar el proceso de pruebas de todas las acciones, adicionaremos el servicio de Swagger a nuestra aplicación, de esta forma será mucho mas facil consumir nuestra API directamente. para ello ejecutaremos los siguientes pasos:

1. Adicionaremos el NuGet que nos permite adicionar los servicios de Swagger en este caso usaremos **Swashbuckle.AspNetCore**

![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-22.png)

2. Ahora configuraremos la aplicacion para consumir los servicios. para ello modificaremos nusetra clase **StartUp** adicionando el siguiente servicio a la función de **ConfigureServices** así:

```csharp
services.AddSwaggerGen(s => s.SwaggerDoc("v1", new OpenApiInfo { Title="User API", Version = "v1"} ));
```

3. Ahora modificaremos la función **Configure** para adicionar el llamado a nuestro servicio, de la siguiente forma:

```csharp
// Enable middleware to serve generated Swagger as a JSON endpoint.
app.UseSwagger();

// Enable middleware to serve swagger-ui (HTML. JS, CSS, etc.),
// specifying the Swagger JSON endpoint
app.UseSwaggerUI(s => s.SwaggerEndpoint("/swagger/v1/swagger.json", "Users API"));
```

Al final tenemos algo como esto:

```csharp
namespace WebDev.Api
{
  using Microsoft.AspNetCore.Builder;
  using Microsoft.AspNetCore.Hosting;
  using Microsoft.EntityFrameworkCore;
  using Microsoft.Extensions.Configuration;
  using Microsoft.Extensions.DependencyInjection;
  using Microsoft.Extensions.Hosting;
  using Microsoft.OpenApi.Models;
  using WebDev.Api.Context;

  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllers();
      services.AddDbContext<AppDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("CnnStr")));
      services.AddSwaggerGen(s => s.SwaggerDoc("v1", new OpenApiInfo { Title = "User API", Version = "v1" }));
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseHttpsRedirection();

      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });

      // Enable middleware to serve generated Swagger as a JSON endpoint.
      app.UseSwagger();

      // Enable middleware to serve swagger-ui (HTML. JS, CSS, etc.),
      // specifying the Swagger JSON endpoint
      app.UseSwaggerUI(s => s.SwaggerEndpoint("/swagger/v1/swagger.json", "Users API"));
    }
  }
}
```

Si quiere mantener la ejecución del swager al momento de ejecutar la aplicación puede cambiar el archivo de **launchsettings.json** de la siguiente forma:

```json
{
  "$schema": "http://json.schemastore.org/launchsettings.json",
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "http://localhost:59565",
      "sslPort": 44314
    }
  },
  "profiles": {
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "launchUrl": "swagger",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "WebDev.Api": {
      "commandName": "Project",
      "launchBrowser": true,
      "launchUrl": "api/users",
      "applicationUrl": "https://localhost:5001;http://localhost:5000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

Con este cambio cada vez que se ejecute la aplicacion utilizando IIS Express llamada automaticamente la pagina de Swagger y no el controlador directamente.


![Proyecto](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-02-WebApi/Proyecto-23.png)


### Autenticación Integrada con Windows
En caso de presentar problemas con el manejo del usuario se puede cambiar la cadena de conexión a la base de datos para que maneje autenticacion integrada con windows, para ello cambie la cadena de conexión por lo siguiente:

```json
"ConnectionStrings": {
      "CnnStr":  "data source=localhost; initial catalog=UsersDB; Integrated Security=True; MultipleActiveResultSets=true"
   }
```
De esta forma omitimos el paso del usuario de la base de datos y trabajamos con nuestro propio usuario del sistema operativo, que es el mismo que inicia el servicio de SQL Server.

