const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;
const reservationSchema = new Schema({
  parkingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Parking' },
  parkingName: String,
  parkingBarrio: String,
  createdAt: { type: Date, default: Date.now }
});


module.exports = reservationSchema;
const userSchema = new Schema({
  email: String,
  password: String,
  Name: String,
  surename: String,
  address:String,
  comunidad:String,
  Provincia:String,
    // Añade el campo para almacenar el parking seleccionado
    selectedParking: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'Parking' },
      nombre: String
    },
    reservations: [reservationSchema]
});


//cifrado de la contraseña(hash)
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };
//comparar la contraseña para cuando se logee el usuario y pueda compararlo con la contraseña hasheada
  userSchema.methods.comparePassword= function (password) {
    return bcrypt.compareSync(password, this.password);
  };

module.exports = mongoose.model('user', userSchema);