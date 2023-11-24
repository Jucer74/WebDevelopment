using Api.Models;

namespace Api.Dto
{
    public class UserDto
    {

        public int Id { get; set; }
        public string UserEmail { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Password { get; set; } = null!;


        public virtual ICollection<LibroDto> Libros { get; set; } = new List<LibroDto>();

    }
}
