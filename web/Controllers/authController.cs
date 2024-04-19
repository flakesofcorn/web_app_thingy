using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using web.models;
using Microsoft.IdentityModel.Tokens; // For JWT token generation
using System.IdentityModel.Tokens.Jwt; // For JWT token generation
using System.Text; // For JWT token generation
using System.Security.Claims; // For JWT token generation
using System;
using web.service;

[Route("web/auth")]
[ApiController]
public class AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration, JwtService jwtService) : ControllerBase
{
    private readonly UserManager<User> _userManager = userManager;
    private readonly SignInManager<User> _signInManager = signInManager;
    private readonly IConfiguration _configuration = configuration; // For accessing configuration settings
    private readonly JwtService _jwtService;


    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto model)
    {
        var user = await _userManager.FindByNameAsync(model.Username);
        if (user == null)
            return NotFound("User not found");

        var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
        if (result.Succeeded)
        {
            // Generate JWT token
            var token = GenerateJwtToken(user);

            return Ok(new { token });
        } else 
        

        return Unauthorized("Invalid username or password");
    }


    // Token generation method
    private string GenerateJwtToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Secret"]));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            // Add more claims as needed
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["JwtSettings:Issuer"],
            audience: _configuration["JwtSettings:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(Convert.ToDouble(_configuration["JwtSettings:ExpirationHours"])),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    [HttpPost("Register")]

    public async Task<IActionResult> Register(RegisterViewModel model)
    {
        
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Check if the username is already taken
        var existingUser = await _userManager.FindByNameAsync(model.UserName);
        if (existingUser != null)
        {
            return BadRequest("Username is already taken");
        }

        // Create a new User object
        var newUser = new User
        {
            Username = model.UserName,
            Email = model.Email,
            // Other properties as needed
        };

        // Create the user in the database
        var result = await _userManager.CreateAsync(newUser, model.Password);
        if (!result.Succeeded)
        {
            // Registration failed
            return BadRequest("Failed to register user");
        }

        // Registration successful
        return Ok("User registered successfully");
    }


    

    [HttpPost("verify")]
    public IActionResult VerifyToken([FromBody] string token)
    {
        if (_jwtService.VerifyToken(token))
        {
            return Ok("Token is valid");
        }
        else
        {
            return BadRequest("Token is invalid");
        }


    }
}