using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyBankMVC.Models
{
    [Table("Accounts")]
    public class Account
    {
        [Key]
        public int Id { get; set; } = 0;

        [Required]
        [StringLength(1)]
        public required string AccountType { get; set; }  = null!;

        [Required]
        public DateTime CreationDate { get; set; } = default;

        [Required]
        [StringLength(10)]
        public required string AccountNumber { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public required string OwnerName { get; set; } = null!;

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal BalanceAmount { get; set; } = decimal.Zero;

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal OverdraftAmount { get; set; } = decimal.Zero;
    }
}
