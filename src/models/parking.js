const mongoose = require('mongoose');

const { Schema } = mongoose;

const parkingSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  nombre: String,
  descripcion: String,
  Codigo_Postal: Number,
  Distrito: String,
  Barrio: String,
  CoordX: Number,
  CoordY:Number,
  lat:Number,
  long:Number,
  telefono:Number
    // Add other fields as needed
});

const Parking = mongoose.model('parking', parkingSchema);

module.exports = Parking;