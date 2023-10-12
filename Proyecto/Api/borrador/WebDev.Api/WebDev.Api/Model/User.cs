namespace WebDev.Api.Model
{
    using System.ComponentModel.DataAnnotations;

    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required char Email { get; set; }

        [Required]
        public required char Name { get; set; }

        [Required]
        public required char Password { get; set; }

        [Required]
        public required char Username { get; set; }
    }
}