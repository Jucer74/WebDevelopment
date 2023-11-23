namespace WebDev.Api.Model
{
  public class LoginResponse
  {
    public string Token { get; set; }
    public int UserId { get; set; }
    public string Name { get; set; }
  }
}