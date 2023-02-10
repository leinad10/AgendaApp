const app = require('./app');
const http = require('http');
const { PORT } = require('./config');
const usersRouter = require('./routes/users');
const pruebaRouter = require('./routes/prueba');
const loginRouter = require('./routes/login');
const authRouter = require('./routes/auth');
const verifyRouter = require('./routes/verify');
const agendaRouter = require('./routes/agenda');
const server = http.createServer(app);
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use(verifyRouter);
app.use(authRouter);
app.use(agendaRouter);
app.use(loginRouter);
app.use(usersRouter);
app.use(pruebaRouter);
server.listen(PORT, () => {
    console.log(`La aplicacion esta corriendo en el puerto ${PORT}`);
});