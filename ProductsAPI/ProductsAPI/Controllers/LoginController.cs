using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductsAPI.ApiView;
using ProductsAPI.Repositories;
using ProductsAPI.Models;
using Microsoft.AspNetCore.Authorization;

namespace ProductsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IJwtAuthenticationManager _jwtAuthenticationManager;
        private readonly IPersonRepository _personRepository;
        public LoginController(IJwtAuthenticationManager jwtAuthenticationManager, IPersonRepository personRepository)
        {
            _jwtAuthenticationManager = jwtAuthenticationManager;
            _personRepository = personRepository;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] UserCred userCred)
        {
            Person person = await _personRepository.Get(userCred.Username, userCred.Password);
            if (person == null)
            {
                return Unauthorized();
            }
            var token = _jwtAuthenticationManager.Authenticate(userCred.Username, userCred.Password, person.Role);
            if (token == null)
                return Unauthorized();
            return Ok(new { jwt= token, expiresIn = 1*24*60*60,username = person.Username, role = person.Role});
        }
    }
}
