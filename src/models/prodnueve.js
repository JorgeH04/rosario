const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  name: String,
  title: String,
  image: String,
  imageuno: String,
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
  imageveinte: String,
  imageveintiuno: String,
  imageveintidos: String,
  description: String,
  filtroprice: String,
  enstock:String,
  coloruno: String,
  colordos: String,
  colortres: String,
  colorcuatro: String,
  colorcinco: String,
  colorseis: String,
  colorsiete: String,
  colorocho: String,
  colornueve: String,
  colordiez: String,
  coloronce: String,
  colordoce: String,
  colortrece: String,
  colorcatorce: String,
  colorquince: String,
  colordieciseis: String,
  colordiecisiete: String,
  colordieciocho: String,
  colordiecinueve: String,
  talleuno: String,
  talledos: String,
  talletres: String,
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

module.exports = mongoose.model('Prodnueve', NoteSchema);
