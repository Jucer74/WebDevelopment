using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Api.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string UserEmail { get; set; } = null!;
        [Required]
        public string FirstName { get; set; } = null!;
        [Required]
        public string LastName { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
        [Required]
        public string Role { get; set; } = null!;

        [JsonIgnore]
        public virtual ICollection<Agent> Agents { get; set; } = new List<Agent>();
        
    }
}
