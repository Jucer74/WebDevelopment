using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using SchoolMVC.Config;

namespace SchoolMVC.Models;

public class Student
{
    [Required(ErrorMessage ="El Id es requerido")]
    [DisplayName("Id")]
    public int Id { get; set; } = 0;
    
    [Required(ErrorMessage ="El Nombre es requerido")]
    [StringLength(50,ErrorMessage="La Longitud maxima del Nombre es de 50 caracteres")]
    [DisplayName("Nombre")]
    public string FirstName { get; set; } = null!;

    [Required(ErrorMessage = "El Apellido es requerido")]
    [StringLength(50, ErrorMessage = "La Longitud maxima del Apellido es de 50 caracteres")]
    [DisplayName("Apellido")]
    public string LastName { get; set; } = null!;

    [Required(ErrorMessage = "La fecha de Nacimiento es requerida")]
    [DataType(DataType.Date)]
    [DisplayName("Fecha de Nacimiento")]
    [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
    public DateTime DateOfBirth { get; set; } = default!;

    [Required(ErrorMessage = "El Sexo es requerido")]
    [RegularExpression("^[MF]$", ErrorMessage ="Los Valores permitidos para Sex son M o F")]
    [DisplayName("Sexo")]
    public char Sex { get; set; } = 'M';
}