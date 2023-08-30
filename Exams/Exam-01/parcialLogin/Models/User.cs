using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace MovieRank.Models;

public class User : IdentityUser
{
    [Key] public new int Id { get; set; }

    [Required(ErrorMessage = "UserEmail is required.")]
    [EmailAddress(ErrorMessage = "UserEmail has to be a valid address.")]
    [StringLength(50)]
    public string UserEmail { get; set; } = null!;

    [Required(ErrorMessage = "FirstName cannot be empty.")]
    [StringLength(50)]
    public string FirstName { get; set; } = null!;

    [Required(ErrorMessage = "LastName cannot be empty.")]
    [StringLength(50)]
    public string LastName { get; set; } = null!;

    [Required(ErrorMessage = "Password is absolutely required.")]
    [StringLength(50)]
    public string Password { get; set; } = null!;
}