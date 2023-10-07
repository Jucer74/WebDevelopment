using System.ComponentModel.DataAnnotations;

namespace MoneyBankMVC.Models
{
    public class Transaction
    {
        [Display(Name = "Valor")]
        [Required(ErrorMessage = "El campo V alor es Requerido")]
        [RegularExpression(@"^\d+.?\d{0,2}$", ErrorMessage = "El campo Valor debe ser en formato Moneda (0.00)")]
        public decimal ValueAmount { get; set; }
    }
}
