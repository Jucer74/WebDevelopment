using System.ComponentModel.DataAnnotations;

namespace WebDev.Api.Model
{
  public class Login
  {
    [Required]
    [EmailAddress]
    public string email { get; set; }

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }
  }
}