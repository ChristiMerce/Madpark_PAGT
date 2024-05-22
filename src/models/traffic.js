const mongoose = require('mongoose');

const { Schema } = mongoose;

const trafficSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  idelem: String,
  descripcion: String,
  accesoAsociado:String,
  ocupacion:String,
    carga:String,
    nivelServicio:String,
    intensidadSat:String,
    error:String,
    subarea:String,
    st_x:String,
    st_y:String
});

const Traffic = mongoose.model('traffic', trafficSchema);

module.exports = Traffic;