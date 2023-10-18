using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ConsumeWebAPI.Models
{
    public class AccountViewModel
    {
        public int Id { get; set; }
        [Required]
        [DisplayName("Account Name")]
        public string AccountType { get; set;}
        [Required]
        public DateTime CreationDate { get; set; }
        [Required]

        public string AccountNumber { get; set; }
        [Required]

        public string OwnerName { get; set; }
        [Required]

        public float BalanceAmount { get; set; }
        [Required]

        public float OverdraftAmount { get; set; }









    }
}
