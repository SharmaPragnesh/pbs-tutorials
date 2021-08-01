using ERP.Entities;
using ERP.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ERPWebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationSettings _appSettings;
        private readonly IAccountRepository _repository;

        public AccountController(IAccountRepository repository, IOptions<ApplicationSettings> appSettings)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _appSettings = appSettings.Value;
        }

        [HttpGet]
        public async Task<Resources> GetAsync(string email)
        {
            var user = await _repository.GetUserDetails(email);
            if (user != null)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.JWT_Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserId",user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(Convert.ToInt32(_appSettings.Timeout)),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                user.Token = tokenHandler.WriteToken(securityToken);
            }
            return user;
        }
    }
}
