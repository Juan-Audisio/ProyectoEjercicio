window.onload = ListadoEjercicioFicico();

function ListadoEjercicioFicico() 
{
    // $("#ejercicioFicico").modal("hide");
    $.ajax(
        {
            url: '../../EjerciciosFisicos/ListadoEjercicioFisico',
            data: {},
            type: 'POST',
            dataType: 'Json',

            success: function(ejerciciosFisicos)
            {
             let contenidoTablaListadoEjercicio = '';
             console.log("Correcto")
              $.each(ejerciciosFisicos, function(index, ejerciciosFisicos)
              {
                 contenidoTablaListadoEjercicio +=
                 `
                 <tr>
                    
                 <td>${ (ejerciciosFisicos.tipodeEjercicioNombre)}</td>
                    <td>${ (ejerciciosFisicos.fechaInicioString)}</td>
                 <td>${ (ejerciciosFisicos.fechaFinString)}</td>
           
                    <td>${ejerciciosFisicos.estadoInicialNombre}</td>
                   <td>${ejerciciosFisicos.estadoFinalNombre}</td>
                 <td>${ejerciciosFisicos.observaciones  }</td>
                <td>
                   <button type="button" class="btn btn-success" onclick="AbrirModalEditar(${ejerciciosFisicos.ejercicioFisicoID})">Editar</button>
                  <button type="button" class="btn btn-danger" onclick="EliminarRegistro(${ejerciciosFisicos.ejercicioFisicoID})">Eliminar</button>
                 </td>
            </tr>
  
                 `;
              });
              document.getElementById("tbody-listadoEjercicioFisico").innerHTML = contenidoTablaListadoEjercicio;
            },
            error: function(xhr, status)
            {
             alert('Disculpe, tenemos un problema en insatantes sera reparado')   
            }
        }
    )
    
  
   
}

function GuardarEjercicioFisico() {
    var ejercicioFisicoID = document.getElementById("EjercicioFisicoId").value;
    var tipodeEjercicioId = document.getElementById("TipodeEjercicioId").value;
    var inicio = document.getElementById("FechaInicio").value;
    var fin = document.getElementById("Fechafin").value;
    var estadoEmocionalInicio = document.getElementById("EstadoEmocionalInicio").value;
    var estadoEmocionalFin = document.getElementById("EstadoEmocionalFin").value;
    var observaciones = document.getElementById("Observaciones").value

    console.log(ejercicioFisicoID, tipodeEjercicioId, inicio, fin, estadoEmocionalInicio, estadoEmocionalFin, observaciones)
    
    $.ajax({
        url: "../../EjerciciosFisicos/SaveEj",
        data: {ejercicioFisicoID, tipodeEjercicioId, inicio, fin, estadoEmocionalInicio, estadoEmocionalFin, observaciones},
        type: 'POST',
        dataType: 'json',

        success: function(resultado){
            if(resultado == true){

                ListadoEjercicioFicico();
            }
        },

        error: function(hxr, status){
            alert("error al guardar ejercicio")
        }
    })
}
