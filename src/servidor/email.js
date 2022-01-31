const nodeMailer = require('nodemailer')

class Email{
    constructor(oConfig){
        this.createTransport = nodeMailer.createTransport(oConfig);
    }

    enviaCorreo(oEmail){
        try {
            this.createTransport.sendMail(oEmail,function(error,info){
                if(error){
                    console.log("Error al enviar el correo" + error);
                }else{
                    console.log("Correo enviado");
                }
            })
            this.createTransport.close();
        } catch (x) {
            console.log("Email.enviaCorreo --Error--" + x);
        }
    }
}
module.exports = Email;