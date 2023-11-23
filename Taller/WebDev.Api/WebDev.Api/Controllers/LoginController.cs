using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using WebDev.Api.Context;
using WebDev.Api.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebDev.Api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class LoginController : ControllerBase
  {
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public LoginController(AppDbContext context, IConfiguration configuration)
    {
      _context = context;
      _configuration = configuration;
    }

    // POST api/<LoginController>
    [HttpPost]
    [AllowAnonymous]
    public ActionResult<LoginResponse> Post([FromBody] Login login)
    {
      var user = _context.Users.SingleOrDefault(u => u.Email == login.email && u.Password == login.Password);
      if (user is null)
      {
        return NotFound();
      }
      return Ok(GetResponse(user));
    }

    private LoginResponse GetResponse(User user)
    {
      // https://www.rafaelacosta.net/Blog/2019/5/20/json-web-token-seguridad-en-servicios-web-api-de-net-core
      // Create the Header
      var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"]));
      var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
      var header = new JwtHeader(signingCredentials);

      // Create the Claims
      var infoClaims = new[] {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim("name", user.Name),
                new Claim("username", user.Username),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            };

      // Create the POayLoad
      var payload = new JwtPayload(
              issuer: _configuration["JWT:Issuer"],
              audience: _configuration["JWT:Audience"],
              claims: infoClaims,
              notBefore: DateTime.UtcNow,
              // Expire in 24 hours.
              expires: DateTime.UtcNow.AddHours(24)
          );

      // Generate the Token
      var token = new JwtSecurityToken(header, payload);
      var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
      var bearerToken = string.Format("Bearer {0}", jwtSecurityTokenHandler.WriteToken(token));

      return new LoginResponse { Token = bearerToken, UserId = user.Id, Name = user.Name };
    }

  }
}