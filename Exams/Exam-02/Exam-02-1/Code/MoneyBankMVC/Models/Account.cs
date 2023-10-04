using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace MoneyBankMVC.Models
{
    public partial class Account
    {
        [Key]
        [Required(ErrorMessage = "El Id es requerido")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [DisplayName("Id")]
        public int Id { get; set; }

        [StringLength(1)]
        [RegularExpression("^[AC]$", ErrorMessage = "Tipo de cuenta solo permite 'A' o 'C'.")]
        [Required(ErrorMessage = "El tipo de cuenta es requerido")]
        [DisplayName("Tipo de Cuenta")]
        public string AccountType { get; set; } = null!;

        [Required(ErrorMessage = "La fecha de creación es requerida")]
        [DisplayName("Fecha de Creación")]
        public DateTime CreationDate { get; set; }

        [Required(ErrorMessage = "El número de cuenta es requerido")]
        [DisplayName("Número de Cuenta")]
        public string AccountNumber { get; set; } = null!;

        [Required(ErrorMessage = "El nombre del propietario es requerido")]
        [DisplayName("Nombre del Propietario")]
        public string OwnerName { get; set; } = null!;

        [Required(ErrorMessage = "El saldo es requerido")]
        [DisplayName("Saldo")]
        public decimal BalanceAmount { get; set; }

        [DisplayName("Monto de Sobregiro")]
        public decimal OverdraftAmount { get; set; }
    }
}