using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MoneyBankMVC.Models
{
    public class Account
    {
        [Required(ErrorMessage = "El Id es requerido")]
        [DisplayName("Id")]
        public int Id { get; set; } = 0;

        [Required(ErrorMessage = "El tipo de cuenta es requerido")]
        [RegularExpression("^[AC]$", ErrorMessage = "Los valores permitidos son A o C")]
        [DisplayName("Tipo")]
        public char AccountType { get; set; } = 'A';

        [Required(ErrorMessage = "El número de cuenta es requerido")]
        [StringLength(10, ErrorMessage = "El valor de digitos es de 10")]
        [DisplayName("Cuenta")]
        public string AccountNumber { get; set; } = null!;

        [DataType(DataType.Date)]
        [DisplayName("Fecha")]
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime CreationDate { get; set; } = DateTime.Today;

        [Required(ErrorMessage = "El nombre es requerido")]
        [StringLength(100, ErrorMessage = "La cantidad de caracteres es de máximo 100")]
        [DisplayName("Nombre")]
        public string OwnerName { get; set; } = null!;

        [Required(ErrorMessage = "El balance es requerido")]
        //[Range(1.0, 18.2, ErrorMessage = "El balance debe de estar en un rango de 1 y 18.2")]
        [DisplayName("Balance")]
        public decimal BalanceAmount { get; set; }

        [Required(ErrorMessage = "El sobregiro es requerido")]
        //[Range(1.0, 18.2, ErrorMessage = "El balance debe de estar en un rango de 1 y 18.2")]
        [DisplayName("Sobregiro")]
        public decimal OverdraftAmount { get; set; }

    }
}
