const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
    creator: String,
    contactname: {
        type: String,
        require: true,
    },
    contactNumber: {
        type: String,
        require: true
    },
});

agendaSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Agenda = mongoose.model('Agenda', agendaSchema);

module.exports = Agenda;