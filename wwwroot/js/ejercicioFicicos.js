window.onload = ListadoEjercicioFicico();

function ListadoEjercicioFicico() 
{
    console.log("Llama funcion...")
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
