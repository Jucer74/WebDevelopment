using Newtonsoft.Json;

namespace WebDev.Services.Dtos
{
   public class AuthorizationDto
   {
      [JsonProperty("access_token")]
      public string? AccessToken { get; set; }
   }
}