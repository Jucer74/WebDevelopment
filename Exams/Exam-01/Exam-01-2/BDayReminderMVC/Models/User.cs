using System.ComponentModel.DataAnnotations;

namespace BDayReminderMVC.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "The FirstName is required")]
        [StringLength(50)]
        public string FirstName { get; set; } = null;
        [Required(ErrorMessage = "The LastName is required")]
        [StringLength(50)]
        public string LastName { get; set; } = null;
        [Required(ErrorMessage = "The User is required")]
        [EmailAddress(ErrorMessage = "The User must be a valid email address")]
        [StringLength(50)]
        public string UserMail { get; set; } = null;
        [Required(ErrorMessage = "The Password is required")]
        [DataType(DataType.Password)]
        [StringLength(50)]
        public string Password { get; set; } = null;
        [Compare("Password", ErrorMessage = "Please confirm your password")]
        [DataType(DataType.Password)]
        public string PasswordConfirm { get; set; } = null;
    }
}
