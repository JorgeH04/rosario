const express = require('express');
const router = express.Router();

 

// Models
const Prodcinco = require('../models/prodcinco');
const Cart = require('../models/cart');
const Order = require('../models/order');
const Cartdolar = require('../models/cartdolar');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

  

  router.get('/cats-gatsby/:page', async (req, res) => {

    var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

    let perPage = 8;
    let page = req.params.page || 1;
  
    Prodcinco
    .find({}) // finding all documents
    .sort({ timestamp: -1 })
    .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
    .limit(perPage) // output just 9 items
    .exec((err, prodcinco) => {
      Prodcinco.countDocuments((err, count) => { // count to calculate the number of pages
        if (err) return next(err);
        res.render('prodcinco/prodcinco', {
          prodcinco,
          current: page,
          pages: Math.ceil(count / perPage),
          products: cart.generateArray(), totalPrice: cart.totalPrice

        });
      });
    });
  });
  
  



  router.post('/prodcinco/new-prodcinco',  async (req, res) => {
    const { 
      name,
      title,
      image,
      imageuno,
      imagedos,
      imagetres,
      imagecuatro,
      imagecinco,
      imageseis,
      imagesiete,
      imageocho,
      imagenueve,
      imagediez,
      imageonce,
      imagedoce,
      imagetrece,
      imagecatorce,
      imagequince,
      imagedieciseis,
      imagediecisiete,
      imagedieciocho,
      imagediecinueve,
      description,
      filtroprice,
      enstock,
      coloruno,
      colordos,
      colortres,
      colorcuatro,
      colorcinco,
      colorseis,
      colorsiete,
      colorocho,
      colornueve,
      colordiez,
      coloronce,
      colordoce,
      colortrece,
      colorcatorce,
      colorquince,
      colordieciseis,
      colordiecisiete,
      colordieciocho,
      colordiecinueve,
      talle,
      talleuno,
      talledos,
      talletres,
      oldprice,
      price,
      dolarprice 
    } = req.body;
    const errors = [];
    if (!image) {
      errors.push({text: 'Please Write a Title.'});
    }
    if (!title) {
      errors.push({text: 'Please Write a Description'});
    }
    if (!price) {
      errors.push({text: 'Please Write a Description'});
    }
    if (errors.length > 0) {
      res.render('notes/new-note', {
        errors,
        image,
        title,
        price
      });
    } else {
      const newNote = new Prodcinco({ 
        name,
        title,
        image,
        imageuno,
        imagedos,
        imagetres,
        imagecuatro,
        imagecinco,
        imageseis,
        imagesiete,
        imageocho,
        imagenueve,
        imagediez,
        imageonce,
        imagedoce,
        imagetrece,
        imagecatorce,
        imagequince,
        imagedieciseis,
        imagediecisiete,
        imagedieciocho,
        imagediecinueve,
        description,
        filtroprice,
        enstock,
        coloruno,
        colordos,
        colortres,
        colorcuatro,
        colorcinco,
        colorseis,
        colorsiete,
        colorocho,
        colornueve,
        colordiez,
        coloronce,
        colordoce,
        colortrece,
        colorcatorce,
        colorquince,
        colordieciseis,
        colordiecisiete,
        colordieciocho,
        colordiecinueve,
        talle,
        talleuno,
        talledos,
        talletres,
        oldprice,
        price,
        dolarprice 
      });
      //newNote.user = req.user.id;
      await newNote.save();
      req.flash('success_msg', 'Note Added Successfully');
      res.redirect('/prodcincoback/:1');
    }
  });
  






router.get('/cats-gatsby-detalles/:id', async (req, res) => {

  const { id } = req.params;
  const prodcinco = await Prodcinco.findById(id);
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('prodcinco/prodcincoredirect', {
    prodcinco,
    products: cart.generateArray(), totalPrice: cart.totalPrice

  });
});




router.get('/prodcincoindex/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 8;
  let page = req.params.page || 1;

  Prodcinco
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodcinco) => {
    Prodcinco.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodcinco/new-prodcinco', {
        prodcinco,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});




router.get('/prodcincoback/:page', async (req, res) => {


  let perPage =12;
  let page = req.params.page || 1;

  Prodcinco 
  .find()// finding all documents
  .sort({_id:-1})
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodcinco) => {
    Prodcinco.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodcinco/new-prodcinco', {
        prodcinco,
        current: page,
        pages: Math.ceil(count / perPage)
      });
    });
  });
});






 ////////////////////////////like////////////////////////

router.get('/likeprodcinco/:id', async (req, res, next) => {
  // let { id } = req.params;
  // const task = await Ofertauno.findById(id);
  const task = await Prodcinco.findById(req.params.id);
  task.like = !task.like;
  await task.save();
 // res.redirect('/pedidos/:1');
  res.json(true);
});
 

// talle y color
router.get('/prodcinco/tallecolor/:id',  async (req, res) => {
  const proddos = await Proddos.findById(req.params.id);
  res.render('proddos/tallecolor-proddos', { proddos });
});

router.post('/proddos/tallecolor/:id',  async (req, res) => {
//router.post('/addtocardproddos/:id',  async (req, res) => {
  const { id } = req.params;
  await Proddos.updateOne({_id: id}, req.body);
  // const task = await Proddos.findById(id);
  // task.status = !task.status;
  // await task.save();

  //res.redirect('/proddosredirect/' + id);
  //res.redirect('/shopcart');
});




//editar


router.get('/prodcinco/edit/:id',  async (req, res) => {
  const prodcinco = await Prodcinco.findById(req.params.id);
  res.render('prodcinco/edit-prodcinco', { prodcinco });
});

router.post('/prodcinco/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcinco.updateOne({_id: id}, req.body);
 // res.redirect('/proddosback/' + id);
  res.redirect('/prodcincoback/:1');
});
// router.post('/addtocardproddos/:id',  async (req, res) => {
//   const { id } = req.params;
//   await Proddos.updateOne({_id: id}, req.body);
//   res.redirect('/shopcart');
// });


// Delete 
router.get('/prodcinco/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Prodcinco.deleteOne({_id: id});
  res.redirect('/prodcincoback/:1');
});




router.get('/shopcart', function (req, res, next){

  if(!req.session.cart){
    return res.render('cart/shopcart', {products:null})
  }

  var cart = new Cart(req.session.cart);
  res.render('cart/shopcart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
});
 


router.get('/addtocardprodcinco/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
  var cartdolar = new Cartdolar(req.session.cartdolar ? req.session.cartdolar : {items: {}});
  Prodcinco.findById(productId,async function(err, product){
    if(err){
      return res-redirect('/');
    }


  //  if(product.status == true) {
      cartdolar.add(product, product.id);
      cart.add(product, product.id);
      req.session.cart = cart;
      req.session.cartdolar = cartdolar;
    //  product.status = !product.status;
  //    await product.save();
  // }else{
    //  req.flash('success', 'Elija su color y talle primero');
    //  res.redirect('/produnoredirect/' + productId);
  // }


    console.log(req.session.cart);
    console.log(req.session.cartdolar);
    req.flash('success', 'Producto agregado al carro exitosamente');
    //res.redirect('/produnoredirect/' + productId);
    res.redirect('/shopcart');
  });
});

module.exports = router;
