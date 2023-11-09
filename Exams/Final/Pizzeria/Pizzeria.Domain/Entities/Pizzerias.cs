using Pizzeria.Domain.Common;
using System.ComponentModel.DataAnnotations;

namespace Pizzeria.Domain.Entities;

public class Pizzerias : EntityBase
{

    [Required(ErrorMessage = "El Nombre es requerido.")]
    [MaxLength(50, ErrorMessage = "Nombre no puede superar los 50 caracteres.")]
    public string Nombre { get; set; } = null!;

    [Required(ErrorMessage = "El Tamaño es requerido.")]
    public string Tamaño { get; set; } = null!;

    [Required(ErrorMessage = "El Precio es requerido.")]
    public int Precio { get; set; }

    

}
