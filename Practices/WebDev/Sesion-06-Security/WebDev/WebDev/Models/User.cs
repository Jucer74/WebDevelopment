using System.ComponentModel.DataAnnotations;

namespace WebDev.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "El email es obligatorio")]
        public required string Email { get; set; }
        [Required(ErrorMessage = "El nombre es obligatorio")]
        public required string Name { get; set; }
        [Required(ErrorMessage = "El nombre de usuario es obligatorio")]
        public required string Username { get; set; }
        [Required(ErrorMessage = "El password es obligatorio")]
        public required string Password { get; set; }
    }
}