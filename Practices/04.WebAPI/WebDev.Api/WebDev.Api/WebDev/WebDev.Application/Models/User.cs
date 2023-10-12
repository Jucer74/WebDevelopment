using System.ComponentModel.DataAnnotations;

namespace WebDev.Application.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "El email es obligatorio")]
        public string Email { get; set; } = string.Empty;   
        [Required(ErrorMessage = "El nombre es obligatorio")]
        public string Name { get; set; } = string.Empty;
        [Required(ErrorMessage = "El nombre de usuario es obligatorio")]
        public string Username { get; set; } = string.Empty;
        [Required(ErrorMessage = "El password es obligatorio")]
        public string Password { get; set; } = string.Empty;   
 }
}