using System.ComponentModel.DataAnnotations;

namespace StudentsMVC.Models;

public class Student
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "El Nombre es Requerido")]
    [StringLength(50)]
    [Display(Name = "nombre")]
    public string FirstName { get; set; } = null!;

    [Required(ErrorMessage ="El Apellido es Requerido")]
    [StringLength(50)]
    [Display(Name ="Apellido")]
    public string LastName { get; set; } = null !;

    [Required(ErrorMessage = "LA fecha de nacimiento es Requerido")]
    [DataType(DataType.Date)]
    [Display(Name = "Fecha de nacimiento")]
    public DateTime DateOfBirth { get; set; } = DateTime.Now;

    [Required(ErrorMessage = "el sexo es Requerido")]
    [Display(Name ="Sexo")]
    public char Sex { get; set; } = 'M';
}
