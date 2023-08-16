using System.ComponentModel.DataAnnotations;

namespace StudentsMVC.Models;

public class Student
{
    [Key]
    [Display(Name = "Id")]
    public int Id { get; set; }

    [Required(ErrorMessage = "El Nombre es requqerido")]
    [Display(Name = "Nombre")]
    public string FirstName { get; set; } = null!;

    [Required(ErrorMessage = "El Apellido es requqerido")]
    public string LastName { get; set; } = null!;

    [Required(ErrorMessage = "La fecha de Nacimiento es requqerid")]
    public DateTime DateOfBirth { get; set; }

    [Required(ErrorMessage = "Sexo requqerido")]
    public char Sex { get; set; }= 'M';
    



}
