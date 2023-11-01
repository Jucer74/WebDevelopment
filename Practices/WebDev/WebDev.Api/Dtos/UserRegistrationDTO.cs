using System.ComponentModel.DataAnnotations;
namespace WebDev.Api.Dtos
{
    public class UserRegistrationDTO
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }
    }
}
