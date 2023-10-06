using System.ComponentModel.DataAnnotations;

namespace MoneyBankMVC.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "El campo TIPO DE CUENTA es Requerido")]
        [RegularExpression("[AC]", ErrorMessage = "El campo TIPO DE CUENTA solo permite (A o C)")]
        public char AccountType { get; set; } = 'A';

        [DataType(DataType.Date)]
        public DateTime CreationDate { get; set; } = DateTime.Now;

        [Required(ErrorMessage = "El campo NUMERO DE CUENTA es Requerido")]
        [MaxLength(10, ErrorMessage = "El campo NUMERO DE CUENTA tiene un maximo de caracteres es 10")]
        [RegularExpression(@"\d{10}", ErrorMessage = "El campo NUMERO DE CUENTA solo acepta numeros")]
        public string AccountName { get; set; } = null!;

        [Required(ErrorMessage = "El campo NOMBRE DEL PROPIETARIO es Requerido")]
        [MaxLength(100, ErrorMessage = "El campo NOMBRE DEL PROPIETARIO tiene un maximo de caracteres es 100")]
        public string OwnerName { get; set; } = null!;

        [Required(ErrorMessage = "El campo BALANCE es Requerido")]
        [RegularExpression(@"^\d+.?\d{0,2}$", ErrorMessage = "El campo BALANCE es debe ser en formato moneda (0.00)")]
        public decimal BalanceAmount { get; set; }

        [Required(ErrorMessage = "El campo SOBREGIRO es Requerido")]
        [RegularExpression(@"^\d+.?\d{0,2}$", ErrorMessage = "El campo SOBREGIRO es debe ser en formato moneda (0.00)")]
        public decimal OverdraftAmount { get; set; }
    }
}
