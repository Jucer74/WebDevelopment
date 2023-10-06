using System.ComponentModel.DataAnnotations;

namespace MoneyBankMVC.Models
{
    public class Account
    {

        [Key]
        public int Id { get; set; }
        [Display(Name ="Tipo")]

        [Required(ErrorMessage = "(El campo Tipo de cuenta es requerido)")]
        [RegularExpression("[AC]",ErrorMessage ="El campo tipo de cuenta solo permite (A O C)")]

        public char AccountType { get; set; } = 'A';


        [Display(Name = "Fecha")]
        [DataType(DataType.Date)]
        public DateTime CreationDate { get; set; } = DateTime.Now;

        [Display(Name = "Cuenta")]
        [Required(ErrorMessage = "El campo numero de cuenta es requerido")]
        [MaxLength(10, ErrorMessage = "El campo Numero de La Cuenta tiene una longitud maxima de 10 caracteres")]
        [RegularExpression(@"^\d{10}", ErrorMessage = "El campo Numero de la Cuenta Solo Acepta Numeros")]
        public string AccountNumber { get; set; } = null!;



        [Display(Name = "Nombre")]
        [Required(ErrorMessage ="El campo nombre del probetiario es requqerido")]
        [MaxLength(100, ErrorMessage = "El campo nombre de propietario tiene una longitud maxima de 100 caracteres")]
        public string OwnerName { get; set; } = null!;


        [Display(Name = "Balance")]
        [Required(ErrorMessage = "El campo Balance es Requerido")]
        [RegularExpression(@"^\d+.?\d{0,2}$", ErrorMessage = "El campo Balance debe ser en formato Moneda (0.00)")]
        public decimal BalanceAmount { get; set; }

        [Required(ErrorMessage = "El campo Sobregiro es Requerido")]
        [RegularExpression(@"^\d+.?\d{0,2}$", ErrorMessage = "El campo Sobregiro debe ser en formato Moneda (0.00)")]
        public decimal OverdraftAmount { get; set; }



    }
}
