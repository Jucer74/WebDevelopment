using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace PricatMVC.Models
{
    public class Category
    {
        [Required(ErrorMessage = "La descripción es requerida")]
        [StringLength(50, ErrorMessage = "La Longitud maxima de la Descripción es de 50 caracteres")]
        [DisplayName("Descripción")]
        public string Description { get; set; } = null!;

        [Required(ErrorMessage = "El Id es requerido")]
        [DisplayName("Id")]
        public int Id { get; set; } = 0;
    }
}