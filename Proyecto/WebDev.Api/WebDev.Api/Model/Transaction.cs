namespace WebDev.Api.Model
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class Transaction
    {
        [Key]
        public int TransactionId { get; set; }

        [Required]
        public int AccountId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string TransactionType { get; set; }

        [Required]
        public DateTime TransactionDate { get; set; }
    }
}
