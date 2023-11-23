using BancaUSBApi.Models;
using System.Text.Json.Serialization;

namespace BancaUSBApi.Dto
{
    public class ProductDto
    {

        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public virtual ICollection<UserDto> Users { get; set; } = new List<UserDto>();


    }
}
