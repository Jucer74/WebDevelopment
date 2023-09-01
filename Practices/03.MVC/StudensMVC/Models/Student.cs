using System.ComponentModel.DataAnnotations;

namespace StudensMVC.Models
{
    public class Student
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage ="El Nombre es requerido")]
        [StringLength(50)]
        [Display(Name = "Nombre")]
        public string firstName { get; set; }

        [Required(ErrorMessage = "El Nombre es requerido")]
        [StringLength(50)]
        [Display(Name = "Apellido")]
        public string lastName { get; set; }

        [Required(ErrorMessage = "El Nombre es requerido")]
        [DataType(DataType.Date)]
        [Display(Name = "Apellido")]
        public DateTime DateOfBirth { get; set; }

        [Required(ErrorMessage ="El Campo sexo es requerido")]
        [Display(Name ="Sexo")]
        public char Sex { get; set; }
    }
}
