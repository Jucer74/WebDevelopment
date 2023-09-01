using System.ComponentModel.DataAnnotations;

namespace Parcial.Models
{
    public class Friend
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "AmigosPFP")]
        public string PhotoPath { get; set; } = null!;

        [Required(ErrorMessage = "El correo es obligatorio")]
        [StringLength(100)]
        [EmailAddress(ErrorMessage = "El formato del correo no es válido")]
        [Display(Name = "Correo")]
        public string UserEmail { get; set; } = null!;

        [Required(ErrorMessage = "El nombre es obligatorio")]
        [StringLength(50)]
        [Display(Name = "Nombre")]
        public string FirstName { get; set; } = null!;

        [Required(ErrorMessage = "El apellido es obligatorio")]
        [StringLength(50)]
        [Display(Name = "Apellido")]
        public string LastName { get; set; } = null!;

        [Required(ErrorMessage = "La fecha de nacimiento es obligatoria")]
        [DataType(DataType.Date)]
        [Display(Name = "Fecha de nacimiento")]
        public DateTime DateOfBirth { get; set; }

        [Required(ErrorMessage = "El sexo es obligatorio")]
        [Display(Name = "Sexo")]
        public char Sex { get; set; }

       
    }
}
