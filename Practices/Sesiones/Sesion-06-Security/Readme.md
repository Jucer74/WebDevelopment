# Login y Security
En esta sesión veremos como implementar el login de nuestra aplicación y como manejar la autenticación del usuario.

## Creemos el Login
Lo primero que vamos a hacer es incluir el login en nustra apliacion y vamos a dejarlo prototipado para que funcione correctamente, sin hacer, a[un, llamado a la API que se necesitara para ello.

1. Adicionemos el modelo de login a nuestra aplicación, seleccionando la carpeta **Models** y haciendo clik derecho y adicionando una nueva clase, la cual nombraremos **Login.cs**.

2. Complete el contenido de la clase de la siguiente forma:

```csharp
using System.ComponentModel.DataAnnotations;

namespace WebDev.Application.Models
{
  public class Login
  {
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    [Display(Name = "Remember me?")]
    public bool RememberMe { get; set; }
  }
}
```
3. Ahora adicionemos la vista correspondinete al modelo, para ello vamos a la carpeta de **Views** y dentro en el directorio de **Home**, hacemos click derecho escogemos **Add** y luego **View...** y adicionamos una nueva vista, la cual llamaremos **Login**.

![Security](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-06-Security/Security-01.png)

4 Seleccionamos la plantilla de **Razor View** y llenamos los datos de creacion con los siguientes valores:

![Security](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-06-Security/Security-02.png)

	- **View name:** Login
	- **Template:** Create
	- **Model class:** Login (WebDev.Application.Models)

5. Modificamos nuestra vista de la siguiente forma:

```html
@model WebDev.Application.Models.Login

@{
    ViewData["Title"] = "Login";
}

<h1>Login</h1>

<hr />
<div class="row">
    <div class="col-md-4">
        <form method="post" asp-action="Login">
            <div asp-validation-summary="ModelOnly" class="text-danger"></div>
            <div class="form-group">
                <label asp-for="Email" class="control-label"></label>
                <input asp-for="Email" type="email" id="txtEmail" name="email" placeholder="username@domain.com" class="form-control" />
                <span asp-validation-for="Email" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="Password" class="control-label"></label>
                <input asp-for="Password" type="password" id="txtPassword" name="password" class="form-control" />
                <span asp-validation-for="Password" class="text-danger"></span>
            </div>
            <div class="form-group form-check">
                <label class="form-check-label">
                    <input class="form-check-input" asp-for="RememberMe" /> @Html.DisplayNameFor(model => model.RememberMe)
                </label>
            </div>
            <div class="form-group">
                <input type="submit" value="Login" class="btn btn-primary" />
                <a asp-action="Index" class="btn btn-outline-info">Back to Home</a>
            </div>
        </form>
    </div>
</div>
```
6. Adicionemos el ActionResult correspondinete a esta vista en el contralador correspondinete, en este caso **HomeControler.cs**.

- Primero adicionamermos este Namespace en caso de no tenerlo

```csharp
using System.Threading.Tasks;
```

- Luego adicionamos los metodos que controlan el Login

```csharp
[HttpGet]
[Route("[controller]/[action]")]
public IActionResult Login()
{
  return View();
}

[HttpPost]
[ValidateAntiForgeryToken]
public async Task<IActionResult> Login(Login login)
{
  try
  {
    if (ModelState.IsValid)
    {
      // Llamar a la API para validar el Login
      if (await IsValidUser(login.Email, login.Password))
      {
        return RedirectToAction(nameof(Index));
      }
      ModelState.AddModelError(string.Empty, "Intento de inicio de sesión no válido.");
    }
  }
  catch(Exception ex)
  {
    ModelState.AddModelError(string.Empty, ex.Message);
  }
  return View();
}

public IActionResult Logout()
{
  return View();
}

private async Task<bool> IsValidUser(string email, string password)
{
  if (email.Equals("demouser@email.com") && password.Equals("Password*01"))
  {
    return true;
  }

  return false;
}
```
7. Ahora procederemos a controlar la navegación del Menu principal y asi controlar las opciones, para ello crearemos una vista parcial de la siguiente forma:

- Seleccionamos el Folder de **Views** y el directorio **Shared** y hacemos click derecho.
- Del Menu contextual escogemos **Add** y luego **View...** y escogemos la plantilla de **Razor View**.
- Ahora procederemos a llenar los datos asi:

![Security](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-06-Security/Security-03.png)

**View name:** _Loginpartial
**Template:** Create
[x] **Create as a partial view** Checked

8. Actualizamos el contenido con lo siguiente:

```html
@{
    if (ViewData["IsUserLogged"] == "true")
    {
        <div class="text-right">
            <ul class="navbar-nav flex-grow-1 text-right">
                <li class="nav-item">
                    <a class="nav-link text-dark" asp-controller="Users" asp-action="Index">Users</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark">@ViewData["User"]</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark" asp-controller="Home" asp-action="Logout">Logout</a>
                </li>
            </ul>
        </div>
    }
    else
    {
        <div class="text-right">
            <ul class="navbar-nav flex-grow-1 text-right">
                <li class="nav-item">
                    <a class="nav-link text-dark" asp-controller="Home" asp-action="Login">Login</a>
                </li>
            </ul>
        </div>
    }
}
```

9. De igual forma modificamos nuestra vista de **_Layout.csmthl**, para incluir la vista parcial y remover la opcion de **Users** de esta vista, obteniendo como resultado lo siguiente:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - WebDev.Application</title>
    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="~/css/site.css" />
    <!-- Datatables-->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.22/css/jquery.dataTables.min.css" />
    <!-- Font Awesome / Icons -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
          integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div class="container">
                <a class="navbar-brand" asp-area="" asp-controller="Home" asp-action="Index">WebDev.Application</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
                    <ul class="navbar-nav flex-grow-1">
                        <li class="nav-item">
                            <a class="nav-link text-dark" asp-area="" asp-controller="Home" asp-action="Index">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark" asp-area="" asp-controller="Home" asp-action="Privacy">Privacy</a>
                        </li>
                    </ul>
                </div>
                <partial name="_LoginPartial" />
            </div>
        </nav>
    </header>
    <div class="container">
        <main role="main" class="pb-3">
            @RenderBody()
        </main>
    </div>

    <footer class="border-top footer text-muted">
        <div class="container">
            &copy; 2020 - WebDev.Application - <a asp-area="" asp-controller="Home" asp-action="Privacy">Privacy</a>
        </div>
    </footer>
    <script src="~/lib/jquery/dist/jquery.min.js"></script>
    <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="~/js/site.js" asp-append-version="true"></script>
    <script src="https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js"></script>
    @RenderSection("Scripts", required: false)
</body>
</html>
```

Con esto controlamos el Acceso a la aplicación  a la opción de usuarios.

10. Ahora realizaremos los ajustes necesarios para el manejo de variables de sesión. para ello realice los siguientes pasos:

- Adicione el siguiente nuget. (recuerde que esta opción se ejecuta haciendo click derecho sobre el nodo de **Dependencies**)

![Security](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-06-Security/Security-04.png)

- Busque y adicione paquete de manejo de Sesiones (**Microsoft.AspNetCore.Session**)

- Adiciones los siguientes servicios en la función **ConfigureServices**

```csharp
services.AddDistributedMemoryCache();  
services.AddSession(options => {  
    options.IdleTimeout = TimeSpan.FromMinutes(1);//You can set Time   
});  
services.AddMvc();
```

- De igual forma active su configuracion en la función de **Configure** poniendo el siguiente comndo antes del **app.UseRouting();**

```csharp
app.UseCookiePolicy();
app.UseSession();
``` 

Esto le da como resultado lo siguiente:

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using WebDev.Application.Config;

namespace WebDev.Application
{
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
      services.AddControllersWithViews();
      services.Configure<ApiConfiguration>(Configuration.GetSection("ApiConfiguration"));

      // Enable Session Handler
      services.AddDistributedMemoryCache();
      services.AddSession(options =>
      {
        options.IdleTimeout = TimeSpan.FromMinutes(1);//You can set Time
      });
      services.AddMvc();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Home/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
      }
      app.UseHttpsRedirection();
      app.UseStaticFiles();

      // Configure Sessions
      app.UseCookiePolicy();
      app.UseSession();

      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllerRoute(
                  name: "default",
                  pattern: "{controller=Home}/{action=Index}/{id?}");
        // Users
        endpoints.MapControllerRoute(
          name: "Users",
          pattern: "{controller=Users}/{action=Index}/{id?}");
      });
    }
  }
}
```

Recuerde completar con los paquetes que hacen falta,esto lo puede hacer dando click derecho sobre las palabras en rojo y luego selecciones el tooltip de ayuda y escoja la opción indicada del ménu.


11. Ahora realice los siguientes cambios sobre el controlador y la vista parcial de login para ajustar el flujo.

- En en el **HomeController**

a. Adicione la referencia al siguiente nemaspace
```csharp
using Microsoft.AspNetCore.Http; 
```

b. Actualice la funcion que valida el usuario **IsValidUser**

```csharp
private async Task<bool> IsValidUser(string email, string password)
{
  if (email.Equals("demouser@email.com") && password.Equals("Password*01"))
  {
    HttpContext.Session.SetString("IsUserLogged", "true");
    HttpContext.Session.SetString("User", email);
    return true;
  }
  HttpContext.Session.SetString("IsUserLogged", "false");
  return false;
}

```

c. Actalice la accion de Index y logout del controlador asi:

```csharp
public IActionResult Index()
{
  ViewData["IsUserLogged"] = HttpContext.Session.GetString("IsUserLogged");
  ViewData["User"] = HttpContext.Session.GetString("User");
  return View();
}

public IActionResult Logout()
{
  HttpContext.Session.SetString("IsUserLogged", "false");
  return RedirectToAction(nameof(Index));
}
```


- En la vista parcial **_Login.cshtml** Adicione la siguiente condicion al Inicio de la Vista:

```csharp
  var isUserLogged = (ViewData["IsUserLogged"] != null) ? ViewData["IsUserLogged"].ToString() : "false";
  if (isUserLogged == "true")
  {
```

- Ahora ejecute y verifique el flujo.

