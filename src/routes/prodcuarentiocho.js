const express = require('express');
const router = express.Router();
 

// Models
const Prodcuarentiocho = require('../models/prodcuarentiocho');
const Cart = require('../models/cart');
const Cartdolar = require('../models/cartdolar');
 
// Helpers
const { isAuthenticated } = require('../helpers/auth');


router.get('/hombre-casual-rectangular/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 8;
  let page = req.params.page || 1;

  Prodcuarentiocho
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodcuarentiocho) => {
    Prodcuarentiocho.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodcuarentiocho/prodcuarentiocho', {
        prodcuarentiocho,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});





router.post('/prodcuarentiocho/new-prodcuarentiocho',  async (req, res) => {
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
    const newNote = new Prodcuarentiocho({ 
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
    res.redirect('/prodcuarentiochoback/1');
  }
});






router.get('/hombre-casual-rectangular-detalles/:id', async (req, res) => {
  const { id } = req.params;
  const prodcuarentiocho = await Prodcuarentiocho.findById(id);
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('prodcuarentiocho/prodcuarentiochoredirect', {
    prodcuarentiocho,
    products: cart.generateArray(), totalPrice: cart.totalPrice

  });
});




 ////////////////////////////like////////////////////////

 router.get('/likeprodcuarentiocho/:id', async (req, res, next) => {
  // let { id } = req.params;
  // const task = await Ofertauno.findById(id);
  const task = await Prodcuarentiocho.findById(req.params.id);
  task.like = !task.like;
  await task.save();
 // res.redirect('/pedidos/:1');
  res.json(true);
});



// New product
router.get('/prodcuarentiochoback/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodcuarentiocho
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodcuarentiocho) => {
    Prodcuarentiocho.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodcuarentiocho/new-prodcuarentiocho', {
        prodcuarentiocho,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});



router.post("/filtroprodcuarentiocho", function(req, res){
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  var flrtName = req.body.filtroprod;

  if(flrtName!='' ) {

    var flterParameter={ $and:[{ talleuno:flrtName},
      {$and:[{},{}]}
      ]
       
    }
    }else{
      var flterParameter={}
  }
  var prodcuarentiocho = Prodcuarentiocho.find(flterParameter);
  prodcuarentiocho
  //.find( flterParameter) 
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, data) => {
    prodcuarentiocho.countDocuments((err, count) => {  
  //.exec(function(err,data){
      if(err) throw err;
      res.render("prodcuarentiocho/prodcuarentiocho",
      {
        prodcuarentiocho: data, 
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice
      });
    });
  });
});


// talle y color
router.get('/prodcuarentiocho/tallecolor/:id',  async (req, res) => {
  const prodcuarentiocho = await Prodcuarentiocho.findById(req.params.id);
  res.render('prodcuarentiocho/tallecolor-prodcuarentiocho', { prodcuarentiocho });
});

router.post('/prodcuarentiocho/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcuarentiocho.updateOne({_id: id}, req.body);
  res.redirect('/prodcuarentiochoredirect/' + id);
});




//editar


router.get('/prodcuarentiocho/edit/:id',  async (req, res) => {
  const prodcuarentiocho = await Prodcuarentiocho.findById(req.params.id);
  res.render('prodcuarentiocho/edit-prodcuarentiocho', { prodcuarentiocho });
});

router.post('/prodcuarentiocho/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcuarentiocho.updateOne({_id: id}, req.body);
  res.redirect('/prodcuarentiochoback/1');
});




// Delete 
router.get('/prodcuarentiocho/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Prodcuarentiocho.deleteOne({_id: id});
  res.redirect('/prodcuarentiochoback/1');
});






router.get('/addtocardprodcuarentiocho/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
  var cartdolar = new Cartdolar(req.session.cartdolar ? req.session.cartdolar : {items: {}});
  Prodcuarentiocho.findById(productId,async function(err, product){
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
 