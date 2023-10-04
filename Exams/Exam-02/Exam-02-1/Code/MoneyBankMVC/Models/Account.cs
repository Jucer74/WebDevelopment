using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MoneyBankMVC.Models;

public partial class Account
{
    [Key]
    public int Id { get; set; }

    [Display(Name = "Tipo")]
    [Required(ErrorMessage = "El campo tipo de cuenta es reuqerido")]
    [RegularExpression("^[AC]$", ErrorMessage = "El campo tipo de cuenta solo permite (A o C)")]
    public string AccountType { get; set; } = null!;

    [Display(Name = "Fecha")]
    [DataType(DataType.Date)]
    public DateTime CreationDate { get; set; }

    [Display(Name = "Cuenta")]
    [Required(ErrorMessage = "El campo numero de la cuenta es requerido")]
    [RegularExpression("^[0-9]+$", ErrorMessage = ("El campo numero de la cuenta solo recibe numeros"))]
    public string AccountNumber { get; set; } = null!;

    [Display(Name = "Nombre Propietarios")]
    [Required(ErrorMessage = "El campo nombre del propietario es requerido")]
    [StringLength(100, ErrorMessage = "El nombre del propietario debe ser maximo 100 caracteres")]
    public string OwnerName { get; set; } = null!;

    [Display(Name = "Balance")]
    [Range(0, double.MaxValue, ErrorMessage = "El campo Saldo debe ser amyor o igual a cero")]
    public decimal BalanceAmount { get; set; }

    [Display(Name = "Sobregiro")]
    [Range(0, double.MaxValue, ErrorMessage = "El campo Sobregiro debe ser amyor o igual a cero")]
    public decimal OverdraftAmount { get; set; }

    internal static Task<List<Account>> ToListAsync()
    {
        throw new NotImplementedException();
    }
}
