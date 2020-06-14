const express = require('express')
const bodyparser =  require('body-parser')
const config = require('./config');
var cors = require('cors');




const app = express()
app.use(cors());
//connection with database




//call routes
const cadastrosRoute = require('./routes/cadastros-route')
const userRouter = require('./routes/user-route');
const familiaRoute = require('./routes/family-route')


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}))


app.use('/cadastro' , cadastrosRoute);
app.use('/user' , userRouter);
app.use('/familia' , familiaRoute);
module.exports = app;