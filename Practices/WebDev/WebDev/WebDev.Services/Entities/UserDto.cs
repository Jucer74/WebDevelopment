using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebDev.Services.Entities
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;

        private UserDto()
        {

        }

        public static UserDto Build(int id, string email, string name, string username, string password)
        {
            return new UserDto
            {
                Id = id,
                Email = email,
                Name = name,
                Username = username,
                Password = password
            };
        }
    }
}
