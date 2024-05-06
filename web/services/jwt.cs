using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
namespace web.service;
public class JwtService
{
    private readonly string _secretKey;

    public JwtService(string secretKey)
    {
        _secretKey = secretKey;
    }

    public bool VerifyToken(string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Convert.FromBase64String(_secretKey);

            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true, 
                ValidateAudience = true, 
                ClockSkew = TimeSpan.Zero // Adjust the tolerance for expiration validation
            }, out _);

            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine("Token validation failed: " + ex.Message);
            return false;
        }
    }
}
