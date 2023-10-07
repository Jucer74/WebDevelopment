using System;
using System.ComponentModel.DataAnnotations;

namespace MoneyBankMVC.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Tipo")]
        [Required(ErrorMessage = "El campo Tipo de Cuenta es requerido")]
        [RegularExpression("[AC]", ErrorMessage = "El campo Tipo de Cuenta solo permite (A o C)")]
        public char AccountType { get; set; } = 'A';

        [Display(Name = "Fecha")]
        [DataType(DataType.Date)]
        public DateTime CreationDate { get; set; } = DateTime.Now;

        [Display(Name = "Cuenta")]
        [Required(ErrorMessage = "El campo Número de Cuenta es requerido")]
        [MaxLength(10, ErrorMessage = "El campo Número de La Cuenta tiene una longitud máxima de 10 caracteres")]
        [RegularExpression(@"\d{10}", ErrorMessage = "El campo Número de la Cuenta solo acepta números")]
        public string AccountNumber { get; set; } = null!;

        [Display(Name = "Nombre")]
        [Required(ErrorMessage = "El campo Nombre del Propietario es requerido")]
        [MaxLength(100, ErrorMessage = "El campo Nombre del Propietario tiene una longitud máxima de 100 caracteres")]
        public string OwnerName { get; set; } = null!;

        [Display(Name = "Balance")]
        [Required(ErrorMessage = "El campo Balance es requerido")]
        [RegularExpression(@"^\d+(\.\d{1,2})?$", ErrorMessage = "El campo Balance debe ser en formato Moneda (0.00)")]
        public decimal BalanceAmount { get; set; }

        [Display(Name = "Sobregiro")]
        [Required(ErrorMessage = "El campo Sobregiro es requerido")]
        [RegularExpression(@"^\d+(\.\d{1,2})?$", ErrorMessage = "El campo Sobrecarga debe ser en formato Moneda (0.00)")]
        public decimal OverdraftAmount { get; set; }
    }
}
