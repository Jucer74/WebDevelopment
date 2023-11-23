namespace WebDev.Api.Model
{
    using System.ComponentModel.DataAnnotations;

    public class User
    {
        [Key] public int Id { get; set; }


        [Required(ErrorMessage = "User Email is required")]
        public string? UserEmail { get; set; }

        [Required(ErrorMessage = "Users first name is required")]
        public string? FirstName { get; set; }

        [Required(ErrorMessage = "Users last name is required")]
        public string? LastName { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [MinLength(16), MaxLength(32), DataType(DataType.Password)]
        public string? Password { get; set; }
    }
}
