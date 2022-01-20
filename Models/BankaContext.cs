using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class BankaContext : DbContext
    {
        public DbSet<Nalog> Nalozi { get; set; }
        public DbSet<Korisnik> Korisnici { get; set; }
        public DbSet<Racun> Racuni { get; set; }
        public DbSet<Kartica> Kartice { get; set; }
        public DbSet<Transakcija> Transakcija { get; set; }

        public BankaContext(DbContextOptions options) : base(options)
        {
            
        }
    }
}