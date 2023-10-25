using System.ComponentModel.DataAnnotations;

namespace FrontendBmxAspMVC.Models;

public class User
{
    [Key] public int Id { get; set; }

    [Required(ErrorMessage = "Username is required")]
    public string? Username { get; set; }

    [Required(ErrorMessage = "Email is required")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "Password is required")]
    [MinLength(16), MaxLength(32), DataType(DataType.Password)]
    public string? Password { get; set; }
}