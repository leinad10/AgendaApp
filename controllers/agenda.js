const Agenda = require('../models/agenda');

exports.insertData = (async (req,res) =>{
    const {username, name, number} = req.body
    const contacto = new Agenda({
        creator: username,
        contactname: name,
        contactNumber: number,
      });
    
      // Send user
      const savedContact = await contacto.save();
      return res.status(201).json(savedContact);
});

exports.getData = (async (req, res) => {
    const aver = req.body
    Agenda.find({}, (err, docs) =>  {
        if (err) {
        res.status(400).json({error:"No existen"})
       } else {
            res.send({
            docs
          })
       }
      })
})

exports.deletData = (req,res) => {
  const {aver} = req.body
  console.log(aver);
  Agenda.deleteOne({_id: aver.id},
  (err,docs) => {
    if (err) {
      console.log(err);
    }
    console.log(docs);
    res.send({
      items: docs
    })
  })
}
exports.changeData = (req,res) => {
  const {id, contactNumber, contactname} = req.body
  const body = {
    contactname:contactname,
    contactNumber:contactNumber
  }
  console.log(req.body);
  Agenda.updateOne({_id: id},
    body,
  (err,docs) => {
    if (err) {
      console.log(err);
    }
    console.log(docs);
    res.send({
      items: docs
    })
  })
};