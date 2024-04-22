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
passport.use('local-registro', new LocalStrategy({
  usernameField: 'email', // Asigna el campo 'email' como el campo de nombre de usuario
  passwordField: 'password', // Asigna el campo 'password' como el campo de contraseña
  passReqToCallback: true
}, async (req, email, password, done) => {
  const { inputName, inputSurename, inputEmail, inputPassword,inputProvince} = req.body; // Asume que estos son los campos en tu formulario
  
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return done(null, false, req.flash('signupMessage', 'El correo electrónico ya está en uso.'));
    } else {
      const newUser = new User({
        email: inputEmail,
        password: newUser.encryptPassword(inputPassword),
        name: inputName,
        surename: inputSurename,
        province: inputProvince
      });
      await newUser.save();
      done(null, newUser);
    }
  } catch (err) {
    return done(err);
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
  