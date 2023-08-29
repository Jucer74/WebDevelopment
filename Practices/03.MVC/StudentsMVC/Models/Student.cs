using System.ComponentModel.DataAnnotations;
<<<<<<< HEAD
=======
using System.Timers;
>>>>>>> origin/2023-02-1/julbarcif

namespace StudentsMVC.Models
{
    public class Student
    {
        [Key]
<<<<<<< HEAD
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
=======

        [Display(Name ="id")]
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es requerido")]

        [Display(Name = "Nombre")]
        public string FirstName { get; set; } = null!;

        [Required(ErrorMessage = "El apellido es requerido")]
        public string LastName { get; set; } = null!;

        [Required(ErrorMessage = "La fecha de nacimiento es requerido")]

        public DateTime DateOfBirth { get; set; }

        [Required(ErrorMessage = "El Sexo es requerido")]
        
>>>>>>> origin/2023-02-1/julbarcif
        public char Sex { get; set; } = 'M';

    }
}
