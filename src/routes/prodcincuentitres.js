const express = require('express');
const router = express.Router();
 

// Models
const Prodcincuentitres = require('../models/prodcincuentitres');
const Cart = require('../models/cart');
const Cartdolar = require('../models/cartdolar');
 
// Helpers
const { isAuthenticated } = require('../helpers/auth');


router.get('/hombre-moda-ovalada/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodcincuentitres
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodcincuentitres) => {
    Prodcincuentitres.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodcincuentitres/prodcincuentitres', {
        prodcincuentitres,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});





router.post('/prodcincuentitres/new-prodcincuentitres',  async (req, res) => {
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
    color,
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
    const newNote = new Prodcincuentitres({ 
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
      color,
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
    res.redirect('/prodcincuentitresback/1');
  }
});






router.get('/hombre-moda-ovalada-detalles/:id', async (req, res) => {
  const { id } = req.params;
  const prodcincuentitres = await Prodcincuentitres.findById(id);
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('prodcincuentitres/prodcincuentitresredirect', {
    prodcincuentitres,
    products: cart.generateArray(), totalPrice: cart.totalPrice

  });
});




 ////////////////////////////like////////////////////////

 router.get('/likeprodcincuentitres/:id', async (req, res, next) => {
  // let { id } = req.params;
  // const task = await Ofertauno.findById(id);
  const task = await Prodcincuentitres.findById(req.params.id);
  task.like = !task.like;
  await task.save();
 // res.redirect('/pedidos/:1');
  res.json(true);
});



// New product
router.get('/prodcincuentitresback/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodcincuentitres
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodcincuentitres) => {
    Prodcincuentitres.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodcincuentitres/new-prodcincuentitres', {
        prodcincuentitres,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});









//editar


router.get('/prodcincuentitres/edit/:id',  async (req, res) => {
  const prodcincuentitres = await Prodcincuentitres.findById(req.params.id);
  res.render('prodcincuentitres/edit-prodcincuentitres', { prodcincuentitres });
});

router.post('/prodcincuentitres/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcincuentitres.updateOne({_id: id}, req.body);
  res.redirect('/prodcincuentitresback/1');
});




// Delete 
router.get('/prodcincuentitres/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Prodcincuentitres.deleteOne({_id: id});
  res.redirect('/prodcincuentitresback/1');
});







router.post("/filtroprodcincuentitres", function(req, res){
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
  var prodcincuentitres = Prodcincuentitres.find(flterParameter);
  prodcincuentitres
  //.find( flterParameter) 
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, data) => {
    prodcincuentitres.countDocuments((err, count) => {  
  //.exec(function(err,data){
      if(err) throw err;
      res.render("prodcincuentitres/prodcincuentitres",
      {
        prodcincuentitres: data, 
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice
      });
    });
  });
});
 





router.get('/prodcincuentitres/tallecolor/:id',  async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  const prodcincuentitres = await Prodcincuentitres.findById(req.params.id);
  res.render('prodcincuentitres/tallecolor-prodcincuentitres', { 
    prodcincuentitres,
    products: cart.generateArray(), totalPrice: cart.totalPrice

   });
});



router.post('/prodcincuentitres/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcincuentitres.updateOne({_id: id}, req.body);
   const task = await Prodcincuentitres.findById(id);
   task.status = !task.status;
   await task.save();

  res.redirect('/hombre-moda-ovalada-detalles/' + id);
});


router.get('/addtocardprodcincuentitres/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Prodcincuentitres.findById(productId,async function(err, product){
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
      res.redirect('/hombre-moda-ovalada-detalles/' + productId);
   }


    res.redirect('/shopcart');
  });
});





module.exports = router;
 