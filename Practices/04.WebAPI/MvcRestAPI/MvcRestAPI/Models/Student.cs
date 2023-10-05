using System.ComponentModel.DataAnnotations;

namespace MvcRestAPI.Models
{
    public class Student
    {
        [Key]
        [Required]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Required(ErrorMessage = "FirtName is Required")]
        [StringLength(100)]
        [Display(Name = "FirtName")]
        public string FirstName { get; set; } = null!;


        [Required(ErrorMessage = "LastName is Required")]
        [StringLength(100)]
        [Display(Name = "LastName")]
        public string LastName { get; set; } = null!;


        [Required(ErrorMessage = "Email is Required")]
        [StringLength(100)]
        [EmailAddress(ErrorMessage = "The UserEmail must be a valid email address")]
        [Display(Name = "Email")]
        public string Email { get; set; } = null!;

        [Required]
        [Display(Name = "Sex")]
        public char Sex { get; set; }

        [Required]
        [Display(Name = "Date")]
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime DateOfBirth { get; set; }

    }
}
