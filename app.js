// require ('dotenv').config();
// const express = require('express')
// const app = express();
// const mongoose = require ('mongoose');

// (async() => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI_TEST);
//         console.log("conectado")
//     } catch (error) {
//         console.log(error)
//         console.log("tuputamadre");
//     }

// })()

// module.exports = app;

require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const authExtractor = require('./middleware/auth');
const logoutRouter = require('./controllers/logout');
const { MONGO_URI } = require('./config');

(async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conecto a mongoDB')
    } catch (error) {
        console.log('No conecto a MongoDB')
    }
})();

app.use(bodyParser.json())
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(cookieParser()); 
// app.use('/api/users', usersRouter);
// app.set('/api/login', loginRouter);
// app.set('/api/logout', logoutRouter);
// app.set('/api/todos', authExtractor, todosRouter);

// Frontend routes
app.use('/', express.static(path.resolve(__dirname, 'aja', 'home')));
app.use('/signup', express.static(path.resolve(__dirname, 'aja', 'signup')));
app.use('/verify', express.static(path.resolve(__dirname, 'components', 'email')));
app.use('/loginn', express.static(path.resolve(__dirname, 'aja', 'login')));
app.use('/app/', express.static(path.resolve(__dirname, 'aja', 'todo')));
app.use('/agenda/', express.static(path.resolve(__dirname, 'aja', 'agenda')));
app.use('/images', express.static(path.resolve(__dirname, 'images')));
app.use('/*', express.static(path.resolve(__dirname, 'aja', 'notfound')));


module.exports = app;