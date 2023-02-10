const Users = require("../models/user")

exports.changeData = (req,res) => {
    const {username} = req.body
    const body = {verification:true}
    console.log(username);
    Users.updateOne({ username : username },
    body,
    (err,docs) => {
        if (err) {
          console.log(err);
        }
        console.log(docs);
        res.send({
          items: docs   
        })
    }
    )
}