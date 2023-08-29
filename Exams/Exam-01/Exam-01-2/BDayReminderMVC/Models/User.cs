using System.ComponentModel.DataAnnotations;

namespace BDayReminderMVC.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "The FirstName is Required")]
        [StringLength(50)]
        public string firstName { get; set; }

        [Required(ErrorMessage = "The LastName is Required")]
        [StringLength(50)]
        public string lastName { get; set; }

        [Required(ErrorMessage = "The Email is Required")]
        [DataType(DataType.EmailAddress)]
        public string user { get; set; }

        [Required(ErrorMessage = "The Password is Required")]
        [StringLength(50)]
        public string Password { get; set; }


    }
}
