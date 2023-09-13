using System.ComponentModel.DataAnnotations;

namespace StudentsMVC.Models;

public class Student
{
    [Key]
    [Display(Name = "Id")]
    public int Id { get; set; }

    [Required(ErrorMessage = "El nombre es requerido")]
    [Display(Name = "Nombre")] //le asigna un nombre diferentea al de
                               //la variable de la clase
                               //fisrtname cambia a Nombre en el display
    public string FirstName { get; set; } = null!;

    [Required(ErrorMessage = "El apellido es requerido")]
    [Display(Name = "Apellido")]
    public string LastName { get; set; } = null!;

    [Required(ErrorMessage = "El cumpleaños es requerido")]
    [Display(Name = "Cumpleaños")]
    public DateTime DateOfBirth { get; set; }

    [Required(ErrorMessage = "El sexo es requerido")]
    [Display(Name = "Sexo")]
    public char Sex { get; set; } = 'M';
    

    
}
