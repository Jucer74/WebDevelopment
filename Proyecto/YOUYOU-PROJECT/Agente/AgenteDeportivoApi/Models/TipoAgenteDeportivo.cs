using AgenteDeportivoApi.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgentesDeportivos.Models
{
    public class TipoAgenteDeportivo
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "El campo first_name es requerido.")]
        [MaxLength(50, ErrorMessage = "El nombre no debe exceder los 50 caracteres.")]
        public string first_name { get; set; } = null!;

        [Required(ErrorMessage = "El campo last_name es requerido.")]
        [MaxLength(50, ErrorMessage = "El apellido no debe exceder los 50 caracteres.")]
        public string last_name { get; set; } = null!;

        [Required(ErrorMessage = "El campo email es requerido.")]
        [MaxLength(50, ErrorMessage = "El correo electrónico no debe exceder los 50 caracteres.")]
        public string email { get; set; } = null!;

        [Required(ErrorMessage = "El campo gender es requerido.")]
        [RegularExpression("M|F", ErrorMessage = "El género debe ser 'M' o 'F'.")]
        public string gender { get; set; } = null!;

        [Required(ErrorMessage = "El campo Phone es requerido.")]
        [MaxLength(50, ErrorMessage = "El número de teléfono no debe exceder los 50 caracteres.")]
        public string Phone { get; set; } = null!;

        [Required(ErrorMessage = "El campo Agent es requerido.")]
        [MaxLength(50, ErrorMessage = "El nombre del agente no debe exceder los 50 caracteres.")]
        public string Agent { get; set; } = null!;

        [Required(ErrorMessage = "El campo Country es requerido.")]
        [MaxLength(50, ErrorMessage = "El país no debe exceder los 50 caracteres.")]
        public string Country { get; set; } = null!;
        
        [ForeignKey("Agente_Deportivo_Id")]
        public int Agente_Deportivo_Id { get; set; }
        public SportAgent Agente_Deportivo_ { get; set; } = null!;
    }


}