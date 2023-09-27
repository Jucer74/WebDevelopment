using System.ComponentModel.DataAnnotations;

namespace mvcTest.Models
{
    public class Student
    {
        [Key]

        [Required]
        [Display(Name = "Id")]
        public int StudentId { get; set; }

        [Required(ErrorMessage = "FirtName is Required")]
        [StringLength(100)]
        [Display(Name = "FirtName")]
        public string StudentFirstName { get; set; } = null!;


        [Required(ErrorMessage = "LastName is Required")]
        [StringLength(100)]
        [Display(Name = "LastName")]
        public string StudentLastName { get; set; } = null!;

        [Required]
        [Display(Name = "Sex")]
        public char StudentSex { get; set; }

        [Required]
        [Display(Name = "Date")]
        public DateTime StudentDateOfBirth { get; set;}


    }
}
