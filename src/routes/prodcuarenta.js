const express = require('express');
const router = express.Router();
 

// Models
const Prodcuarenta = require('../models/prodcuarenta');
const Cart = require('../models/cart');
const Cartdolar = require('../models/cartdolar');
 
// Helpers
const { isAuthenticated } = require('../helpers/auth');


router.get('/mujer-clasico-redonda/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodcuarenta
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodcuarenta) => {
    Prodcuarenta.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodcuarenta/prodcuarenta', {
        prodcuarenta,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});





router.post('/prodcuarenta/new-prodcuarenta',  async (req, res) => {
  const { 
    name,
    title,
    image,
    imageuno,
    imagedos,
    imagecuarenta,
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
    colorcuarenta,
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
    tallecuarenta,
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
    const newNote = new Prodcuarenta({ 
      name,
      title,
      image,
      imageuno,
      imagedos,
      imagecuarenta,
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
      colorcuarenta,
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
      tallecuarenta,
      oldprice,
      price,
      dolarprice 
    });
    //newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/prodcuarentaback/1');
  }
});





router.get('/mujer-clasico-redonda-detalles/:id', async (req, res) => {
  const { id } = req.params;
  const prodcuarenta = await Prodcuarenta.findById(id);
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('prodcuarenta/prodcuarentaredirect', {
    prodcuarenta,
    products: cart.generateArray(), totalPrice: cart.totalPrice

  });
});




 ////////////////////////////like////////////////////////

 router.get('/likeprodcuarenta/:id', async (req, res, next) => {
  // let { id } = req.params;
  // const task = await Ofertauno.findById(id);
  const task = await Prodcuarenta.findById(req.params.id);
  task.like = !task.like;
  await task.save();
 // res.redirect('/pedidos/:1');
  res.json(true);
});



// New product
router.get('/prodcuarentaback/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodcuarenta
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodcuarenta) => {
    Prodcuarenta.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodcuarenta/new-prodcuarenta', {
        prodcuarenta,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});






// talle y color
router.get('/prodcuarenta/tallecolor/:id',  async (req, res) => {
  const prodcuarenta = await Prodcuarenta.findById(req.params.id);
  res.render('prodcuarenta/tallecolor-prodcuarenta', { prodcuarenta });
});

router.post('/prodcuarenta/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcuarenta.updateOne({_id: id}, req.body);
  res.redirect('/prodcuarentaredirect/' + id);
});




//editar


router.get('/prodcuarenta/edit/:id',  async (req, res) => {
  const prodcuarenta = await Prodcuarenta.findById(req.params.id);
  res.render('prodcuarenta/edit-prodcuarenta', { prodcuarenta });
});

router.post('/prodcuarenta/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcuarenta.updateOne({_id: id}, req.body);
  res.redirect('/prodcuarentaback/1');
});




// Delete 
router.get('/prodcuarenta/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Prodcuarenta.deleteOne({_id: id});
  res.redirect('/prodcuarentaback/1');
});







router.post("/filtroprodcuarenta", function(req, res){
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
  var prodcuarenta = Prodcuarenta.find(flterParameter);
  prodcuarenta
  //.find( flterParameter) 
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, data) => {
    prodcuarenta.countDocuments((err, count) => {  
  //.exec(function(err,data){
      if(err) throw err;
      res.render("prodcuarenta/prodcuarenta",
      {
        prodcuarenta: data, 
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice
      });
    });
  });
});
 





router.get('/prodcuarenta/tallecolor/:id',  async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  const prodcuarenta = await Prodcuarenta.findById(req.params.id);
  res.render('prodcuarenta/tallecolor-prodcuarenta', { 
    prodcuarenta,
    products: cart.generateArray(), totalPrice: cart.totalPrice

   });
});



router.post('/prodcuarenta/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcuarenta.updateOne({_id: id}, req.body);
   const task = await Prodcuarenta.findById(id);
   task.status = !task.status;
   await task.save();

  res.redirect('/clubmaster-detalles/' + id);
});


router.get('/addtocardprodcuarenta/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Prodcuarenta.findById(productId,async function(err, product){
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
 