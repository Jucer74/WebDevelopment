using System.ComponentModel.DataAnnotations;
namespace WebDev.Api.Model
{
    public class Receta
    {
        [Key]
        public int id { get; set; }

        [Required]
        public string nombre_receta { get; set; } = null!;

        [Required]
        public string tipo_cocina { get; set; } = null!;

        [Required]
        public string dificultad { get; set; } = null!;

        [Required]
        public string tiempo_coccion { get; set; } = null!;

        [Required]
        public string tiempo_preparacion { get; set; } = null!;

        [Required]
        public string imagen { get; set; } = null!;



    }
}
