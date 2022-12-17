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
const boxScoreRoute = require('./server/routes/boxScoreRoute.js')
// const tBoxScoreRoute = require('./server/routes/tBoxScoreRoute.js')
const playerSearchRoute = require('./server/routes/playerSearchPage')
const teamSearchRoute = require('./server/routes/teamSearch');
const playerPageRoute = require('./server/routes/playerPage');
const standingsRoute = require('./server/routes/standingsRoute');
const teamPageRoute = require('./server/routes/teamPageRoute');
// const teamBoxScoreRoute = require('./server/routes/teamBoxScoreRoute')
// const playerPageRoute= require('./server/routes/playerPageRoute');

app.use('/', frontPageRoute)
app.use('/boxScore', boxScoreRoute);
// app.use('/BoxScore', tBoxScoreRoute);
app.use('/playerPage', playerSearchRoute);
app.use('/teamPage', teamSearchRoute);
app.use('/playerPage', playerPageRoute);
app.use('/standings', standingsRoute);
app.use('/teamPage', teamPageRoute);
// app.use('/teamBoxScore', teamBoxScoreRoute);
// app.use('/playerPage', playerPageRoute);

app.listen(PORT, ()=>{console.log(`server is running on http://localhost:${PORT}`)})