using System;
using System.ComponentModel.DataAnnotations;

namespace MoneyBankMVC.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Tipo de Cuenta")]
        [Required(ErrorMessage = "El campo Tipo de Cuenta es requerido.")]
        public string AccountType { get; set; }

        [Display(Name = "Número de Cuenta")]
        [Required(ErrorMessage = "El campo Número de Cuenta es requerido.")]
        public string AccountNumber { get; set; }

        [Display(Name = "Propietario")]
        [Required(ErrorMessage = "El campo Propietario es requerido.")]
        public string OwnerName { get; set; }

        [Display(Name = "Balance")]
        [Required(ErrorMessage = "El campo Balance es requerido.")]
        [RegularExpression(@"^\d+(\.\d{1,2})?$", ErrorMessage = "El campo Balance debe ser en formato de hasta dos decimales.")]
        public decimal BalanceAmount { get; set; }

        [Display(Name = "Sobregiro")]
        [Required(ErrorMessage = "El campo Sobregiro es requerido.")]
        [RegularExpression(@"^\d+(\.\d{1,2})?$", ErrorMessage = "El campo Sobregiro debe ser en formato de hasta dos decimales.")]
        public decimal OverdraftAmount { get; set; }

        [Display(Name = "Valor")]
        [Required(ErrorMessage = "El campo Valor es requerido.")]
        [RegularExpression(@"^\d+(\.\d{1,2})?$", ErrorMessage = "El campo Valor debe ser en formato de hasta dos decimales.")]
        public decimal ValueAmount { get; set; }

        public decimal MaxOverdraft { get; set; } = 1000000;
        public DateTime CreationDate { get; internal set; }

        public Transaction()
        {
            // Establecer valores predeterminados en el constructor
            AccountType = "";
            AccountNumber = "";
            OwnerName = "";
            BalanceAmount = 0;
            OverdraftAmount = 0;
            ValueAmount = 0;
        }
    }
}
