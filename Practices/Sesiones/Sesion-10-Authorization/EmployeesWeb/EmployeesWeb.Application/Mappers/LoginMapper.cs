using EmployeesWeb.Application.Models;
using WebDev.Services.Dtos;

namespace EmployeesWeb.Application.Mappers
{
   public class LoginMapper
   {
      protected LoginMapper()
      {

      }

      public static Login ToEntity(LoginDto loginDto)
      {
         return new Login
         {
            Email = loginDto.Email,
            Password = loginDto.Password
         };
      }

      public static LoginDto ToDto(Login login)
      {
         return new LoginDto
         {
            Email = login.Email,
            Password = login.Password
         };
      }
   }
}
