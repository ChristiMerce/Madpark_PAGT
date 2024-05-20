const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
  Name: String,
  surename: String,
  address:String,
  comunidad:String,
  Provincia:String,
  selectedParking: {
    type: mongoose.Schema.Types.ObjectId, // Tipo de dato para almacenar el ID del parking
    ref: 'parking' // Referencia al modelo Parking
  }
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