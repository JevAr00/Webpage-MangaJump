const mysql = require("mysql");

class dbConnection {
    constructor(oConfig) {
        this.oConfig = oConfig;
    }

    insert(nombre, apellido, telefono, correo, direccion) {
        var con = mysql.createConnection(this.oConfig);
        con.connect(function (error) {
            try {
                if(error){
                    console.log('no se puede establecer conexion a la BD' + error);
                }else{
                    console.log('Tamo mototeando');
                    con.query(`insert into compras(nombre,apellidos,telefono,correo,direccion) values('${nombre}','${apellido}',${telefono},'${correo}','${direccion}');`, function(error,res,campo){
                        if(error){
                            console.log("Error al insertar " + error);
                        }else{
                            console.log("agregado en tabla")
                        }
                    });
                }
            } catch(x) {
                console.log('dbConennection.insert.connect ERROR' + x )
            }
        })
    }
}
module.exports = dbConnection;