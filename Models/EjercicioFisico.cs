using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ProyectoClase1.Models;

namespace ProyectoClase1.Models
{
    public class EjercicioFisico
    {
        [Key]
        public int EjercicioFisicoId { get; set; }
    
        public int TipodeEjercicioId { get; set; }
        public DateTime Inicio { get; set; }
        public DateTime Fin { get; set; }

        public EstadoEmocional EstadoEmocionalInicio { get; set; }
        public EstadoEmocional EstadoEmocionalFin { get; set;}
        public string? Observaciones {get; set;}

        public virtual TipodeEjercicio TipodeEjercicios { get; set; }
    }

     public class VistaEjercicioFicico
     {
          public int EjercicioFicicoId { get; set; }
          public int TipodeEjercicioId { get; set; }
          public string TipodeEjercicioNombre { get; set; }
          public string FechaInicioString { get; set; }
             public string FechaFinString { get; set; }
           public string? Observaciones {get; set;}
           public string EstadoInicialNombre {get; set;}
           public string EstadoFinalNombre {get; set;}
     }

    public enum EstadoEmocional{
        Feliz = 1,
        Triste,
        Enojado,
        Ansioso,
        Estresado,
        Relajado,
        Aburrido,
        Emocionado,
        Agobiado,
        Confundido,
        Optimista,
        Pesimista,
        Motivado,
        Cansado,
        Eufórico,
        Agitado,
        Satisfecho,
        Desanimado
    } 
}