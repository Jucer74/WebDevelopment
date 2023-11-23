using BancaUSBApi.Models;
using System.Text.Json.Serialization;

namespace BancaUSBApi.Dto
{
    public class UserDto
    {
        public int Id { get; set; }

        public string UserEmail { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Role { get; set; } = null!;

        public virtual ICollection<ProductDto> Products { get; set; } = new List<ProductDto>();
    }
}
