using System.ComponentModel.DataAnnotations;

namespace MoneyBankMVC.Models
{
    public class Transaction: Account
    {
        [Display(Name = "Valor")]
        [Required(ErrorMessage = "El campo Valor es Requerido")]
        [RegularExpression(@"^\d+.?\d{0,2}$", ErrorMessage = "El campo Valor debe ser en formato Moneda (0.00)")]
        public decimal ValueAmount { get; set; }
    }
}
