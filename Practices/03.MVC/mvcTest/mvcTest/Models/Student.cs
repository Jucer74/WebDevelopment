using System.ComponentModel.DataAnnotations;

namespace mvcTest.Models
{
    public class Student
    {
        [Key]

        [Required]
        public int StudentId { get; set; }

        [Required(ErrorMessage = "Name is Required")]
        [StringLength(100)]
        [Display(Name = "Name")]
        public string StudentName { get; set; } = null!;

        [Required]
        [Display(Name = "Age")]
        public int StudentAge { get; set; }

        [Required]
        [Display(Name = "Gender")]
        public char StudentGender { get; set; }

        [Required]
        [StringLength(100)]
        [EmailAddressAttribute]
        [Display(Name = "Email")]
        public string StudentEmail { get; set; } = null!;
        

    }
}
