using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using MySql.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto model)
    {
        var user = await _userService.AuthenticateAsync(model.Username, model.Password);
        if (user == null)
            return BadRequest(new { message = "Username or password is incorrect" });

        // Generate JWT token and return it to the client
        var token = GenerateJwtToken(user);
        return Ok(new { token });
    }
}
