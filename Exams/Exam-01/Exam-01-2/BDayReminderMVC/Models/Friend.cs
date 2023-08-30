using System.ComponentModel.DataAnnotations;

namespace BDayReminderMVC.Models;

public class Friend
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage ="The FirstName is Required")]
    [StringLength(50)]
    [Display(Name = "First Name" )]
    public string FirstName { get; set; } = null!;

    [Required(ErrorMessage = "The LastName is Required")]
    [StringLength(50)]
    [Display(Name = "Last Name")]
    public string LastName { get; set; } = null!;

    [Required(ErrorMessage = "The DateOfBirth is Required")]
    [DataType(DataType.Date)]
    [Display(Name = "Date Of Birth")]
    public DateTime DateOfBirth { get; set; }

    [Required(ErrorMessage = "The Sex is Required")]
    [StringLength(1)]
    [Display(Name = "Gender")]
    public char Gender { get; set; } = 'M';

    [Display(Name = "Relations")]
    public List<string> Relations { get; set; } = null!;    
    
    [Required(ErrorMessage = "The Photo is required")]
    [StringLength(50)]
    [Display(Name = "Photo")]
    // Include only ImageName.ext
    public string Photo { get; set; } = null!;    
}
