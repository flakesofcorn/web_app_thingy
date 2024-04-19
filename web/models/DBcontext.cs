using Microsoft.EntityFrameworkCore;

namespace web.models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<ApplicationUser> Users { get; set; }
    }

    public class ApplicationUser
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHashWithSalt { get; set; } // Combined hash and salt
        public bool IsAdmin { get; set; }
    }
}
