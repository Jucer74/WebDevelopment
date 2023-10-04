using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace MoneyBankMVC.Models
{
    public class Account
    {
        [Key]
        [DisplayName("Id")]
        public int Id { get; set; } = 0;

        [Required(ErrorMessage = "El tipo de cuenta es requerido")]
        [RegularExpression("^[ABC]$", ErrorMessage = "Allowed values for AccountType are A, B or C ")]
        [DisplayName("Account Type")]
        public char AccountType { get; set; } = 'A';

        [Required(ErrorMessage = "La fecha de creacion es requeriada")]
        [DataType(DataType.Date)]
        [DisplayName("Date of creation")]
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime CreationDate { get; set; } = default!;

        [Required(ErrorMessage = "El numero de cuenta es requerido")]
        [StringLength(10, ErrorMessage = "El campo Numero de La Cuenta tiene una longitud maxima de 10 caracteres")]
        [DisplayName("Account Number")]
        public string AccountNumber { get; set; } = null!;

        [Required(ErrorMessage = "El nombre del propetario es requerido")]
        [StringLength(100, ErrorMessage = "El campo nombre del propietario tiene una longitud maxima de 100 caracteres")]
        [DisplayName("Owner Name")]
        public string OwnerName { get; set; } = null!;

        [Required(ErrorMessage = "The balance amount is required")]
        [DisplayName("Balance Amount")]
        public decimal BalanceAmount { get; set; }

        [Required(ErrorMessage = "The overdraft amount is required")]
        [DisplayName("Overdraft Amount")]
        public decimal OverdraftAmount { get; set; }
    }
}
