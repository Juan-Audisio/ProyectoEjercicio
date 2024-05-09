using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProyectoClase1.Models;

namespace ProyectoClase1.Data;

public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<TipodeEjercicio> TipodeEjercicios { get; set; } = null!;

    public DbSet<EjercicioFisico> EjerciciosFisicos { get; set; } = null!;
}
