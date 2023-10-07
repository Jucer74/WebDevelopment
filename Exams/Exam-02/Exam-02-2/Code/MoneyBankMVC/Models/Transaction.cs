using System.ComponentModel.DataAnnotations;

namespace MoneyBankMVC.Models
{
    public class Transaction : Account
    {
        [Required(ErrorMessage = "El campo Valor es Requerido")]
        [DisplayFormat(DataFormatString = "${0:N2}")]
        [Display(Name = "Valor")]
        [Range(0.01, double.MaxValue, ErrorMessage = "El campo Valor debe ser mayor que 0")]
        public decimal TransactionAmount { get; set; }
    }
}