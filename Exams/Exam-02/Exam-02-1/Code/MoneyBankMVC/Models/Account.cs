using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace MoneyBankMVC.Models
{
    public partial class Account
    {

        public const decimal MAX_OVERDRAFT = 1000000.00M;

        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "El tipo de cuenta es requerido")]
        [StringLength(1, ErrorMessage = "El tipo de cuenta es hasta 1 caracter")]
        [RegularExpression("^[AC]$", ErrorMessage = "Tipo de cuenta solo permite 'A' o 'C'.")]
        [Display(Name = "Tipo")]
        public string AccountType { get; set; } = null!;

        [Required(ErrorMessage = "La fecha de creación es requerida")]
        [Display(Name = "Fecha")]
        public DateTime CreationDate { get; set; }

        [Required(ErrorMessage = "El numero de cuenta es requerido")]
        [StringLength(10, ErrorMessage = "El numero de cuenta es hasta 10 caracteres")]
        [RegularExpression("^[0-9]+$", ErrorMessage = "El numero de cuenta solo permite los valores 0-9")]
        [Display(Name = "Cuenta")]
        public string AccountNumber { get; set; } = null!;

        [Required(ErrorMessage = "El nombre del propietario es requerido")]
        [StringLength(100, ErrorMessage = "El nombre del propietario es hasta 100 caracteres")]
        [Display(Name = "Nombre")]
        public string OwnerName { get; set; } = null!;

        [Required(ErrorMessage = "El saldo es requerido")]
        [Display(Name = "Balance")]
        [Range(0.01, double.MaxValue, ErrorMessage = "El saldo debe ser mayor a 0")]
        public decimal BalanceAmount { get; set; }

        [Required(ErrorMessage = "El monto de sobregiro es requerido")]
        [Display(Name = "Sobregiro")]
        [Range(0, 1000000, ErrorMessage = "El monto del sobregiro debe estar entre 0 y 1,000,000.")]
        public decimal OverdraftAmount { get; set; }
    }
}