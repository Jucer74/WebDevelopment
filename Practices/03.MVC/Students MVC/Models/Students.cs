using System.ComponentModel.DataAnnotations;

namespace Students_MVC.Models;

public class Students
{
    [Key]

    public int id { get; set; }
    [Required(ErrorMessage = "el nombre es requerido")]
    [StringLength(50)]
    [Display(Name = "Nombre")]
    public string FirstName { get; set; } = null!;
    [Required(ErrorMessage = "el apellido es requerido")]
    [StringLength(50)]
    [Display(Name = "Apellido")]
    public string LastName { get; set; } = null!;
    [Required(ErrorMessage = "la fecha de nacimiento es requerida")]
    [Display(Name = "Fecha de Nacimiento")]
    public DateTime DateOfBirth { get; set; } = DateTime.Now;
    [Required(ErrorMessage = "el Sexo es requerido")]
    public char sex { get; set; } = 'M';
}
