using Microsoft.EntityFrameworkCore;
using Formaapp.Models;

namespace Formaapp.Data
{
    public class MiDbContext : DbContext
    {
        public MiDbContext(DbContextOptions<MiDbContext> options) : base(options) { }

        public DbSet<Cabecera> Cabeceras { get; set; }
        public DbSet<Detalle> Detalles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cabecera>()
                .HasMany(c => c.Detalles)
                .WithOne(d => d.Cabecera)
                .HasForeignKey(d => d.CabeceraId);
        }
    }
}
