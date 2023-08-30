using System.ComponentModel.DataAnnotations;

namespace MovieRank.Models;

public class LoginViewModel
{
   [Required(ErrorMessage = "The user email is required.")]
   [EmailAddress(ErrorMessage = "The email has to be valid.")]
   [DataType(DataType.EmailAddress)]
   [StringLength(80)]
   public string UserEmail { get; set; } = null!;

   [Required(ErrorMessage = "Password is absolutely required.")]
   [DataType(DataType.Password)]
   [StringLength(50)]
   public string Password { get; set; } = null!;
}