﻿namespace WebDev.Api.Model
{
    using System.ComponentModel.DataAnnotations;
    public class Account
    {

        public const decimal MAX_OVERDRAFT = 1000000.00M; // Monto máximo de sobregiro

        [Key]
        public int Id { get; set; }

        [Display(Name = "Tipo")]
        [Required(ErrorMessage = "El campo Tipo de Cuenta es Requerido)")]
        [RegularExpression("[AC]", ErrorMessage = "El campo Tipo de Cuenta solo permite (A o C)")]
        public char AccountType { get; set; } = 'A';

        [Display(Name = "Fecha")]
        [DataType(DataType.Date)]
        public DateTime CreationDate { get; set; } = DateTime.Now;

        [Display(Name = "No. Cuenta")]
        [Required(ErrorMessage = "El campo Numero de la Cuenta es Requerido")]
        [MaxLength(10, ErrorMessage = "El campo Numero de La Cuenta tiene una longitud maxima de 10 caracteres")]
        [RegularExpression(@"\d{10}", ErrorMessage = "El campo Numero de la Cuenta Sólo Acepta Numeros")]
        public string AccountNumber { get; set; } = null!;

        [Display(Name = "Nombre")]
        [Required(ErrorMessage = "El campo Nombre del Propietario es Requerido")]
        [MaxLength(100, ErrorMessage = "El campo Nombre del Propietario tiene una longitud maxima de 100 caracteres")]
        public string OwnerName { get; set; } = null!;

        [Display(Name = "Balance")]
        [Required(ErrorMessage = "El campo Balance es Requerido")]
        [Range(0.01, double.MaxValue, ErrorMessage = "El Monto del Balance debe ser mayor a cero.")]
        [DataType(DataType.Currency)]
        public decimal BalanceAmount { get; set; }

        [Display(Name = "Sobregiro")]
        [Required(ErrorMessage = "El campo Sobregiro es Requerido")]
        [DataType(DataType.Currency)]
        public decimal OverdraftAmount { get; set; }
    }
}
