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

      [Required(ErrorMessage = "The FirstName is required")]
      public string? FirstName { get; set; }

      [Required(ErrorMessage = "The LastBame is Required")]
      public string? LastName { get; set; }

      [Required(ErrorMessage = "The HireDate is Required")]
      public DateTime HireDate { get; set; }

      [Required(ErrorMessage = "The Department is Required")]
      public DepartmentType Department { get; set; }
   }
}