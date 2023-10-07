using System.ComponentModel.DataAnnotations;

namespace MoneyBankMVC.Models
{
    public class Transaction : Account
    {
        public Account AccountData { get; set; } = null!;
       
        public decimal ValueAmount { get; set; }

    }
}
