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
        private SignInManager<User> _signInManager;
        private readonly IMapper _mapper;
        private readonly RoleManager<IdentityRole> _roleManager;
        private ILogger<AuthController> _logger;
        private Project_IV_APIContext _context;
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        private readonly IUserRepo _userRepo;
        private readonly IPasswordHasher<User> _hasher;

        public AuthController(Project_IV_APIContext context, SignInManager<User> signInManager, ILogger<AuthController> logger, IConfiguration configuration, UserManager<User> userManager, IPasswordHasher<User> hasher, RoleManager<IdentityRole> roleManager, IUserRepo userRepo, IMapper mapper)
        {
            this._context = context;
            this._logger = logger;
            this._configuration = configuration;
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._roleManager = roleManager;
            this._hasher = hasher;
            this._userRepo = userRepo;
            this._mapper = mapper;
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
                        _userManager, _hasher);
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
                _userManager, _hasher);
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


        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
        {
            if (registerModel == null)
                return BadRequest((IdentityResult.Failed(new IdentityError
                {
                    Code = "Empty",
                    Description = "Please fill in all required fields"
                })));


            if (!ModelState.IsValid)
                return BadRequest((IdentityResult.Failed(new IdentityError
                {
                    Code = "InvalidOrCompleteData",
                    Description = "The data you entered is incomplete or not valid"
                })));

            if (string.Equals(registerModel.UserName, registerModel.Password, StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest((IdentityResult.Failed(new IdentityError
                {
                    Code = "UsernameAsPassword",
                    Description = "You can not use your username as password"
                })));
            }

            var user = await _userManager.FindByNameAsync(registerModel.UserName);

            // Might pose a security issue, balancing between usabiliity and security
            // Choice was made to leave this as is because you can query for player names 
            // and statistics anyway
            if (user != null)
            {
                return StatusCode(409, (IdentityResult.Failed(new IdentityError
                {
                    Code = "UsernameTaken",
                    Description = "Username is already in use"
                })));
            }

            user = await _userManager.FindByEmailAsync(registerModel.Email);

            if (user != null)
            {
                return StatusCode(409, (IdentityResult.Failed(new IdentityError
                {
                    Code = "EmailTaken",
                    Description = "Email is already in use"
                })));
            }

            if (String.IsNullOrWhiteSpace(registerModel.Password))
            {
                return BadRequest((IdentityResult.Failed(new IdentityError
                {
                    Code = "BadPassword",
                    Description = "Password cannot be empty"
                })));
            }

            if (registerModel.Password.Length < 8)
            {
                return BadRequest((IdentityResult.Failed(new IdentityError
                {
                    Code = "ShortPassword",
                    Description = "Password needs to be at least 8 characters"
                })));
            }

            if (!registerModel.Password.Any(char.IsUpper))
            {
                return BadRequest((IdentityResult.Failed(new IdentityError
                {
                    Code = "PasswordValidateUppercase",
                    Description = "Password needs to have uppercase characters"
                })));
            }

            if (!registerModel.Password.Any(char.IsLower))
            {
                return BadRequest((IdentityResult.Failed(new IdentityError
                {
                    Code = "PasswordValidateLowercase",
                    Description = "Password needs to have lowercase characters"
                })));
            }

            if (!registerModel.Password.Any(char.IsDigit))
            {
                return BadRequest((IdentityResult.Failed(new IdentityError
                {
                    Code = "PasswordValidateNumerical",
                    Description = "Password needs to contain numbers"
                })));
            }

            if (user == null)
            {
                if (!(await _roleManager.RoleExistsAsync("Player")))
                {
                    var role = new IdentityRole("Player");
                    await _roleManager.CreateAsync(role);
                }

                user = new User()
                {
                    UserName = registerModel.UserName,
                    Email = registerModel.Email,
                };

                var userResult = await _userManager.CreateAsync(user, registerModel.Password);
                var roleResult = await _userManager.AddToRoleAsync(user, "Player");

                if (!userResult.Succeeded || !roleResult.Succeeded)
                {
                    _logger.LogError($"Failed to build user and roles.");
                    throw new InvalidOperationException("Failed to build user and roles.");
                }
            }
            var userModel = _mapper.Map<Usermodel>(user);
            return Ok(userModel);
        }


    }
}
