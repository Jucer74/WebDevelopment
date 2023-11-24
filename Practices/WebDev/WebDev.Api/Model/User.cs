using System.ComponentModel.DataAnnotations;

namespace WebDev.Api.Model
{
    public class citasmedicas
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Patient { get; set; } = null!;

        [Required]
        public string Doctor { get; set; } = null!;

        [Required]
        public string Office { get; set; } = null!;

        [Required]
        public string Status { get; set; } = null!;

    }
}
