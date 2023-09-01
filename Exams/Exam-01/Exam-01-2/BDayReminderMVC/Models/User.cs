using System.ComponentModel.DataAnnotations;

namespace BDayReminderMVC.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "The FirstName is Required")]
        [StringLength(50)]
        public string FirstName { get; set; } = null!;

        [Required(ErrorMessage = "The LastName is Required")]
        [StringLength(50)]
        public string LastName { get; set; } = null!;

        [Required(ErrorMessage = "The Email is Required")]
        [DataType(DataType.EmailAddress)]
        public string UserName { get; set; } = null!;

        [Required(ErrorMessage = "The Password is Required")]
        [StringLength(50)]
        public string Password { get; set; } = null!;

        [Required(ErrorMessage = "The ConfirmPassword is Required")]
        [Compare("Password", ErrorMessage = "The Confirm Password does not match.")]
        [StringLength(50)]
        public string ConfirmPassword { get; set; } = null!;
    }
}