using System.ComponentModel.DataAnnotations;

namespace StudentMVC.Models;

public class Students
{
    [Key]
    public int Id { get; set; }
    [Required(ErrorMessage = "El Nombre es requerido")]
    [StringLength(50)]
    [Display(Name = "Nombre")]
    public string Firstname { get; set; }
    [Required(ErrorMessage = "El Apellido es requerido")]
    [StringLength(50)]
    [Display(Name = "Apellido")]
    public string LastName { get; set; }
    [Required(ErrorMessage = "La fecha de nacimiento es requerido")]
    [DataType(DataType.Date)]
    [Display(Name = "Fecha de Nacimiento")]
    public DateTime DateOfBirth { get; set; }
    [Required(ErrorMessage = "El campo sexo es requerido")]
    public char Sex { get; set; }
}