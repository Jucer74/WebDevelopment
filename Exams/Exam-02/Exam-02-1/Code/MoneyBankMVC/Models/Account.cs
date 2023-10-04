using System.ComponentModel.DataAnnotations;

namespace MoneyBankMVC.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Tipo")]
        [Required(ErrorMessage = "El campo tipo de cuenta es reuqerido")]
        [RegularExpression("AC", ErrorMessage = "El campo tipo de cuenta solo permite (A o C)")]
        public required string AcountType { get; set; }

        [Display(Name = "Fecha")]
        [DataType(DataType.Date)]
        public DateTime CreationDate { get; set; }

        [Display(Name = "Cuenta")]
        [Required(ErrorMessage = "El campo numero de la cuenta es requerido")]
        [RegularExpression("^[0,9]+$", ErrorMessage =("El campo numero de la cuenta solo recibe numeros"))]
        public int AccountNumber { get; set; }

        [Display(Name ="Nombre Propietarios")]
        [Required(ErrorMessage = "El campo nombre del propietario es requerido")]
        [StringLength(100, ErrorMessage ="El nombre del propietario debe ser maximo 100 caracteres")]
        public required string OwnerName { get; set; }

        [Display(Name ="Balance")]
        [Range(0, double.MaxValue, ErrorMessage ="El campo Saldo debe ser amyor o igual a cero")]

        public decimal BalanceAmount { get; set; }

        [Display(Name ="Sobregiro")]
        [Range(0, double.MaxValue, ErrorMessage = "El campo Sobregiro debe ser amyor o igual a cero")]
        public decimal OverdraftAmount { get; set; }
    }
}
