using System.ComponentModel.DataAnnotations;

namespace MoneyBankMVC.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }

        [Display (Name = "Tipo")]
        [Required(ErrorMessage = "El campo Tipo de Cuenta es Requerido)")]
        [RegularExpression("[AC]", ErrorMessage = "El campo Tipo de Cuenta solo permite (A o C)")]
        public char AccountType { get; set; } = 'A';

        [Display(Name = "Fecha")]
        [DataType(DataType.Date)]
        public DateTime CreationDate { get; set; } = DateTime.Now;

        [Required(ErrorMessage = "El Número de Cuenta es requerido.")]
        [StringLength(10, ErrorMessage = "El Número de Cuenta debe tener una longitud máxima de 10 caracteres.")]
        [RegularExpression("^[0-9]+$", ErrorMessage = "El Número de Cuenta solo acepta números.")]
        public string? AccountNumber { get; set; }

        [Required(ErrorMessage = "El campo Nombre del Propietario es Requerido")]
        [MaxLength(100, ErrorMessage = "El campo Nombre del Propietario tiene una longitud maxima de 100 caracteres")]
        public string OwnerName { get; set; } = null!;

        [Required(ErrorMessage = "El campo Balance es Requerido")]
        [Range(0.01, double.MaxValue, ErrorMessage = "El Monto del Balance debe ser mayor a cero.")]
        [DataType(DataType.Currency)]
        public decimal BalanceAmount { get; set; }

        [Required(ErrorMessage = "El campo Sobregiro es Requerido")]
        [DataType(DataType.Currency)]
        public decimal OverdraftAmount { get; set; }
    }
}
