using System.ComponentModel.DataAnnotations;

namespace MoneyBankMVC.Models
{
    public class Account
    {
        [Key]
        public string Id { get; set; }

        [Display(Name = "Tipo")]
        [Required(ErrorMessage = "El campo Tipo de Cuenta es requerido")]
        [RegularExpression("^[AC]$", ErrorMessage = "El campo Tipo de Cuenta solo permite 'A' o 'C'")]
        public char AccountType { get; set; } = 'A';

        [Required(ErrorMessage = "El campo Fecha de Creación es requerido")]
        [DataType(DataType.Date)]
        public DateTime CreationDate { get; set; }

        [Required(ErrorMessage = "El campo Número de La Cuenta es requerido")]
        [StringLength(10, ErrorMessage = "El campo Número de La Cuenta debe tener una longitud máxima de 10 caracteres")]
        [RegularExpression("^[0-9]+$", ErrorMessage = "El campo Número de La Cuenta solo permite números")]
        public char AccountNumber { get; set; }

        [Required(ErrorMessage = "El campo Nombre del Propietario es requerido")]
        [StringLength(100, ErrorMessage = "El campo Nombre del Propietario debe tener una longitud máxima de 100 caracteres")]
        public char OwnerName { get; set; }

        [Required(ErrorMessage = "El campo Saldo es requerido")]
        [Range(0, double.MaxValue, ErrorMessage = "El campo Saldo debe ser mayor o igual a cero")]
        public decimal BalanceAmount { get; set; }

        [Required(ErrorMessage = "El campo Sobregiro es requerido")]
        [Range(0, double.MaxValue, ErrorMessage = "El campo Sobregiro debe ser mayor o igual a cero")]
        public decimal OverdraftAmount { get; set; }


    }
}
