using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace PricatMVC.Models
{
    public class Product
    {
        [Required(ErrorMessage = "El Id es requerido")]
        [DisplayName("Id")]
        public int CategoryId { get; set; } = 0;

        [Required(ErrorMessage = "La descripción es requerida")]
        [StringLength(50, ErrorMessage = "La Longitud maxima de la descripción es de 50 caracteres")]
        [DisplayName("Descripción")]
        public string Description { get; set; } = null!;

        [Required(ErrorMessage = "El Id es requerido")]
        [DisplayName("Id")]
        public int Id { get; set; } = 1;

        [Required(ErrorMessage = "El EanCode es requerido")]
        [DisplayName("EanCode")]
        public int EanCode { get; set; } = 0;

        [Required(ErrorMessage = "La unidad es requerida")]
        [DisplayName("Unit")]
        public string Unit { get; set; } = null!;
    }
}
