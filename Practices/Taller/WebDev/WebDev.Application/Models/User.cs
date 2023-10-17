using System.ComponentModel.DataAnnotations;

namespace WebDev.Application.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "El Email es obligatorio")]
        public string Email { get; set; } = null!;
        [Required(ErrorMessage = "El Nombre es obligatorio")]
        public string Name { get; set; } = null!;
        [Required(ErrorMessage = "El Nombre de usuario es obligatorio")]
        public string Username { get; set; } = null!;
        [Required(ErrorMessage = "La contraseña es obligatoria")]
        public string Password { get; set; } = null!;
    }
}
