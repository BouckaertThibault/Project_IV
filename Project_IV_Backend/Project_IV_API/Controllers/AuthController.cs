using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Project_IV_API.Models;
using Project_IV_API.Models.DTOs;
using Project_IV_API.Services;
using Project_IV_Models;
using Project_IV_Models.Models;
using Project_IV_Models.Repositories.Interfaces;

namespace Project_IV_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private Project_IV_APIContext _context;
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _usermanager;
        private readonly IPasswordHasher<User> _passwordHasher;
        private ILogger<AuthController> _logger;
        private SignInManager<User> _signInManager;

        public AuthController(Project_IV_APIContext context, SignInManager<User> signInMgr, ILogger<AuthController> logger,
            IConfiguration configuration, UserManager<User> usermanager, IPasswordHasher<User> passwordHasher)
        {
            _signInManager = signInMgr;
            _context = context;
            _usermanager = usermanager;
            _passwordHasher = passwordHasher;
            _configuration = configuration;
            _logger = logger;
        }


        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] IdentityModel identityModel)
        {
            //LoginViewModel met (Required) UserName en Password aanbrengen.
            if (!ModelState.IsValid)
            {
                return BadRequest("Unvalid data");
            }

            try
            {
                //geen persistence, geen lockout -> via false, false 
                var result = await _signInManager.PasswordSignInAsync(identityModel.UserName,
                                                                    identityModel.Password, false, false);
                if (result.Succeeded)
                {
                    var jwtsvc = new JWTServices<User>(_configuration, _logger,
                        _usermanager, _passwordHasher);
                    var token = await jwtsvc.GenerateJwtToken(identityModel);
                    return Ok(token);
                    //return Ok("Welcome " + identityModel.UserName);
                }
                ModelState.AddModelError("", "Username or password not found");
                return BadRequest("Failed to login"); //zo algemeen mogelijke reactive. Vertelt niet dat het pwd niet juist is.
            }
            catch (Exception exc)
            {
                _logger.LogError($"Exception thrown when logging in: {exc}");
            }
            return BadRequest("Failed to login"); //zo weinig mogelijk (hacker) info }
        }

        [HttpPost("token")]
        [AllowAnonymous]
        public async Task<IActionResult> GenerateJwtToken([FromBody]IdentityModel identityModel)
        {
            try
            {
                var jwtsvc = new JWTServices<User>(_configuration, _logger,
                _usermanager, _passwordHasher);
                var token = await jwtsvc.GenerateJwtToken(identityModel);
                return Ok(token);
            }
            catch (Exception exc)
            {
                _logger.LogError($"Exception thrown when creating JWT: {exc}");
            }
            //Bij niet succesvolle authenticatie wordt een Badrequest (=zo weinig mogelijke info) teruggeven.
            return BadRequest("Failed to generate JWT token");
        }


    }
}
