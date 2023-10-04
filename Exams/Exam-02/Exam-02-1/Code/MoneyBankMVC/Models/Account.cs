using System.ComponentModel.DataAnnotations;

namespace MoneyBankMVC.Models
{
    public partial class Account
    {
        public const decimal MAX_OVERDRAFT = 1000000.00M; // Monto máximo de sobregiro

        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "El Tipo de Cuenta es requerido.")]
        [StringLength(1, ErrorMessage = "El Tipo de Cuenta debe tener una longitud de 1 carácter.")]
        [RegularExpression("^[AC]$", ErrorMessage = "El Tipo de Cuenta solo permite 'A' o 'C'.")]
        public string? AccountType { get; set; }

        [Required(ErrorMessage = "La Fecha de Creación es requerida.")]
        [DataType(DataType.Date)]
        public DateTime CreationDate { get; set; }

        [Required(ErrorMessage = "El Número de Cuenta es requerido.")]
        [StringLength(10, ErrorMessage = "El Número de Cuenta debe tener una longitud máxima de 10 caracteres.")]
        [RegularExpression("^[0-9]+$", ErrorMessage = "El Número de Cuenta solo acepta números.")]
        public string? AccountNumber { get; set; }

        [Required(ErrorMessage = "El Nombre del Propietario es requerido.")]
        [StringLength(100, ErrorMessage = "El Nombre del Propietario debe tener una longitud máxima de 100 caracteres.")]
        public string? OwnerName { get; set; }

        [Required(ErrorMessage = "El Monto del Balance es requerido.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "El Monto del Balance debe ser mayor a cero.")]
        [DataType(DataType.Currency)]
        public decimal BalanceAmount { get; set; }

        [Required(ErrorMessage = "El Monto del Sobregiro es requerido.")]
        [Range(0, 1000000, ErrorMessage = "El Monto del Sobregiro no debe exceder $1,000,000.00.")]
        [DataType(DataType.Currency)]
        public decimal OverdraftAmount { get; set; }
    }
}