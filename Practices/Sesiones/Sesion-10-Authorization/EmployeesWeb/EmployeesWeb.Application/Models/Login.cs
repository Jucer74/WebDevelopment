using System.ComponentModel.DataAnnotations;

namespace EmployeesWeb.Application.Models
{
   public class Login
   {
      [Required(ErrorMessage = "El Email es Requerido")]
      [EmailAddress]
      public string? Email { get; set; }

      [Required(ErrorMessage = "El Password es Requerido")]
      [DataType(DataType.Password)]
      public string? Password { get; set; }
   }
}
