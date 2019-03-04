const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session')

const app = express();

//Settings
app.set('port',process.env.PORT || 3000)


//Middlewares
app.use(express.json())

//Static Files
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

//Routes
app.use('/api/todos',require('./routes/todos.routes'));
app.use('/api/users',require('./routes/users.routes'));

//Connecting DB
const connect = require('./database')

//Starting server
app.listen(app.get('port'),()=>{
  console.log('Server On on Port',app.get('port'));
});