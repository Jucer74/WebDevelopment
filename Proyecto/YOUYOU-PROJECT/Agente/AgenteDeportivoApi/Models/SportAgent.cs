using AgentesDeportivos.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AgenteDeportivoApi.Models;

public class SportAgent
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "El campo Deporte es requerido.")]
    [MaxLength(50, ErrorMessage = "El tipo de Deporte no debe exceder los 50 caracteres.")]
    public string Deporte { get; set; } = null!;

    public virtual List<TipoAgenteDeportivo> Categories { get; set; } = null!;
}
