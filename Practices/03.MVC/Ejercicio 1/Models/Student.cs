using System.ComponentModel.DataAnnotations;

namespace Ejercicio_1.Models
{
    public class Student
    {


        [Key]
        [Display (Name ="Id")]
        public int Id { get; set; }
        [Required(ErrorMessage = "El nombre es requerido")]
        [Display(Name = "Nombre")]
        public string FirstName { get; set; } = null!;
        [Required(ErrorMessage = "El Apellido es requerido")]
        public string LastName { get; set; } = null!;
        [Required(ErrorMessage = "El Fecha de nacimiento es requerida")]
        public DateTime DateOfBirth { get; set; }
        [Required(ErrorMessage = "El sexo es requerido")]
        public char Sex { get; set; } = 'M';  


    }
}
