using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BIMManager.Models.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using BIMManager.API.Services;
using BIMManager.API.Helpers;

namespace BIMManager.API.Controllers
{
    [Route("api/Auth")]
    public class AuthController : Controller
    {

        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly JwtService _jwtService;

        public AuthController(UserManager<IdentityUser> userManager,
                              SignInManager<IdentityUser> signInManager,
                              IConfiguration configuration,
                              JwtService jwtService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _jwtService = jwtService;
        }

        [HttpPost("Login", Name = "Login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel loginRequest)
        {
            // check validity of request
            if (loginRequest.Email == "" || loginRequest.Email == null)
            {
                return BadRequest(new
                {
                    status = false,
                    message = "Email cannot be empty."
                });
            }
            if (!Validator.IsEmailValid(loginRequest.Email))
            {
                return BadRequest(new
                {
                    status = false,
                    message = "Email is not valid."
                });
            }
            if (loginRequest.Password == "" || loginRequest.Password == null) {
                return BadRequest(new {
                    status = false,
                    message = "Password cannot be empty."
                });
            }

            // check if user exists in db
            Microsoft.AspNetCore.Identity.SignInResult result = await _signInManager.PasswordSignInAsync(loginRequest.Email, loginRequest.Password, false, false);

            if (result.Succeeded) {

                IdentityUser appUser = _userManager.Users.SingleOrDefault(r => r.Email == loginRequest.Email);
                return Ok(new {
                    status = true,
                    token = _jwtService.GenerateJwtToken(loginRequest.Email, appUser)
                });
            }

            return BadRequest(new {
               status = false,
               message = "Wrong email or password."
            });
        }

        [HttpPost("Register", Name = "Register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel registerViewModel)
        {
            if (registerViewModel.Email == "" || registerViewModel.Email == null)
            {
                return BadRequest(new
                {
                    status = false,
                    message = "Email cannot be empty."
                });
            }
            if (!Validator.IsEmailValid(registerViewModel.Email))
            {
                return BadRequest(new
                {
                    status = false,
                    message = "Email must be valid."
                });
            }
            // check if that email already exists in db
            IdentityUser user = _userManager.Users.SingleOrDefault(usr => usr.Email == registerViewModel.Email);
            if (user != null)
            {
                return BadRequest(new
                {
                    status = true,
                    message = "User with this email already exists."
                });
            }
            // check passwords
            if (registerViewModel.Password != registerViewModel.ConfirmPassword)
            {
                return BadRequest(new
                {
                    status = false,
                    message = "Provided passwords must match."
                });
            }

            // create the user and return the token so the user can be logged in
            IdentityUser userToCreate = new IdentityUser
            {
                UserName = registerViewModel.Email,
                Email = registerViewModel.Email
            };
            IdentityResult result = await _userManager.CreateAsync(userToCreate, registerViewModel.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(userToCreate, false);
                return Ok(new
                {
                    status = true,
                    token = _jwtService.GenerateJwtToken(registerViewModel.Email, userToCreate)
                });
            }
            string errorMessage = "";
            foreach (IdentityError error in result.Errors)
            {
                errorMessage += error.Description + Environment.NewLine;
            }
            return BadRequest(new
            {
                status = false,
                message = errorMessage
            });
        }
    }
}