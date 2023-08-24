using System.ComponentModel.DataAnnotations;

namespace BDayReminderMVC.Models;

public class Friend
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage ="The FirstName is Required")]
    [StringLength(50)]
    public string FirstName { get; set; } = null!;

    [Required(ErrorMessage = "The LastName is Required")]
    [StringLength(50)]
    public string LastName { get; set; } = null!;

    [Required(ErrorMessage = "The DateOfBirth is Required")]
    [DataType(DataType.Date)]
    public DateTime DateOfBirth { get; set; }

    [Required(ErrorMessage = "The Sex is Required")]
    [StringLength(1)]
    public char Sex { get; set; } = 'M';
}
