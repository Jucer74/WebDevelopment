using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyBankMVC.Models
{
    public class Account
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "El campo TIPO DE CUENTA es Requerido")]
        [RegularExpression("[AC]", ErrorMessage = "El campo TIPO DE CUENTA solo permite (A o C)")]
        [Display(Name = "Tipo")]
        public char AccountType { get; set; } = 'A';

        [DataType(DataType.Date)]
        [Display(Name = "Fecha")]
        public DateTime CreationDate { get; set; } = DateTime.Now;

        [Required(ErrorMessage = "El campo NUMERO DE CUENTA es Requerido")]
        [MaxLength(10, ErrorMessage = "El campo NUMERO DE CUENTA tiene un maximo de caracteres es 10")]
        [RegularExpression(@"\d{10}")]
        [Display(Name = "Cuenta")]
        public string AccountNumber { get; set; } = null!;

        [Required(ErrorMessage = "El campo NOMBRE DEL PROPIETARIO es Requerido")]
        [MaxLength(100, ErrorMessage = "El campo NOMBRE DEL PROPIETARIO tiene un maximo de caracteres es 100")]
        [Display(Name = "Propietario")]
        public string OwnerName { get; set; } = null!;

        [Required(ErrorMessage = "El campo BALANCE es Requerido")]
        [RegularExpression(@"^\d+.?\d{0,2}$", ErrorMessage = "El campo BALANCE es debe ser en formato moneda (0.00)")]
        [Display(Name = "Balance")]
        public decimal BalanceAmount { get; set; }

        [Required(ErrorMessage = "El campo SOBREGIRO es Requerido")]
        [RegularExpression(@"^\d+.?\d{0,2}$", ErrorMessage = "El campo SOBREGIRO es debe ser en formato moneda (0.00)")]
        [Display(Name = "Sobregiro")]
        public decimal OverdraftAmount { get; set; }
    }
}
