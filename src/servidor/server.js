var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('../../webpack.config');
const bodyParser = require('../../node_modules/body-parser/');

const dbConnection = require('./dbConnection')
const Email = require('./email');
const { getMaxListeners, send } = require('process');


var app = express();
app.set('port',(process.env.PORT) || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/static',express.static('dist'));
app.use(webpackDevMiddleware(webpack(webpackConfig)));


//instancia de conexion DB
const conexBD = new dbConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "extraclase2"
});

//instancia de conexion SMTP
const conexMail = new Email({
    "host":"SERVIDOR SMTP",
    "port":"SU PUERTO",
    "secure":true,
    "auth": {
        "type":"login",
        "user":"SU CORREO",
        "pass":"SU PASSWORD"
    }
});


//para ordenar las cosas de la pagina
app.route('/', function(request,response,next){
    response.render(path.join(__dirname + 'index.html'))
});

app.route('/catalogo.html', function(request,response,next){
    response.render(path.join(__dirname + 'catalogo.html'))
});

app.route('/compra.html', function(request,response,next){
    response.render(path.join(__dirname + 'compra.html'))
});

app.route('/informacion.html', function(request,response,next){
    response.render(path.join(__dirname + 'informacion.html'))
});

app.route('/formCompra.html', function(request,response,next){
    response.render(path.join(__dirname + 'formCompra.html'))
});

app.post('/api/contacto',function(request,response,next){
    let email = {
        from: "ucuenta.ula@gmail.com",
        to: "kevinjosuearias@gmail.com",
        subject:"Solicitud de compra",
        html:`
        <div>
        <p>Proceso de solicitud de compra por parte de:</p>
        <p>Nombre: ${request.body.n}</p>  
        <p>Apellido: ${request.body.a}</p>
        <p>Direccion de facturacion: ${request.body.c}</p>
        <p>Telefono: ${request.body.nu}</p>
        <p>Direccion de envio: ${request.body.d}</p>
        </div>
        `
    };
    conexMail.enviaCorreo(email);
    response.send("ok");
})

app.post('/api/registro',function(request,response,next){
    conexBD.insert(request.body.n,request.body.a,request.body.nu,request.body.c,request.body.d);
})


app.listen(()=>{
    console.log(`Servidor corriendo en puerto: localhost:${app.get('port')}`);
})
