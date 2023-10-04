using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyBankMVC.Models
{
    [Table("Accounts")]
    public class Account
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(1)]
        public required string AccountType { get; set; }

        [Required]
        public DateTime CreationDate { get; set; }

        [Required]
        [StringLength(10)]
        public required string AccountNumber { get; set; }

        [Required]
        [StringLength(100)]
        public required string OwnerName { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal BalanceAmount { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal OverdraftAmount { get; set; }
    }
}
