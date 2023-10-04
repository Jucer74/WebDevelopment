using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace MoneyBankMVC.Models
{
    public class Account
    {
        [Required(ErrorMessage = "The Id is required")]
        [DisplayName("Id")]
        public int Id { get; set; } = 0;

        [Required(ErrorMessage = "The account type is required")]
        [RegularExpression("^[ABC]$", ErrorMessage = "Allowed values for AccountType are A, B or C ")]
        [DisplayName("Account Type")]
        public char AccountType { get; set; } = 'A';

       
        [DataType(DataType.Date)]
        [DisplayName("Date of creation")]
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime CreationDate { get; set; } = default!;

        [Required(ErrorMessage = "The account number is required")]
        [StringLength(10, ErrorMessage = "The maximum length of the account number is 10 characters")]
        [DisplayName("Account Number")]
        public string AccountNumber { get; set; } = null!;

        [Required(ErrorMessage = "The owner name is required")]
        [StringLength(100, ErrorMessage = "The maximum length of the owner name is 100 characters")]
        [DisplayName("Owner Name")]
        public string OwnerName { get; set; } = null!;

        [Required(ErrorMessage = "The balance amount is required")]
        //[Range(1, 18.2, ErrorMessage = "Balance Amount must be between 1 and 18.2")]
        [DisplayName("Balance Amount")]
        public decimal BalanceAmount { get; set; }

        [Required(ErrorMessage = "The overdraft amount is required")]
        [DisplayName("Overdraft Amount")]
        public decimal OverdraftAmount { get; set; }
    }
}
