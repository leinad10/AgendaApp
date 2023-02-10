const User = require('../models/user');
const bcrypt = require('bcrypt');
const { model } = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.insertData = (async (request, response) => {
  try {
    const {username, password} = request.body
  const aja = await User.findOne({ username }).exec();
  
  console.log(aja);
  if (!aja) {
    response.status(400).json({error: "Usuario o contrase;a invalidos"})
    console.log("1");
    
  } else {
    if (username === aja.username) {
      console.log("2");
      console.log(password);
      console.log(aja.passwordHash);
      const ajaas = await bcrypt.compare(password, aja.passwordHash);
      console.log("tpm");
      console.log(ajaas);
      if (ajaas) {
        console.log("3");
        const usuarioValido = {username: username}
        console.log(usuarioValido);
        if (aja.verification) {
          const accessToken =  generateAccessToken(usuarioValido);
          console.log('aver');
          function generateAccessToken(usuarioValido) {
            return jwt.sign(usuarioValido, process.env.SECRET, {expiresIn: '10s'});
          }
          console.log('aver2');
          response.cookie(`acces-token-${username}`, accessToken, { httpOnly: true })
          response.status(200).json({message: `Acceso autorizado ${accessToken}`})
          console.log(accessToken);
        } else {
          response.status(400).json({error: "Reviza tu email para verificar tu usuario"})
        } 
      } else {console.log('4');}
    }
  }
  } catch (error) {
    console.log(error);
  }
  });

  exports.getData = (async (req,res) => {
  
  })