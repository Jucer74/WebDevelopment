using System.ComponentModel.DataAnnotations;

public class Account
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "El campo Tipo de Cuenta es Requerido)")]
    [RegularExpression("[AC]", ErrorMessage = "El campo Tipo de Cuenta solo permite (A o C)")]
    public char AccountType { get; set; } = 'A';

    [DataType(DataType.Date)]
    public DateTime CreationDate { get; set; } = DateTime.Now;

    [Required(ErrorMessage = "El campo Numero de la Cuenta es Requerido")]
    [MaxLength(10, ErrorMessage = "El campo Numero de La Cuenta tiene una longitud maxima de 10 caracteres")]
    [RegularExpression(@"\d{10}", ErrorMessage = "El campo Numero de la Cuenta Solo Acepta Numeros")]
    public string AccountNumber { get; set; } = null!;

    [Required(ErrorMessage = "El campo Nombre del Propietario es Requerido")]
    [MaxLength(100, ErrorMessage = "El campo Nombre del Propietario tiene una longitud maxima de 100 caracteres")]
    public string OwnerName { get; set; } = null!;

    [Required(ErrorMessage = "El campo Balance es Requerido")]
    [RegularExpression(@"^\d+.?\d{0,2}$", ErrorMessage = "El campo Balance debe ser en formato Moneda (0.00)")]
    public decimal BalanceAmount { get; set; }

    [Required(ErrorMessage = "El campo Sobregiro es Requerido")]
    [RegularExpression(@"^\d+.?\d{0,2}$", ErrorMessage = "El campo Sobregiro debe ser en formato Moneda (0.00)")]
    public decimal OverdraftAmount { get; set; }
}