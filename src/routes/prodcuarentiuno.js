const express = require('express');
const router = express.Router();
 

// Models
const Prodcuarentiuno = require('../models/prodcuarentiuno');
const Cart = require('../models/cart');
const Cartdolar = require('../models/cartdolar');
 
// Helpers
const { isAuthenticated } = require('../helpers/auth');


router.get('/mujer-casual-ovalada/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodcuarentiuno
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodcuarentiuno) => {
    Prodcuarentiuno.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodcuarentiuno/prodcuarentiuno', {
        prodcuarentiuno,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});





router.post('/prodcuarentiuno/new-prodcuarentiuno',  async (req, res) => {
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
    const newNote = new Prodcuarentiuno({ 
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
    res.redirect('/prodcuarentiunoback/1');
  }
});






router.get('/mujer-casual-ovalada-detalles/:id', async (req, res) => {
  const { id } = req.params;
  const prodcuarentiuno = await Prodcuarentiuno.findById(id);
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('prodcuarentiuno/prodcuarentiunoredirect', {
    prodcuarentiuno,
    products: cart.generateArray(), totalPrice: cart.totalPrice

  });
});




 ////////////////////////////like////////////////////////

 router.get('/likeprodcuarentiuno/:id', async (req, res, next) => {
  // let { id } = req.params;
  // const task = await Ofertauno.findById(id);
  const task = await Prodcuarentiuno.findById(req.params.id);
  task.like = !task.like;
  await task.save();
 // res.redirect('/pedidos/:1');
  res.json(true);
});



// New product
router.get('/prodcuarentiunoback/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodcuarentiuno
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodcuarentiuno) => {
    Prodcuarentiuno.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodcuarentiuno/new-prodcuarentiuno', {
        prodcuarentiuno,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});






// talle y color
router.get('/prodcuarentiuno/tallecolor/:id',  async (req, res) => {
  const prodcuarentiuno = await Prodcuarentiuno.findById(req.params.id);
  res.render('prodcuarentiuno/tallecolor-prodcuarentiuno', { prodcuarentiuno });
});

router.post('/prodcuarentiuno/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcuarentiuno.updateOne({_id: id}, req.body);
  res.redirect('/prodcuarentiunoredirect/' + id);
});




//editar


router.get('/prodcuarentiuno/edit/:id',  async (req, res) => {
  const prodcuarentiuno = await Prodcuarentiuno.findById(req.params.id);
  res.render('prodcuarentiuno/edit-prodcuarentiuno', { prodcuarentiuno });
});

router.post('/prodcuarentiuno/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcuarentiuno.updateOne({_id: id}, req.body);
  res.redirect('/prodcuarentiunoback/1');
});




// Delete 
router.get('/prodcuarentiuno/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Prodcuarentiuno.deleteOne({_id: id});
  res.redirect('/prodcuarentiunoback/1');
});







router.post("/filtroprodcuarentiuno", function(req, res){
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
  var prodcuarentiuno = Prodcuarentiuno.find(flterParameter);
  prodcuarentiuno
  //.find( flterParameter) 
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, data) => {
    prodcuarentiuno.countDocuments((err, count) => {  
  //.exec(function(err,data){
      if(err) throw err;
      res.render("prodcuarentiuno/prodcuarentiuno",
      {
        prodcuarentiuno: data, 
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice
      });
    });
  });
});
 





router.get('/prodcuarentiuno/tallecolor/:id',  async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  const prodcuarentiuno = await Prodcuarentiuno.findById(req.params.id);
  res.render('prodcuarentiuno/tallecolor-prodcuarentiuno', { 
    prodcuarentiuno,
    products: cart.generateArray(), totalPrice: cart.totalPrice

   });
});



router.post('/prodcuarentiuno/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcuarentiuno.updateOne({_id: id}, req.body);
   const task = await Prodcuarentiuno.findById(id);
   task.status = !task.status;
   await task.save();

  res.redirect('/mujer-casual-ovalada-detalles/' + id);
});


router.get('/addtocardprodcuarentiuno/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Prodcuarentiuno.findById(productId,async function(err, product){
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
      res.redirect('/mujer-casual-ovalada-detalles/' + productId);
   }


    res.redirect('/shopcart');
  });
});





module.exports = router;
 