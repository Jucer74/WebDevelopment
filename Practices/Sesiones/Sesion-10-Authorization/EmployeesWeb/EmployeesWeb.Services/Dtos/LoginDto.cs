using Newtonsoft.Json;

namespace WebDev.Services.Dtos
{
   public class LoginDto
   {
      //[JsonProperty("email")]
      public string? Email { get; set; }

      //[JsonProperty("password")]
      public string? Password { get; set; }
   }
}