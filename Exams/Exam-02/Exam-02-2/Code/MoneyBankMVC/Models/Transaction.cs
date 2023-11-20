using System.ComponentModel.DataAnnotations;

namespace MoneyBankMVC.Models
{
    public class Transaction : Account
    {

        [Display(Name = "Valor")]
        public decimal ValueAmount { get; set; }

    }
}
