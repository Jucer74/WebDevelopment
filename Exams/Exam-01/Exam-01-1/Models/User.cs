using System.ComponentModel.DataAnnotations;

namespace MovieRankMVC.Models;

public class User
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "The UserEmail is required")]
    [EmailAddress(ErrorMessage = "The UserEmail must be a valid email address")]
    [StringLength(300)]
    public string UserEmail { get; set; } = null!;

    [Required(ErrorMessage = "The FirstName is required")]
    [StringLength(50)]
    public string FirstName { get; set; } = null!;

    [Required(ErrorMessage = "The LastName is required")]
    [StringLength(50)]
    public string LastName { get; set; } = null!;

    [Required(ErrorMessage = "The Password is required")]
    [StringLength(50)]
    public string Password { get; set; } = null!;
<<<<<<< HEAD:Exams/Exam-01/Exam-01-1/Models/User.cs

    [Required(ErrorMessage = "The Confirm Password is required")]
    [StringLength(50)]
    public string ConfirmPassword { get; set; } = null!;
=======
    
    [NotMapped]
    [Compare("Password")]
    [StringLength(50)]
    [PasswordPropertyText(true)]
    public string ConfirmPassword { get; set; } = null!;    
>>>>>>> main:Exams/Exam-01/Exam-01-1/MovieRankMVC/Models/User.cs
}