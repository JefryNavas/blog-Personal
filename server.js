const express = require('express');
const app = express();
const hbs = require("hbs");
const nodemailer = require("nodemailer")

//Puerto
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Estaticas
app.use(express.static(__dirname + '/public'));

// Establecer el motor para las vistas
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Rutas de la página web
app.get('/', function(req, res) {
    res.render('index', {});
});
app.post('/send-email', (req, res) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'retha.schuster18@ethereal.email',
            pass: 'm5aEJmdrk6XuwJ8rDt'
        }
    });
    var mailOptions = {
        from: req.body.name,
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.message
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.render('index', {
                alert: true,
                alertTitle: 'Error al enviar',
                alertMessage: error,
                icon: 'error',
                timer: 1500
            })
        } else {
            res.render('index', {
                alert: true,
                alertTitle: 'Mensaje Enviado',
                icon: 'success',
                timer: 1500
            })
        }
    })


})


app.listen(port, () => {
    console.log("Servidor Iniciado, escuchando el puerto 3000");
});