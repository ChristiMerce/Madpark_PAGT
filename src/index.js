const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const Parking =require('./models/parking');
const Traffic=require('./models/traffic')
const RutaParking=require('./routes/index')

// initializations
const app = express();
require('./database');
require('./passport/local-auth');



// settings
app.set('port', process.env.PORT || 3002);
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'views', 'layouts')));


// middlewares
// Middleware para parsear JSON y datos de formulario
app.use(express.json());

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//metodo que obtiene los valores de signinmessage
app.use((req, res, next) => {
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.user = req.user;
    console.log(app.locals)
    next();
  });

  
  app.use('/parkings', RutaParking);

  app.use('/traffic', RutaParking);
  

// routes
app.use('/', require('./routes/index'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});
