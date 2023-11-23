using Api.Models;
using System.Text.Json.Serialization;

namespace Api.Dto
{
    public class AgentDto
    {

        public int Id { get; set; }
        public string AgentEmail { get; set; } = null!;
        public string AgentName { get; set; } = null!;
        public string AgentLasName { get; set; } = null!;

        [JsonIgnore]
        public virtual ICollection<User> Users { get; set; } = new List<User>();

    }
}
