const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//serializar el ausuario, lo guarda el usuario para que en diferente pagina no se pida el usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  
//ahora recibe el id serializado, el passpord busca el usuario en la BD
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });


//funcion que define que ahcaer con los datos del cliente
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    const user = await User.findOne({'email': email})
    console.log(user)
    if(user) {
      return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));
    } else {
      const newUser = new User();
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password);
    console.log(newUser)
      await newUser.save();
      done(null, newUser);
    }
  }));


//login
  passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    const user = await User.findOne({email: email});
    if(!user) {
      return done(null, false, req.flash('signinMessage', 'No User Found'));
    }
    if(!user.comparePassword(password)) {
      return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
    }
    return done(null, user);
  }));
  