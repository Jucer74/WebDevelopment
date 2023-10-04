using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyBankMVC.Models
{
    public partial class Accounts
    {
        public const decimal OVERDRAFT_LIMIT = 1000000.00m;  // Estableciendo el sobregiro máximo en 1,000,000

        [Key]
        [Required(ErrorMessage = "El Id es requerido")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [DisplayName("Id")]
        public int Id { get; set; }

        [Required(ErrorMessage = "El tipo de cuenta es requerido")]
        [DisplayName("Tipo de Cuenta")]
        public string AccountType { get; set; } = null!;

        [Required(ErrorMessage = "La fecha de creación es requerida")]
        [DisplayName("Fecha de Creación")]
        public DateTime CreationDate { get; set; } = DateTime.Now;

        [Required(ErrorMessage = "El número de cuenta es requerido")]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "El número de cuenta debe tener 10 caracteres")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "El número de cuenta solo debe contener dígitos.")]
        [DisplayName("Número de Cuenta")]
        public string AccountNumber { get; set; } = null!;


        [Required(ErrorMessage = "El nombre del propietario es requerido")]
        [DisplayName("Nombre del Propietario")]
        public string OwnerName { get; set; } = null!;

        [Required(ErrorMessage = "El saldo es requerido")]
        [DisplayName("Saldo")]
        [Range(0.01, double.MaxValue, ErrorMessage = "El saldo debe ser mayor que cero")]
        public decimal BalanceAmount { get; set; }

        [Range(0, 1000000, ErrorMessage = "El Monto del Sobregiro no debe exceder $1,000,000.00.")]
        [DataType(DataType.Currency)]
        public decimal OverdraftAmount { get; set; } = 0.00m;
    }
}
