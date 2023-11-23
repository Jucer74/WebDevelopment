using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class Agent
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string AgentEmail { get; set; } = null!;
        [Required]
        public string AgentName { get; set; } = null!;
        [Required]
        public string AgentLasName { get; set; } = null!;

        public virtual ICollection<User> Users { get; set; } = new List<User>();
    }
}
