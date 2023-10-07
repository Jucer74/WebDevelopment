using System.ComponentModel.DataAnnotations;

namespace MoneyBankMVC.Models;

public class Account
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "El campo Tipo es Requerido")]
    [RegularExpression("[AC]", ErrorMessage = "El campo Tipo solo permite (A o C)")]
    [Display(Name = "Tipo")]
    public char AccountType { get; set; } = 'A';

    [DataType(DataType.Date)]
    [Display(Name = "Fecha")]
    [DisplayFormat(DataFormatString = "{0:dd-MMM-yyyy}")]
    public DateTime CreationDate { get; set; } = DateTime.Now;

    [Required(ErrorMessage = "El campo Cuenta es Requerido")]
    [MaxLength(10, ErrorMessage = "El campo Cuenta tiene una longitud maxima de 10 caracteres")]
    [RegularExpression(@"\d{10}", ErrorMessage = "El campo Cuenta Solo Acepta Números")]
    [Display(Name = "Cuenta")]
    public string AccountNumber { get; set; } = null!;

    [Required(ErrorMessage = "El campo Propietario es Requerido")]
    [MaxLength(100, ErrorMessage = "El campo Propietario tiene una longitud maxima de 100 caracteres")]
    [Display(Name = "Propietario")]
    public string OwnerName { get; set; } = null!;

    [Required(ErrorMessage = "El campo Balance es Requerido")]
    [RegularExpression(@"^\d+.?\d{0,2}$", ErrorMessage = "El campo Balance debe ser en formato Moneda (0.00)")]
    [Range(0.01, double.MaxValue, ErrorMessage = "El campo Balance debe ser mayor que 0")]
    [DisplayFormat(DataFormatString = "${0:N2}")]
    [Display(Name = "Balance")]
    public decimal BalanceAmount { get; set; }

    [Required(ErrorMessage = "El campo Sobregiro es Requerido")]
    [RegularExpression(@"^\d+.?\d{0,2}$", ErrorMessage = "El campo Sobregiro debe ser en formato Moneda (0.00)")]
    [DisplayFormat(DataFormatString = "${0:N2}")]
    [Display(Name = "Sobregiro")]
    public decimal OverdraftAmount { get; set; }
}