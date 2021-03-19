const express = require('express');
const router = express.Router();
const Ofertauno = require('../models/ofertauno');
const Ofertados = require('../models/ofertados');
const Ofertatres = require('../models/ofertatres');
const Ofertacuatro = require('../models/ofertacuatro');
const Produno = require('../models/produno');
const Proddos = require('../models/proddos');
const Prodtres = require('../models/prodtres');
const Prodcuatro = require('../models/prodcuatro');
const Prodcinco = require('../models/prodcinco');
const Prodseis = require('../models/prodseis');
const Prodsiete = require('../models/prodsiete');
const Prodocho = require('../models/prodocho');
const Prodnueve = require('../models/prodnueve');
const Proddiez = require('../models/proddiez');
const Prodonce = require('../models/prodonce');
const Proddoce = require('../models/proddoce');
const Prodtrece = require('../models/prodtrece');
const Prodcatorce = require('../models/prodcatorce');
const Prodquince = require('../models/prodquince');
const Proddieciseis = require('../models/proddieciseis');
const Proddiecisiete = require('../models/proddiecisiete');
const Proddieciocho = require('../models/proddieciocho');
 


const Ahome = require('../models/ahome');
const nodemailer = require('nodemailer');

const Cart = require('../models/cart');
const Order = require('../models/order');

router.get('/', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  // let ipad = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress

  //  req.session.views = (req.session.views || 0) + 1  
  // req.session.ip = req.session.req.ip
  // const visitor = new Ahome({views:req.session.views, ip:ipad});
  //await visitor.save();
  const ofertauno = await Ofertauno.find();
  const ofertados = await Ofertados.find();
  const ofertatres = await Ofertatres.find();
  const ofertacuatro = await Ofertacuatro.find();

 //const ahome= await Ahome.find({views});
  res.render('index', { 
    ofertauno, 
    ofertados,
    ofertatres,
    ofertacuatro,
  //  visitor,

    products: cart.generateArray(), totalPrice: cart.totalPrice

   // ahome
   // ofertatres
  });
 
});

router.get('/about', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('about', {

    products: cart.generateArray(), totalPrice: cart.totalPrice
  });
});
  
 

// router.get('/visits', async (req, res) => {
//   const totalvisitas = await Ahome.countDocuments({})

//  const ahome= await Ahome.find( );
//   res.render('users/visitors', { 
   
//     ahome,
//     totalvisitas
//   }); 
// });


router.get('/visitas/:page', async (req, res) => {

  const totalvisitas = await Ahome.countDocuments({})

  let perPage = 12;
  let page = req.params.page || 1;

  Ahome 
  .find({}) // finding all documents
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, ahome) => {
    Ahome.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('users/visitors', {
        ahome,
        current: page,
        pages: Math.ceil(count / perPage),
        totalvisitas
      });
    });
  });
});



router.get('/liked', async (req, res) => {

  // if(!req.session.cart){
  //   return res.render('cart/shopcart', {products:null})
  // } 
  //var cart = new Cart(req.session.cart);
   var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  const likedofertauno = await Ofertauno.find({like:true});
  const likedofertados = await Ofertados.find({like:true});
  const likedofertatres = await Ofertatres.find({like:true});
  const likedproduno = await Produno.find({like:true});
  const likedproddos = await Proddos.find({like:true});
  const likedprodtres = await Prodtres.find({like:true});
  const likedprodcuatro = await Prodcuatro.find({like:true});
  const likedprodcinco = await Prodcinco.find({like:true});
  const likedprodseis = await Prodseis.find({like:true});
  const likedprodsiete = await Prodsiete.find({like:true});
  const likedprodocho = await Prodocho.find({like:true});
  const likedprodnueve = await Prodnueve.find({like:true});
  const likedproddiez = await Proddiez.find({like:true});
  const likedprodonce = await Prodonce.find({like:true});
  const likedproddoce = await Proddoce.find({like:true});
  const likedprodtrece = await Prodtrece.find({like:true});
  const likedprodcatorce = await Prodcatorce.find({like:true});
  const likedprodquince = await Prodquince.find({like:true});
  const likedproddieciseis = await Proddieciseis.find({like:true});
  const likedproddiecisiete = await Proddiecisiete.find({like:true});
  const likedproddieciocho = await Proddieciocho.find({like:true});

  console.log(likedofertauno )
 
  // const ofertados = await Ofertados.find();
  // const ofertatres = await Ofertatres.find();
  res.render('liked', { 
    likedofertauno, 
    likedofertados, 
    likedofertatres, 
    likedproduno,
    likedproddos,
    likedprodtres,
    likedprodcuatro,
    likedprodcinco,
    likedprodseis,
    likedprodsiete,
    likedprodocho,
    likedprodnueve,
    likedproddiez,
    likedprodonce,
    likedproddoce,
    likedprodtrece,
    likedprodcatorce,
    likedprodquince,
    likedproddieciseis,
    likedproddiecisiete,
    likedproddieciocho ,
    products: cart.generateArray(), totalPrice: cart.totalPrice
  });
});





router.get('/contacto', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('contacto', {

    products: cart.generateArray(), totalPrice: cart.totalPrice
  });
});




router.post('/email', async (req, res) => {
  const { name, email, asunto, message } = req.body;

  contentHTML = `
      <h1>User Information</h1>
      <ul>
          <li>Nombres: ${name}</li>
          <li>Email: ${email}</li>
         
      </ul>
      <ul>
          <li>Asunto: ${asunto}</li>
         
      </ul>
      <p>${message}</p>
  `;

  

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
   user: 'grossicervezas@gmail.com',
   pass: '001Grossi'
   
 }
 });
 
 
 let mailOptions = {
  from: 'lehj09@gmail.com',
  to: 'jhessle04@gmail.com',
  subject: 'email website',
  html: contentHTML
 
 };

 

 
 transporter.sendMail(mailOptions, function(error, info){
  if (error) {
   console.log(error);
  }else{
   console.log('Email sent: ' + info.response);
  }
 });
 res.redirect('/contacto');
});



router.get('/probarse-en-casa', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('encasa', {

    products: cart.generateArray(), totalPrice: cart.totalPrice
  });
});



router.get('/cambios-y-devoluciones', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('devoluciones', {

    products: cart.generateArray(), totalPrice: cart.totalPrice
  });
});


router.get('/beneficios-en-vision', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('beneficiosvision', {

    products: cart.generateArray(), totalPrice: cart.totalPrice
  });
});

router.get('/diferencia-polarizados', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('polarizados', {

    products: cart.generateArray(), totalPrice: cart.totalPrice
  });
});


module.exports = router;
