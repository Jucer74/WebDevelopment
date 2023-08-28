﻿using System.ComponentModel.DataAnnotations;

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
    public DateTime DateOfBirth { get; set; } = DateTime.Now;

    [Required(ErrorMessage = "The Sex is Required")]
    public char Sex { get; set; }
    
    public string Relations { get; set; } = null!;    
    
    [Required(ErrorMessage = "The Photo is required")]
    [StringLength(50)]
    // Include only ImageName.ext
    public string Photo { get; set; } = null!;    
}
