const jwt = require('jsonwebtoken');

exports.insertData = (async (req, res) => {
    const username = req.body
    const cooki = req.cookies
    console.log(cooki);
    const token = cooki[`acces-token-${username.username}`]
    console.log(token);
    if (!token) {
        res.status(400).json({error : "Acceso Denegado"})
        }
    jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
        res.status(400).json({error: "Acceso denegado o token expirado"})
    } else {
        res.status(200).json({ok:"Acceso garantizado"})
    }
    })
});
  
exports.getData = (async (request, response) => {
    
  });