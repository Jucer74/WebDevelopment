using System.ComponentModel.DataAnnotations;

namespace BDayReminderMVC.Models;

public class Persona
{
    [Key]


    public int Id { get; set; }


    [Required(ErrorMessage = "The FirstName is Required")]
    [StringLength(50)]
    [Display(Name = "Nombre")]
    public string FirstName { get; set; } = null!;

    [Required(ErrorMessage = "The LastName is Required")]
    [StringLength(50)]
    [Display(Name = "Apellido")]
    public string LastName { get; set; } = null!;

    [Required(ErrorMessage = "The DateOfBirth is Required")]
    [DataType(DataType.Date)]
    [Display(Name = "Fecha de nacimiento")]
    public DateTime DateOfBirth { get; set; } = DateTime.Now;

    [Required(ErrorMessage = "The Sex is Required")]
    [StringLength(1)]
    [Display(Name = "Sexo")]
    public char Sex { get; set; } = 'M';
}
