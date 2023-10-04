using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace MoneyBankMVC.Models

{


    public class Account
    {
        public int Id { get; set; }

        [Required]
        [StringLength(1)]
        public string AccountType { get; set; }

        [Required]
        public DateTime CreationDate { get; set; }

        [Required]
        [StringLength(10)]
        public string AccountNumber { get; set; }

        [Required]
        [StringLength(100)]
        public string OwnerName { get; set; }

        [Required]
        public decimal BalanceAmount { get; set; }

        [Required]
        
        public decimal OverdraftAmount { get; set; }
    }

}
