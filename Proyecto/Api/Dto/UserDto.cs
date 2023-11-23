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
        public string Role { get; set; } = null!;


        public virtual ICollection<AgentDto> Agents { get; set; } = new List<AgentDto>();

    }
}
