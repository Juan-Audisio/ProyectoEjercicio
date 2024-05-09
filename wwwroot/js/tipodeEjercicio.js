window.onload = ListadoTipoDeEjercicios(); 

function ListadoTipoDeEjercicios(){

    $.ajax(
        {
            url: '../../TipodeEjercicio/ListadoTipoDeEjercicio',
            data: { },
            type: 'POST',
            dataType:'json',

            success: function (tipoDeEjercisios)
            {

                      $("#modalTipodeEjercicios").modal("hide");



                let contenidoTabla = ``;
            


                $.each(tipoDeEjercisios, function (index, tipoDeEjercicio) 
                {  
                    
                    contenidoTabla += `
                    <tr>
                        <td>${tipoDeEjercicio.nombre}</td>
                        <td class="text-center">
                        <button type="button" class="btn btn-success" onclick="abrirModalEditarRegistro(${tipoDeEjercicio.tipodeEjercicioId})" >Editar</button>
                        </td>
                        <td class="text-center">
                        <button type="button" class="btn btn-danger" onclick="EliminarRegistro(${tipoDeEjercicio.tipodeEjercicioId})">Eliminar</button>
                        </td>
                    </tr>
                 `;
                });
                document.getElementById("tbody-tipoejercicios").innerHTML = contenidoTabla;

            },
    
            // código a ejecutar si la petición falla;
            // son pasados como argumentos a la función
            // el objeto de la petición en crudo y código de estatus de la petición
            error: function (xhr, status) {
                alert('Disculpe, existió un problema al deshabilitar');
                
            
            }


        }
    )
}

function nuevoRegistro(){
    $("#modalTituloEjercicio").text("Nuevo Tipo de Ejercicio");
}


function abrirModalEditarRegistro(id){
    $.ajax({
        url: '../../TipodeEjercicio/ListadoTipodeEjercicio',
        data: { TipodeEjercicioId : id },
        type: 'POST',
        dataType: 'json',
        success: function (tipodeEjercicios){
            let tipodeEjercicio = tipodeEjercicios[0];

            document.getElementById("id").value = id;
            $("#modalTituloEjercicio").text("Editar Tipo de Ejercicio");
            document.getElementById("nombre").value = tipodeEjercicio.nombre;
            $("#modalTipodeEjercicios").modal("show");

        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al consultar el registro para ser modificado.');
        }
    
    })
}

function guardarRegistro(){
    var tipodeEjercicioId = document.getElementById("id").value ;
    var nombre = document.getElementById("nombre").value ;


    $.ajax({
        url: '../../TipodeEjercicio/guardarTipoEjercicio',
        data: { nombre : nombre, TipodeEjercicioId : tipodeEjercicioId },
        type: 'POST',
        dataType: 'json',
        success: function (resultado){

            if(resultado != ""){
                alert(resultado);
            }

            ListadoTipoDeEjercicios()

        },
        error: function(xhr, status){
            alert('Ocurrió un error a la hora de guardar el tipo de actividad.')
        }
    })
}


function limpiarModa(){
    document.getElementById("").value = 0;
    document.getElementById("nombre").value = '';
}



function EliminarRegistro(tipodeEjercicioId){
    console.log("tipo ejercico")
    $.ajax({
        // la URL para la petición
        url: '../../TipodeEjercicio/eliminarTipoEjercicio',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { TipodeEjercicioId: tipodeEjercicioId},
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) {           
            ListadoTipoDeEjercicios();
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al eliminar el registro.');
        }
    });    

}



