const axios = require('axios');

require('../css/formCompra.css');
require('../css/all.css');

document.getElementById('btnEnviar').addEventListener("click",function(){
    let strNombre = document.getElementById("txtNombre").value;
    let strApellido = document.getElementById("txtApellido").value;
    let strTelefono = document.getElementById("txtNumero").value;
    let strCorreo = document.getElementById("txtCorreo").value;
    let strDireccion = document.getElementById("txtDireccion").value;

    if(strDireccion == ""){
        strDireccion = "No especificado";
    }

    if(strNombre != "" && strApellido != "" && strCorreo != ""){
        if(!isNaN(strTelefono)){

            let datos = {
                //identificadores
                n: strNombre,
                a: strApellido,
                nu: strTelefono,
                c: strCorreo,
                d: strDireccion
            };

            axios.post('/api/registro', datos).catch(function(errorregistro){
               alert('Error en registro Base de datos' + errorregistro)
            })
    
            //cliente http de promesas
            //resultado final de operaciones asincronas
            axios.post('/api/contacto', datos).then(function(response){
                alert("Datos enviados.\nPronto seras contactado por MANGAJUMP");
            }).catch(function(error){
                alert('Oh no!, parece que no se ha podido enviar tu correo' + error)
            });

        }else{
            alert('Espera!, solo se pueden ingresar numeros en el campo de telefono')
        }
    }
});