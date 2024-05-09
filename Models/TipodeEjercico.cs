using System;
using System.ComponentModel.DataAnnotations;

namespace ProyectoClase1.Models
{
    public class TipodeEjercicio
    {
        [Key]
        public int TipodeEjercicioId { get; set; }
        public string? Nombre { get; set; }
        public bool Eliminado { get; set; }

        public virtual ICollection<EjercicioFisico> EjerciciosFisicos { get; set; } 
    }
}
