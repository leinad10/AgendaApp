// const mongoose = require('mongoose');

// const loginSchema = new mongoose.Schema({
//     username:  {
//         type: String,
//         require: true,
//     },
//     password: {
//         type:String,
//         require: true,
//     }
// });
// loginSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         returnedObject.username = returnedObject._id.toString()
//         returnedObject.password = returnedObject.password.toString()
//     }
// })

// const Login = mongoose.model('Login', loginSchema);

// module.exports = Login;