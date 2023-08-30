using MovieRank.Models;

namespace MovieRank.Services
{
    public class UserService
    {
        private static List<User> _users = LoadUsers();

        private static List<User> LoadUsers()
        {
            // Create a list of users
            List<User> users = new List<User>();

            // Add users to the list
            users.Add(new User
            {
                Id = 1, UserEmail = "jonhdoe@gmail.com", FirstName = "Perro", LastName = "Doe", Password = "password"
            });
            users.Add(new User
            {
                Id = 2, UserEmail = "jonhdoe2@gmail.com", FirstName = "Gato", LastName = "Doe", Password = "password"
            });
            users.Add(new User
            {
                Id = 3, UserEmail = "doejohn@gmail.com", FirstName = "Camello", LastName = "Doe", Password = "password"
            });
            users.Add(new User
            {
                Id = 4, UserEmail = "johndoe@gmail.com", FirstName = "Rober", LastName = "Doe", Password = "password"
            });
            users.Add(new User
            {
                Id = 5, UserEmail = "john_doe@yahoo.com", FirstName = "Stuar", LastName = "Doe", Password = "password"
            });
            users.Add(new User
            {
                Id = 6, UserEmail = "admin@email.com", FirstName = "admin", LastName = "ctrl", Password = "P4ssw0rd*01"
            });
            return users;
        }

        public List<User> GetAllUsers()
        {
            return _users.ToList();
        }

        public User GetUserById(int id)
        {
            return _users.FirstOrDefault(user => user.Id == id)!;
        }

        public bool UserExistsEmail(string email) => _users.Any(u => u.UserEmail == email);

        // public User GetUserByEmail(string email)
        // {
        //     return _users.FirstOrDefault(u => u.UserEmail == email)!;
        // }

        public void AddUser(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            user.Id = _users.Max(u => u.Id) + 1;
            _users.Add(user);
        }

        public void UpdateUser(int id, User editedUser)
        {
            if (editedUser == null)
            {
                throw new ArgumentNullException(nameof(editedUser));
            }

            User user = _users.FirstOrDefault(u => u.Id == id);
            if (user != null)
            {
                user.UserEmail = editedUser.UserEmail;
                user.FirstName = editedUser.FirstName;
                user.LastName = editedUser.LastName;
                user.Password = editedUser.Password;
            }
        }

        public void DeleteUser(int id)
        {
            User user = _users.FirstOrDefault(u => u.Id == id);
            if (user != null)
            {
                _users.Remove(user);
            }
        }
        public User GetUserByEmail(string modelUserEmail)
        {
            return _users.FirstOrDefault(user => user.UserEmail.Equals(modelUserEmail, StringComparison.OrdinalIgnoreCase));
        }

    }
}