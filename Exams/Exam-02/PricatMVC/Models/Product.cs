using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace PricatMVC.Models
{
    public class Product
    {
        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        [Required(ErrorMessage = "La Descripción es requerida")]
        [StringLength(50, ErrorMessage = "La Longitud maxima de la Descripción es de 50 caracteres")]
        [DisplayName("Descripción")]
        public string Description { get; set; } = null!;

        [Required(ErrorMessage = "El EanCode es requerido")]
        [StringLength(50, ErrorMessage = "La Longitud maxima del EanCode es de 50 caracteres")]
        [DisplayName("EanCode")]
        public string EanCode { get; set; } = null!;

        [Required(ErrorMessage = "El Id es requerido")]
        [DisplayName("Id")]
        public int Id { get; set; } = 0;

        [Required(ErrorMessage = "El Precio es requerido")]
        [DisplayName("Precio")]
        public double Price { get; set; } = 0;

        [Required(ErrorMessage = "La Unidad es requerida")]
        [StringLength(10, ErrorMessage = "La Longitud maxima de la Unidad es de 10 caracteres")]
        [DisplayName("Unidad")]
        public string Unit { get; set; } = null!;


    }
}
