using System.ComponentModel.DataAnnotations;

namespace StudentsMVC.Models
{
    public class Student
    {
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }
        [Required(ErrorMessage = "El nombre es requerido")]
        [Display(Name = "Nombre")]
        public string FirstName { get; set; } = null!;

        [Required (ErrorMessage ="El apellido es requerido")]
        public string LastName { get; set; } = null!;
        [Required (ErrorMessage ="La fecha de nacimiento es requerida")]
        public DateTime DateOfBirth { get; set; }
        [Required (ErrorMessage ="El sexo es requerido")]
        public char Sex { get; set; } = 'M';

    }
}
