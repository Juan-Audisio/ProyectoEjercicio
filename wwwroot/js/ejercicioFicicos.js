window.onload = ListadoEjercicioFicico();

function ListadoEjercicioFicico() 
{
    $.ajax(
        {
            url: '../../EjerciciosFisicos/ListadoEjercicioFisico',
            data: {},
            type: 'POST',
            dataType: 'Json',

            success: function(ejerciciosFisicos)
            {
             let contenidoTablaListadoEjercicio = '';
        
              $.each(ejerciciosFisicos, function(index, ejercicioFisico)
              {
                 contenidoTablaListadoEjercicio +=
                 `
                 <tr>
                    
                 <td>${ (ejercicioFisico.tipodeEjercicioNombre)}</td>
                    <td>${ (ejercicioFisico.fechaInicioString)}</td>
                 <td>${ (ejercicioFisico.fechaFinString)}</td>
           
                    <td>${ejercicioFisico.estadoInicialNombre}</td>
                   <td>${ejercicioFisico.estadoFinalNombre}</td>
                 <td>${ejercicioFisico.observaciones  }</td>
                <td>
                   <button type="button" class="btn btn-success" onclick="AbrirModalEditar(${ejercicioFisico.ejercicioFicicoId})">Editar</button>
                  <button type="button" class="btn btn-danger" onclick="EliminarEjercicio(${ejercicioFisico.ejercicioFicicoId})">Eliminar</button>
                 </td>
            </tr>
  
                 `;

              });
              document.getElementById("tbody-listadoEjercicioFisico").innerHTML = contenidoTablaListadoEjercicio;
              $("#ejercicioFicico").modal("hide");
              
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

function AbrirModalEditar(ejercicioFisicoID){
    $.ajax({
        url: '../../EjerciciosFisicos/ListadoEjercicioFisico',
        data: {id:ejercicioFisicoID},
        type: 'POST',
        dataType: 'Json',
        success: function(ejerciciosFisicosMostrar){
            var ejercicioEditar = ejerciciosFisicosMostrar[0];
            

            document.getElementById("EjercicioFisicoId").value = ejercicioFisicoID;
            $("#tituloModal").text("Editar ejercicio");
            console.log(document.getElementById("EjercicioFisicoId").value)
            console.log(ejercicioFisicoID)
            document.getElementById("FechaInicio").value = ejercicioEditar.inicio;
            document.getElementById("Fechafin").value = ejercicioEditar.fin;
            document.getElementById("TipodeEjercicioId").value = ejercicioEditar.tipodeEjercicioId;
            document.getElementById("EstadoEmocionalInicio").value = ejercicioEditar.estadoEmocionalInicio;
            document.getElementById("EstadoEmocionalFin").value = ejercicioEditar.estadoEmocionalFin;
            document.getElementById("Observaciones").value = ejercicioEditar.observaciones;


            $("#ejercicioFicico").modal("show");
        }
    })
}

function EliminarEjercicio(ejercicioFisicoID){
    $.ajax({
        url: '../../EjerciciosFisicos/DeleteEJ',
        data: {id:ejercicioFisicoID},
        type: 'DELETE',
        dataType: 'Json',
        success: function(resultado){
            if(resultado == true){

                ListadoEjercicioFicico();
            }
        },
        error: function(hxr, status){
            alert("error al eliminar el ejercicio")
        }
    })
}

