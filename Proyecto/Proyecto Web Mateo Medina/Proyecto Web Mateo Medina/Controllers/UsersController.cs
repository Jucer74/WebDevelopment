using Microsoft.AspNetCore.Mvc;
using Proyecto_Web_Mateo_Medina.Models;




public class UsersController : Controller
{
    // Vista de la página principal (Index)
    public ActionResult Index()
    {
        return View(); // Vista Index.cshtml
    }

    // Acción para iniciar sesión
    [HttpPost]
    public ActionResult Login(string userEmail, string password)
    {
        // Lógica de autenticación - aquí se debe implementar la lógica de verificación de credenciales
        if (userEmail == "correo@ejemplo.com" && password == "contraseña") // Comprobación de credenciales (ejemplo simplificado)
        {
            // Si las credenciales son válidas, se redirige al LandingPage (por ejemplo)
            return RedirectToAction("LandingPage");
        }

        // Si las credenciales son inválidas, se muestra el mensaje de error y se vuelve a la página principal (Index)
        ViewBag.Error = "Credenciales inválidas. Por favor, intenta de nuevo.";
        return View("Index");
    }

    // Acción para la página de aterrizaje (LandingPage)
    public ActionResult LandingPage()
    {
        return View(); // Vista LandingPage.cshtml
    }

    // Acción para el registro de usuarios
    [HttpPost]
    public ActionResult Registro(string userEmail, string firstName, string lastName, string password)
    {
        // Lógica de registro de usuarios - aquí se debe implementar la lógica para almacenar los datos del nuevo usuario
        // En este ejemplo, simplemente redirigimos al Index después del registro exitoso
        ViewBag.Success = "¡Registro exitoso! Por favor, inicia sesión.";
        return View("Index");
    }
}

