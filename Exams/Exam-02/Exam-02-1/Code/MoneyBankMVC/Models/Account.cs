using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyBankMVC.Models
{

    [Table("accounts")]
    public class Account
    {
        
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        [Required] [StringLength(1)] public string AccountType { get; set; } = null!;

        [Required]
        [Column(TypeName = "datetime")]
        public DateTime CreationDate { get; set; }

        [Required] [StringLength(10)] public string AccountNumber { get; set; } = null!;

        [Required] [StringLength(100)] public string OwnerName { get; set; } = null!;

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal BalanceAmount { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal OverdraftAmount { get; set; }
    }
}