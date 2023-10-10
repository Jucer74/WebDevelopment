using System.ComponentModel.DataAnnotations;

namespace EmployeesWeb.Application.Models
{
   public enum DepartmentType
   {
      IT,
      Audit,
      Finance
   }

   public class Employee
   {
      [Key]
      public int Id { get; set; }

      [Required(ErrorMessage = "El Nombre es requirido")]
      [Display(Name = "Nombre")]
      public string? FirstName { get; set; }

      [Required(ErrorMessage = "El Apellido es requirido")]
      [Display(Name = "Apellido")]
      public string? LastName { get; set; }

      [Required(ErrorMessage = "La Fecha de Contratacion es requirida")]
      [Display(Name = "Fecha Contratacion")]
      public DateTime HireDate { get; set; }

      [Required(ErrorMessage = "El Departamento es requirido")]
      [Display(Name = "Departamento")]
      public DepartmentType Department { get; set; }
   }
}