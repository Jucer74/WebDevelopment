namespace MoneyBankMVC.Models
{
    public class Account
    {
        public int Id { get; set; }
        public string AccountType { get; set; }
        public string CreationDate { get; set; }
        public string AccountNumber { get; set; }
        public string OwnerName { get; set; }
        public double BalanceAmount { get; set; }
        public double OverdraftAmount { get; set; }
    }
}
