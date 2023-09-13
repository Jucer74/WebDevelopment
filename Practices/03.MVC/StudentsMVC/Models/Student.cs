using System.ComponentModel.DataAnnotations;
<<<<<<< HEAD
using System.Timers;

namespace StudentsMVC.Models
{
    public class Student
    {
        [Key]

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
        
        public char Sex { get; set; } = 'M';

    }
}
=======

namespace StudentsMVC.Models;

public class Student
{
    [Key]
    [Display(Name = "Id")]
    public int Id { get; set; }

    [Required(ErrorMessage = "El Nombre es requerido")]
    [Display(Name = "Nombre")]
    public string FirstName { get; set; } = null!;

    [Required(ErrorMessage = "El apellido es requerido")]
    [Display(Name = "Apellido")] 
    public string LastName { get; set; } = null!;

    [Required(ErrorMessage = "La fecha de Naciemitno es requerida")]
    [Display(Name = "Fecha de Nacimiento")]
    public DateTime DateOfBirth { get; set; }

    [Required(ErrorMessage = "El Sexo es requerido")]
    [Display(Name = "Sexo")]
    public char Sex { get; set; } = 'M';
}
>>>>>>> origin/2023-02-1/julroburi
