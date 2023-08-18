using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace StudentsMVC.Models;

public class Student
{

    [Key]
    public int Id{ get; set; }


    [Required(ErrorMessage = "El nombre es requerido")]
    [StringLength(50)]
    [Display(Name = "Nombre")]
    public string FirstName { get; set; } = null!;


    [Required(ErrorMessage = "El apellido es requerido")]
    [StringLength(50)]
    [Display(Name = "Apellido")]
    public string LastName{ get; set; } = null!;

   
    [DataType(DataType.Date)]
    [Display(Name = "Fecha de nacimiento")]
    public DateTime DateOfBirth{ get; set; } = DateTime.Now;


    [Required(ErrorMessage = "El campo Sexo es requerida")]
    [Display(Name = "Sexo")]
    public char Sex { get; set; } = 'M';
}
