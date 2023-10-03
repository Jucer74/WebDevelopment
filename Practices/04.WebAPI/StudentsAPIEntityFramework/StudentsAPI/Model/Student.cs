using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StudentsAPI.Model;

public partial class Student
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage ="El nombre es requerido")]
    [StringLength(50,ErrorMessage = "La longitud maxima del nombre son 50 caracteres")]
    public string FirstName { get; set; } = null!;

    [Required(ErrorMessage = "El apellido es requerido")]
    [StringLength(50, ErrorMessage = "La longitud maxima del apellido son 50 caracteres")]
    public string? LastName { get; set; }

    public DateTime DateOfBirth { get; set; }

    [Required(ErrorMessage = "El sexo es requerido")]
    [RegularExpression("[MF]", ErrorMessage ="Los valores permitidos son M o F")]
    public string Sex { get; set; } = null!;
}
