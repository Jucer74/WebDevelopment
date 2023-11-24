using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebDev.Services.Entities
{
    public class LibroDto
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Autor { get; set; }
        public double Precio { get; set; }
        public int Cantidad { get; set; }
        public string Imagen { get; set; }

        private LibroDto()
        {

        }

        public static LibroDto Build(int id, string titulo, string autor, double precio, int cantidad, string imagen)
        {
            return new LibroDto
            {
                Id = id,
                Titulo = titulo,
                Autor = autor,
                Precio = precio,
                Cantidad = cantidad,
                Imagen = imagen
            };
        }
    }

}
