using System.ComponentModel.DataAnnotations;

namespace StudentsMVC.Models;

public class Student
{
    [Key]
    public int Id { get; set; }
    [Required(ErrorMessage = "El nombre es requerido")]
    [StringLength(50)]
    [Display(Name = "Nombre")]
    public string FirstName { get; set; } = null!;
    [Required(ErrorMessage = "El apellido es requerido")]
    [StringLength(50)]
    [Display(Name = "Apellido")]
    public string LastName { get; set; } = null!;
    [Required(ErrorMessage = "La fecha de nacimiento es requerida")]
    [DataType(DataType.Date)]
    [Display(Name = "Fecha de Nacimiento")]
    public DateTime DateOfBirth { get; set; } = DateTime.Now;
    [Required(ErrorMessage = "El sexo es requerido")]
    [Display(Name = "Sexo")]
    public char Sex { get; set; } = 'M';

}
