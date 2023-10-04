using System.ComponentModel.DataAnnotations;

namespace MoneyBankMVC.Models
{
    public class AccountModel
    {
        [Key] 
        public int Id { get; set; }

        [Required(ErrorMessage = "El tipo de cuenta es requerido.")]
        [StringLength(50, ErrorMessage = "El tipo de cuenta debe tener como máximo 50 caracteres.")]
        public string AccountType { get; set; } = "";

        [Required(ErrorMessage = "El número de cuenta es requerido.")]
        [StringLength(20, ErrorMessage = "El número de cuenta debe tener como máximo 20 caracteres.")]
        public string AccountNumber { get; set; } = "";

        [Required(ErrorMessage = "El nombre del propietario es requerido.")]
        [StringLength(100, ErrorMessage = "El nombre del propietario debe tener como máximo 100 caracteres.")]
        public string OwnerName { get; set; } = "";

        [Required(ErrorMessage = "El saldo debe ser mayor a cero.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "El saldo debe ser mayor a cero.")]
        public decimal BalanceAmount { get; set; }

        public decimal OverdraftAmount { get; set; }

        [Required(ErrorMessage = "La fecha de creación es requerida.")]
        [DataType(DataType.Date)]
        public DateTime CreationDate { get; set; }
    }
}

