using System.ComponentModel.DataAnnotations;

namespace MovieRankMVC.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "The Email is required")]
        [EmailAddress(ErrorMessage = "The UserEmail must be a valid email address")]
        [StringLength(300)]
        public string UserEmail { get; set; } = null!;

        [Required(ErrorMessage = "The FirstName is required")]
        [StringLength(50)]
        public string FirstName { get; set; } = null!;

        [Required(ErrorMessage = "The LastName is required")]
        [StringLength(50)]
        public string LastName { get; set; } = null!;


        [Required(ErrorMessage = "Password is required.")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
        public string? Password { get; set; }
 

        [Compare("Password", ErrorMessage = "Please confirm your password")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; } = null!;

<<<<<<< HEAD
        public int SelectedProfileImage { get; set; } = 1;
    }
=======
    [Required(ErrorMessage = "The Password is required")]
    [StringLength(50)]
    public string Password { get; set; } = null!;
    
    [NotMapped]
    [Compare("Password")]
    [StringLength(50)]
    [PasswordPropertyText(true)]
    public string ConfirmPassword { get; set; } = null!;    
>>>>>>> main
}