const User = require('../models/user');
const bcrypt = require('bcrypt');
const { model } = require('mongoose');
const nodemailer = require("nodemailer");
require('dotenv').config();

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.CORREO_ELECTRONICO, // generated ethereal user
    pass: process.env.CORREO_PASSWORD, // generated ethereal password
  },
});



exports.insertData = (async (request, response) => {

  const { username, email, password } = request.body;
  const userExist = await User.findOne({ username });

  const isCorrect = /^(?=.*[a-z])(?=.*[0-9])(?=.*[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]).{6,24}$/;
  if (userExist) {
    return response.status(400).json({ error: 'username already exist' });
  } else if (!(username && password)) {
    return response.status(400).json({ error: 'username and password are required' });
  } else if (!isCorrect.test(password)) {
    return response.status(400).json({ error: 'Password needs to be at least 6 characters long, include 1 number, 1 letter and 1 special character' });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  let mailOptions = {
    from: `"Verification 👻" <${process.env.CORREO_ELECTRONICO}>`, // sender address
    to: email, // list of receivers
    subject: "Verifica tu usuario ✔", 
    html: `<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
        h1{ font-size: 30px !important;}
        h2{ font-size: 25px !important;}
        h3{ font-size: 18px !important;}
        h4{ font-size: 16px !important;}
        p, a{font-size: 15px !important;}

        .claseBoton{
            width: 30%;
                background-color: #fcae3b;
                border: 2px solid #fcae3b;
                color: black; 
                padding: 16px 32px;
                text-align: center;
                text-decoration: none;
                font-weight: bold;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                transition-duration: 0.4s;
                cursor: pointer;
        }
        .claseBoton:hover{
            background-color: #000000;
            color: #ffffff;
        }
        .imag{
            width: 20px;
            height: 20px;
        }
        .contA{
            margin: 0px 5px 0 5px;
        }
        .afooter{
            color: #ffffff !important; 
            text-decoration: none;
            font-size: 13px !important;
        }
    </style>
</head>
<body>
    <div style="width: 100%; background-color: #e3e3e3;">
        <div style="padding: 20px 10px 20px 10px;">
            <!-- Imagen inicial -->
            <div style="background-color: #000000; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
            </div>
            <!-- Imagen inicial -->

            <!-- Contenido principal -->
            <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                <h1>Titulo de la notificación</h1>
                <p>Verifica tu Usuario haciendo click el link de abajo.</p>
                <a href="https://leinad-app-0v4f.onrender.com/verify/index.html">Verificar</a>
                <!-- Gracias -->
                <p>Gracias por tu tiempo.</p>
                <p style="margin-bottom: 50px;"><i>Atentamente:</i><br>Daniel Contreras</p>

                <!-- Botón -->
            </div>
            <!-- Contenido principal -->

            <!-- Footer -->
            <div style="background-color: #282828; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
               
                <!-- Redes sociales -->

                <h4>Soporte</h4>
                <p style="background-color: black; padding: 10px 0px 10px 0px; font-size: 12px !important;">

                </p>
            </div>
            <!-- Footer -->
        </div>
    </div>
    <script>
</body>`,
  };

  transporter.sendMail(mailOptions, async (err, info) => {
    if (err)  {
        response.status(500).json({error: "Email, not sended"})
    } else {
        
  }})
  //   // User creation in MongoDB
  const user = new User({
    username,
    email,
    passwordHash,
  });

  // Send user
  const savedUser = await user.save();
  return response.status(200).json({savedUser});
  }
);

  // User.create(username, email, passwordHash, (err, docs) => {
  //   if (err) {
  //     console.log('error')
  //   ;}  response.send({data: docs})
  // })





exports.getData = (async (request, response) => {
  const data = request.body
  User.find({data}, (err, docs) =>  {
    response.send({
      docs
    })
  })
});



