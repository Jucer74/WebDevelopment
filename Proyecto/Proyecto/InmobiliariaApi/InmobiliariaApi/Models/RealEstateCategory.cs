using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InmobiliariaApi.Models;

public class RealEstateCategory
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "The URL of the image field is required.")]
    [MaxLength(250, ErrorMessage = "The image URL should not exceed 250 characters.")]
    public string URLImagen { get; set; } = null!;

    [Required(ErrorMessage = "The Description field is required.")]
    [MaxLength(50, ErrorMessage = "Description should not exceed 50 characters.")]
    public string Description { get; set; } = null!;

    [Required(ErrorMessage = "The Address field is required.")]
    [MaxLength(50, ErrorMessage = "Address should not exceed 50 characters.")]
    public string Address { get; set; } = null!;

    [Required(ErrorMessage = "The Location field is required.")]
    [MaxLength(50, ErrorMessage = "Location should not exceed 50 characters.")]
    public string Location { get; set; } = null!;

    [Required(ErrorMessage = "The Price field is required.")]
    public int Price { get; set; }

    [Required(ErrorMessage = "The Rooms field is required.")]
    public int Rooms { get; set; }

    [Required(ErrorMessage = "The Bathrooms field is required.")]
    public int Bathrooms { get; set; }

    [Required(ErrorMessage = "The Built Area field is required.")]
    public int BuiltArea { get; set; }

    [Required(ErrorMessage = "The Stratum field is required.")]
    public int Stratum { get; set; }

    [MaxLength(50, ErrorMessage = "The Contact field should not exceed 50 characters.")]
    public string Contact { get; set; } = null!;

    [ForeignKey("RealestateId")]
    public int RealestateId { get; set; }
    public RealEstate RealEstate { get; set; } = null!;
}
