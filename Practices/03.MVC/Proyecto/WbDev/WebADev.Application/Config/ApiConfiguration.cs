namespace WebADev.Application.Config
{
    public class ApiConfiguration
    {
        public static ApiConfiguration Value { get; internal set; }
        public object ApiUsersUrl { get; internal set; }
    }

    namespace WebDev.Application.Config
{
  public class ApiConfiguration
  {
    public string ApiUsersUrl { get; set; }
    public string ApiLoginUrl { get; set; }
  }
}
    }
