using System.ComponentModel.DataAnnotations;

namespace WebDev.Api.Model
{
    public class Libro
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Titulo { get; set; }

        [Required]
        public string Autor { get; set; }

        [Required]
        public double Precio { get; set; }

        [Required]
        public int Cantidad{ get; set; }

        [Required]
        public string Imagen { get; set; }


    }
}
