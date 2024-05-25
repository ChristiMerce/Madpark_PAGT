//almacena las rutas principales
const express = require ('express');
const passport = require('passport');
const { Parkingmodel } = require('../database');
const router = express.Router();
const Parking =require('../models/parking');
const User = require('../models/user');
const Traffic = require('../models/traffic');



router.get('/parkings', async (req, res, next) => {
  try {
    const parkings = await Parking.find();
    res.json(parkings); // Send parking data as JSON response
  } catch (error) {
    console.error('Error fetching parking data:', error);
    res.status(500).json({ message: 'Error fetching parking data' }); // Handle errors gracefully
  }
});
router.get('/traffic', async (req, res, next) => {
  try {
    const parkings = await Parking.find();
    res.json(parkings); // Send traffic data as JSON response
  } catch (error) {
    console.error('Error fetching traffic data:', error);
    res.status(500).json({ message: 'Error fetching traffic data' }); // Handle errors gracefully
  }
});
router.get('/registro', (req, res, next) => {
    res.render('registro');
  });
  
  router.post('/registro', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/registro',
    failureFlash: true
  })); 

router.get('/signin', (req, res, next) => {
    res.render('signin');
  });

  
// Ruta para seleccionar un parking
router.post('/seleccionar-parking', async (req, res) => {
  const { parkingId, parkingNombre, parkingBarrio } = req.body;
  const userId = req.user._id; // Asume que el usuario está autenticado y el ID del usuario está disponible en req.user._id

  try {
      // Actualiza el usuario con el parking seleccionado y añade una nueva reserva
      await User.findByIdAndUpdate(userId, {
          selectedParking: {
              id: parkingId,
              nombre: parkingNombre
          },
          $push: {
              reservations: {
                  parkingId: parkingId,
                  parkingName: parkingNombre,
                  parkingBarrio: parkingBarrio
              }
          }
      });

      res.json({ success: true, message: 'Parking seleccionado exitosamente' });
  } catch (error) {
      console.error('Error al seleccionar el parking:', error);
      res.status(500).json({ success: false, message: 'Error al seleccionar el parking' });
  }
});
router.get('/reservas', async (req, res) => {
  const userId = req.user._id;

  try {
      const user = await User.findById(userId);
      res.render('reservas', { reservations: user.reservations });
  } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      res.status(500).send('Error al cargar el perfil del usuario');
  }
});
router.get('/reservas', (req, res, next) => {
  res.render('reservas');
});

router.get('/conocenos', (req, res, next) => {
    res.render('conocenos');
  });
  router.get('/manual', (req, res, next) => {
    res.render('manual');
  });

  router.get('/faqs', (req, res, next) => {
    res.render('faqs');
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


//si en una peticion esta autenticado que vaya a a la sigueinte ruta si no a la pagina principal
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