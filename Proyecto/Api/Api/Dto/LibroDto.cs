using Api.Models;

namespace Api.Dto
{
    public class LibroDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<User> Users { get; set; } = new List<User>();
    }
}
