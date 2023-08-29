using System.ComponentModel.DataAnnotations;

namespace SttudentsMVC.Models
{
    public class Student
    {
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }
        [Required(ErrorMessage = "El nombre es requerido ")]
        [Display(Name = "Nombre")]
        public string FirstName { get; set; } = null;
        [Required(ErrorMessage = "El apellido es requerido ")]
        [Display(Name = "apellido")]
        public string LastName { get; set; } = null;
        [Required(ErrorMessage = "la  fecha de nacimiento es requerido ")]
        [Display(Name = "fecha de nacimiento")]
        public DateTime DateOfBirth { get; set; }
        [Display(Name = "sexo")]

        public char Sex { get; set; }
        

    }

}
