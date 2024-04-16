using Microsoft.EntityFrameworkCore;

namespace web.models;

public class DBcontext_user : DbContext
{
    public DBcontext_user(DbContextOptions<DBcontext_user> options) : base(options)
    {
    }
        public int UserId { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; } // Assuming password will be stored as a byte array
        public byte[] Salt { get; set; } // Salt for password hashing
        public bool IsAdmin { get; set; }

}
