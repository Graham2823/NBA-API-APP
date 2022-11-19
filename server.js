const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');

//middleware
app.use(express.static('assets'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

const PORT= process.env.PORT;

//routes
const frontPageRoute = require('./server/routes/frontPageRoute.js');
const boxScoreRoute = require('./server/routes/yBoxScoreRoute.js')
const tBoxScoreRoute = require('./server/routes/tBoxScoreRoute.js')
// const playerPageRoute= require('./server/routes/playerPageRoute');

app.use('/', frontPageRoute)
app.use('/boxScore', boxScoreRoute);
app.use('/tBoxScore', tBoxScoreRoute);
// app.use('/playerPage', playerPageRoute);

app.listen(PORT, ()=>{console.log(`server is running on http://localhost:${PORT}`)})