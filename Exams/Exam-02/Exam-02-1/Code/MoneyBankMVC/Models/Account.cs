using System;

namespace MoneyBankMVC.Models
{
    public class Account
    {
        public int Id { get; set; } = 0;
        public string AccountType { get; set; } = null!;
        public DateTime CreationDate { get; set; } = default!;
        public string AccountNumber { get; set; } = null!;
        public string OwnerName { get; set; } = null!;
        public double BalanceAmount { get; set; }
        public double OverdraftAmount { get; set; }
    }
}
