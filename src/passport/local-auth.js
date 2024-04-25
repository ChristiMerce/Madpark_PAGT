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
    const { Name ,surename, address,comunidad,Provincia} = req.body;

  try {
    // Verifica si ya existe un usuario con el mismo correo electrónico
    const existingUser = await User.findOne({ email });

    // Si el usuario ya existe, devuelve un mensaje de error
    if (existingUser) {
      return done(null, false, req.flash('signupMessage', 'The email is already taken.'));
    } else {
      // Si el usuario no existe, crea uno nuevo con los datos proporcionados
      const newUser = new User();
      newUser.email = email;
      newUser.Name = Name; 
      newUser.surename=surename;
      newUser.address=address;
      newUser.comunidad=comunidad;
      newUser.Provincia=Provincia;// Asigna el fullName al nuevo usuario
      newUser.password = newUser.encryptPassword(password);

      // Guarda el nuevo usuario en la base de datos
      await newUser.save();

      // Devuelve el nuevo usuario
      return done(null, newUser);
    }
  } catch (error) {
    return done(error);
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
  