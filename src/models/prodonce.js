const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  name: String,
  title: String,
  image: String,
  imagedos: String,
  imagetres: String,
  imagecuatro: String,
  imagecinco: String,
  imageseis: String,
  imagesiete: String,
  imageocho: String,
  imagenueve: String,
  imagediez: String,
  imageonce: String,
  imagedoce: String,
  imagetrece: String,
  imagecatorce: String,
  imagequince: String,
  imagedieciseis: String,
  imagediecisiete: String,
  imagedieciocho: String,
  imagediecinueve: String,
  description: String,
  filtroprice: String,
  enstock:String,
  color: String,
  colorstock: String,
  talle: String,
  tallestock: String,
  oldprice: Number, 
  price: Number,
  dolarprice: Number,
  amount: Number,
  like: {
    type: Boolean,
    default: false
  },

  status: {
    type: Boolean,
    default: false
  } 
});

module.exports = mongoose.model('Prodonce', NoteSchema);
