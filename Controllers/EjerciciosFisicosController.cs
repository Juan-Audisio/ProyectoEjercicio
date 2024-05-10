using ProyectoClase1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using ProyectoClase1.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace ProyectoClase1.Controllers;

[Authorize]
public class EjerciciosFisicosController: Controller {
    private ApplicationDbContext _context;

    public EjerciciosFisicosController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        var selectListItem = new List<SelectListItem>()
        {
            new SelectListItem { Value = "0", Text="[seleccionar]"}
        };

        var enumerables = Enum.GetValues(typeof(EstadoEmocional)).Cast<EstadoEmocional>();

        selectListItem.AddRange(enumerables.Select(e => new SelectListItem
        {
            Value = e.GetHashCode().ToString(),
            Text = e.ToString().ToUpper()
        } 
        ));

        ViewBag.EstadoEmocionalInicio = selectListItem.OrderBy(t => t.Text).ToList();
        ViewBag.EstadoEmocionalFin = selectListItem.OrderBy(t => t.Text).ToList();

        var listaTipoEjercicio = _context.TipodeEjercicios.ToList();
        
        listaTipoEjercicio.Add(new TipodeEjercicio 
        {
            TipodeEjercicioId = 0,
            Nombre = "[SELECCIONE]"
        });

        ViewBag.TipodeEjercicioId = new SelectList(listaTipoEjercicio.OrderBy(t => t.Nombre), "TipodeEjercicioId", "Nombre");


        return View();
    }

    public JsonResult ListadoEjercicioFisico(int? id) {
        
        List<VistaEjercicioFicico> ejerciciosFisicosMostrar = new List<VistaEjercicioFicico>();

        var ejerciciosFisicos = _context.EjerciciosFisicos.Include(p => p.TipodeEjercicios).ToList();

        if (id != null) {
             ejerciciosFisicos = ejerciciosFisicos.Where(t => t.EjercicioFisicoId == id).ToList(); 
        }

        var tiposEjercicios = _context.TipodeEjercicios.ToList();

        foreach (var ejercicioFisico in ejerciciosFisicos)
        {
                var tipodeEjercicio = _context.TipodeEjercicios.Where(t => t.TipodeEjercicioId == ejercicioFisico.TipodeEjercicioId).Single();

            var ejercicioFisicoMostrar = new VistaEjercicioFicico{
               
                EjercicioFicicoId = ejercicioFisico.EjercicioFisicoId,
                TipodeEjercicioId = ejercicioFisico.TipodeEjercicioId,
                TipodeEjercicioNombre = tipodeEjercicio.Nombre,
                FechaInicioString = ejercicioFisico.Inicio.ToString("dd/MM/yyyy HH:mm"),
                FechaFinString = ejercicioFisico.Fin.ToString("dd/MM/yyyy HH:mm"),
                Observaciones = ejercicioFisico.Observaciones,
                EstadoInicialNombre = ejercicioFisico.EstadoEmocionalInicio.ToString(),
                EstadoFinalNombre = ejercicioFisico.EstadoEmocionalFin.ToString(),
                Fin = ejercicioFisico.Fin,
                Inicio = ejercicioFisico.Inicio,
                EstadoEmocionalInicio = ejercicioFisico.EstadoEmocionalInicio,
                EstadoEmocionalFin = ejercicioFisico.EstadoEmocionalFin,
            };
            
            ejerciciosFisicosMostrar.Add(ejercicioFisicoMostrar);
        }

      return Json(ejerciciosFisicosMostrar);
    }



    [HttpPost]
    public JsonResult SaveEj(int ejercicioFisicoId, int tipodeEjercicioId, DateTime inicio, DateTime fin, EstadoEmocional estadoEmocionalInicio, EstadoEmocional estadoEmocionalFin, string observaciones ){

        if(ejercicioFisicoId == 0)
        {
            var nuevoEjercicio = new EjercicioFisico 
            {
              TipodeEjercicioId = tipodeEjercicioId,
              Inicio = inicio,
              Fin = fin,
              EstadoEmocionalInicio = (EstadoEmocional)estadoEmocionalInicio,
              EstadoEmocionalFin = (EstadoEmocional)estadoEmocionalFin,
              Observaciones = observaciones
            }; 

            _context.EjerciciosFisicos.Add(nuevoEjercicio);
            _context.SaveChanges();
        }

        else{
            var ejercicioaeditar = _context.EjerciciosFisicos.Where(e => e.EjercicioFisicoId == ejercicioFisicoId).SingleOrDefault();

            ejercicioaeditar.TipodeEjercicioId = tipodeEjercicioId;
            ejercicioaeditar.Inicio = inicio;
            ejercicioaeditar.Fin = fin;
            ejercicioaeditar.EstadoEmocionalInicio = estadoEmocionalInicio;
            ejercicioaeditar.EstadoEmocionalFin = estadoEmocionalFin;
            ejercicioaeditar.Observaciones = observaciones;

            _context.SaveChanges();
        }


    
      return Json(true); 
    }

}