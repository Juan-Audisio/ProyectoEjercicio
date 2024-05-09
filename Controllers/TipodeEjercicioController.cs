using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProyectoClase1.Data;
using ProyectoClase1.Models;

namespace ProyectoClase1.Controllers;


// [Authorize]
public class TipodeEjercicioController : Controller
{
    private ApplicationDbContext _context;

    //contructor 
    public TipodeEjercicioController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        return View();
    }

    public JsonResult ListadoTipodeEjercicio(int? TipodeEjercicioId) {

        var tipodeEjercicio = _context.TipodeEjercicios.ToList();

        if (TipodeEjercicioId != null) {
            tipodeEjercicio = tipodeEjercicio.Where(t => t.TipodeEjercicioId == TipodeEjercicioId).ToList(); 
        }


      return Json(tipodeEjercicio);
    }



public JsonResult guardarTipoEjercicio(int tipodeEjercicioId, string nombre)
    {
        string resultado = "";

        if(!String.IsNullOrEmpty(nombre)){

            nombre = nombre.ToUpper();

            if (tipodeEjercicioId == 0){
                var existeNombre = _context.TipodeEjercicios.Where(t => t.Nombre == nombre).Count();

                     if(existeNombre == 0)
                     {
                        var tipoEjercicio = new TipodeEjercicio 
                        { 
                            Nombre = nombre.ToUpper() 
                            };

                        _context.Add(tipoEjercicio);
                         _context.SaveChanges();
                    }
                    else
                    {
                        resultado = "YA EXISTE UN REGISTRO CON LA MISMA DESCRIPCIÓN";
                    }
                    }
                    else
                    {
                         var tipoEjercicioEditar = _context.TipodeEjercicios.Where(t => t.TipodeEjercicioId == tipodeEjercicioId).SingleOrDefault();
                        if(tipoEjercicioEditar != null)
                        {
                            var existetipoejerciciooo = _context.TipodeEjercicios.Where(t => t.Nombre == nombre &&  t.TipodeEjercicioId ! == tipodeEjercicioId).Count();
                            if(existetipoejerciciooo == 0)
                            {
                                tipoEjercicioEditar.Nombre = nombre.ToUpper();
                             _context.SaveChanges();
                            }
                            else {
                                resultado = "ya existe.";
                            }
                             //QUIERE DECIR QUE EL ELEMENTO EXISTE Y ES CORRECTO ENTONCES CONTINUAMOS CON EL EDITAR
                            
                         }
                            else
                            {
                                resultado = "DEBE INGRESAR UNA DESCRIPCIÓN.";
                            }
                    }
                 }
                            
               return Json(resultado);
          }

         public JsonResult eliminarTipoEjercicio(int TipodeEjercicioId)
     {
         var tipoEjercicio = _context.TipodeEjercicios.Find(TipodeEjercicioId);
         _context.Remove(tipoEjercicio);
         _context.SaveChanges();

         return Json(true);
     }

     }

    






