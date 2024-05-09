//almacena las rutas principales
const express = require ('express');
const passport = require('passport');
const { Parkingmodel } = require('../database');
const router = express.Router();
const Parking =require('../models/parking');


router.get('/parkings', async (req, res, next) => {
  try {
    const parkings = await Parking.find();
    res.json(parkings); // Send parking data as JSON response
  } catch (error) {
    console.error('Error fetching parking data:', error);
    res.status(500).json({ message: 'Error fetching parking data' }); // Handle errors gracefully
  }
});
router.get('/signup', (req, res, next) => {
    res.render('signup');
  });
  
  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  })); 

router.get('/signin', (req, res, next) => {
    res.render('signin');
  });

router.get('/conocenos', (req, res, next) => {
    res.render('conocenos');
  });


  router.get('/Mapa', (req, res, next) => {
    // Verificar si el usuario está autenticado
    const isAuthenticated = req.isAuthenticated();
    // Renderizar la página del mapa con datos condicionales
    res.render('Mapa', { isAuthenticated });

    
    
  });

  router.get('/inicio', (req, res, next) => {
    res.render('inicio');
  });


  
router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  }));
  


router.get('/profile',isAuthenticated, (req, res, next) => {
    res.render('profile');
  });

  //hacer boton de cierre de perfil
  router.get('/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) { // Handle potential errors during logout
        return next(err); // Pass the error to the error handler middleware
      }
      res.redirect('/inicio'); // Redirect to the homepage after successful logout
    });
  });


//si en una peticion esta autenticado q valla a la sigueinte ruta si no a la pagina principal
  function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/')
  }


//para que las siguientes rutas necesiten que estes autenticado:
/*
router.use((req,res,next)=>{
    isAuthenticated(req, res, next);
    next();
    });


poner las demas rutas que queremos que esten autenticado el usuario, conocenos etc...

 */


module.exports =router;