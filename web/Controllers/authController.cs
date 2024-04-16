using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using web.models;
using Microsoft.IdentityModel.Tokens; // For JWT token generation
using System.IdentityModel.Tokens.Jwt; // For JWT token generation
using System.Text; // For JWT token generation
using System.Security.Claims; // For JWT token generation
using System;

[Route("api/auth")]
[ApiController]
public class AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration) : ControllerBase
{
    private readonly UserManager<User> _userManager = userManager;
    private readonly SignInManager<User> _signInManager = signInManager;
    private readonly IConfiguration _configuration = configuration; // For accessing configuration settings

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
        }

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

    public void Register(LoginDto model)
    {

    }
}