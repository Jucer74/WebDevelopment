using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class Libro
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = null!;

        public virtual ICollection<User> Users { get; set; } = new List<User>();
    }
}
