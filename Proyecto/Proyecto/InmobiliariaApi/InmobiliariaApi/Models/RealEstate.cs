using System.ComponentModel.DataAnnotations;

namespace InmobiliariaApi.Models;

public class RealEstate
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "The Property Type field is required.")]
    [MaxLength(50, ErrorMessage = "Property Type should not exceed 50 characters.")]
    public string PropertyType { get; set; } = null!;

    public virtual List<RealEstateCategory> Category { get; set; } = null!;
}
