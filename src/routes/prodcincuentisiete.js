const express = require('express');
const router = express.Router();
 

// Models
const Prodcincuentisiete = require('../models/prodcincuentisiete');
const Cart = require('../models/cart');
const Cartdolar = require('../models/cartdolar');
 
// Helpers
const { isAuthenticated } = require('../helpers/auth');


router.get('/masvendidos/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodcincuentisiete
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodcincuentisiete) => {
    Prodcincuentisiete.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodcincuentisiete/prodcincuentisiete', {
        prodcincuentisiete,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});





router.post('/prodcincuentisiete/new-prodcincuentisiete',  async (req, res) => {
  const { 
    name,
    title,
    image,
    imageuno,
    imagedos,
    imagecincuentisiete,
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
    color,
    colordos,
    colorcincuentisiete,
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
    tallecincuentisiete,
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
    const newNote = new Prodcincuentisiete({ 
      name,
      title,
      image,
      imageuno,
      imagedos,
      imagecincuentisiete,
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
      color,
      colordos,
      colorcincuentisiete,
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
      tallecincuentisiete,
      oldprice,
      price,
      dolarprice 
    });
    //newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/prodcincuentisieteback/1');
  }
});






router.get('/masvendidos-detalles/:id', async (req, res) => {
  const { id } = req.params;
  const prodcincuentisiete = await Prodcincuentisiete.findById(id);
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('prodcincuentisiete/prodcincuentisieteredirect', {
    prodcincuentisiete,
    products: cart.generateArray(), totalPrice: cart.totalPrice

  });
});




 ////////////////////////////like////////////////////////

 router.get('/likeprodcincuentisiete/:id', async (req, res, next) => {
  // let { id } = req.params;
  // const task = await Ofertauno.findById(id);
  const task = await Prodcincuentisiete.findById(req.params.id);
  task.like = !task.like;
  await task.save();
 // res.redirect('/pedidos/:1');
  res.json(true);
});



// New product
router.get('/prodcincuentisieteback/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodcincuentisiete
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodcincuentisiete) => {
    Prodcincuentisiete.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodcincuentisiete/new-prodcincuentisiete', {
        prodcincuentisiete,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});






// talle y color
router.get('/prodcincuentisiete/tallecolor/:id',  async (req, res) => {
  const prodcincuentisiete = await Prodcincuentisiete.findById(req.params.id);
  res.render('prodcincuentisiete/tallecolor-prodcincuentisiete', { prodcincuentisiete });
});

router.post('/prodcincuentisiete/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcincuentisiete.updateOne({_id: id}, req.body);
  res.redirect('/prodcincuentisieteredirect/' + id);
});




//editar


router.get('/prodcincuentisiete/edit/:id',  async (req, res) => {
  const prodcincuentisiete = await Prodcincuentisiete.findById(req.params.id);
  res.render('prodcincuentisiete/edit-prodcincuentisiete', { prodcincuentisiete });
});

router.post('/prodcincuentisiete/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcincuentisiete.updateOne({_id: id}, req.body);
  res.redirect('/prodcincuentisieteback/1');
});




// Delete 
router.get('/prodcincuentisiete/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Prodcincuentisiete.deleteOne({_id: id});
  res.redirect('/prodcincuentisieteback/1');
});







router.post("/filtroprodcincuentisiete", function(req, res){
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
  var prodcincuentisiete = Prodcincuentisiete.find(flterParameter);
  prodcincuentisiete
  //.find( flterParameter) 
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, data) => {
    prodcincuentisiete.countDocuments((err, count) => {  
  //.exec(function(err,data){
      if(err) throw err;
      res.render("prodcincuentisiete/prodcincuentisiete",
      {
        prodcincuentisiete: data, 
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice
      });
    });
  });
});
 





router.get('/prodcincuentisiete/tallecolor/:id',  async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  const prodcincuentisiete = await Prodcincuentisiete.findById(req.params.id);
  res.render('prodcincuentisiete/tallecolor-prodcincuentisiete', { 
    prodcincuentisiete,
    products: cart.generateArray(), totalPrice: cart.totalPrice

   });
});



router.post('/prodcincuentisiete/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcincuentisiete.updateOne({_id: id}, req.body);
   const task = await Prodcincuentisiete.findById(id);
   task.status = !task.status;
   await task.save();

  res.redirect('/clubmaster-detalles/' + id);
});


router.get('/addtocardprodcincuentisiete/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Prodcincuentisiete.findById(productId,async function(err, product){
    if(err){
      return res-redirect('/');
    }


    if(product.status == true) {

      cart.add(product, product.id);
      req.session.cart = cart;
      product.status = !product.status;
      await product.save();
   }else{
      req.flash('success', 'Elija su color y talle primero');
      res.redirect('/clubmaster-detalles/' + productId);
   }


    res.redirect('/shopcart');
  });
});





module.exports = router;
 