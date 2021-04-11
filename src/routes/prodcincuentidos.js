const express = require('express');
const router = express.Router();
 

// Models
const Prodcincuentidos = require('../models/prodcincuentidos');
const Cart = require('../models/cart');
const Cartdolar = require('../models/cartdolar');
 
// Helpers
const { isAuthenticated } = require('../helpers/auth');


router.get('/hombre-clasico-redonda/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodcincuentidos
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodcincuentidos) => {
    Prodcincuentidos.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodcincuentidos/prodcincuentidos', {
        prodcincuentidos,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});





router.post('/prodcincuentidos/new-prodcincuentidos',  async (req, res) => {
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
    const newNote = new Prodcincuentidos({ 
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
    res.redirect('/prodcincuentidosback/1');
  }
});






router.get('/hombre-clasico-redonda-detalles/:id', async (req, res) => {
  const { id } = req.params;
  const prodcincuentidos = await Prodcincuentidos.findById(id);
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('prodcincuentidos/prodcincuentidosredirect', {
    prodcincuentidos,
    products: cart.generateArray(), totalPrice: cart.totalPrice

  });
});




 ////////////////////////////like////////////////////////

 router.get('/likeprodcincuentidos/:id', async (req, res, next) => {
  // let { id } = req.params;
  // const task = await Ofertauno.findById(id);
  const task = await Prodcincuentidos.findById(req.params.id);
  task.like = !task.like;
  await task.save();
 // res.redirect('/pedidos/:1');
  res.json(true);
});



// New product
router.get('/prodcincuentidosback/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodcincuentidos
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodcincuentidos) => {
    Prodcincuentidos.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodcincuentidos/new-prodcincuentidos', {
        prodcincuentidos,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});






// talle y color
router.get('/prodcincuentidos/tallecolor/:id',  async (req, res) => {
  const prodcincuentidos = await Prodcincuentidos.findById(req.params.id);
  res.render('prodcincuentidos/tallecolor-prodcincuentidos', { prodcincuentidos });
});

router.post('/prodcincuentidos/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcincuentidos.updateOne({_id: id}, req.body);
  res.redirect('/prodcincuentidosredirect/' + id);
});




//editar


router.get('/prodcincuentidos/edit/:id',  async (req, res) => {
  const prodcincuentidos = await Prodcincuentidos.findById(req.params.id);
  res.render('prodcincuentidos/edit-prodcincuentidos', { prodcincuentidos });
});

router.post('/prodcincuentidos/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcincuentidos.updateOne({_id: id}, req.body);
  res.redirect('/prodcincuentidosback/1');
});




// Delete 
router.get('/prodcincuentidos/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Prodcincuentidos.deleteOne({_id: id});
  res.redirect('/prodcincuentidosback/1');
});







router.post("/filtroprodcincuentidos", function(req, res){
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
  var prodcincuentidos = Prodcincuentidos.find(flterParameter);
  prodcincuentidos
  //.find( flterParameter) 
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, data) => {
    prodcincuentidos.countDocuments((err, count) => {  
  //.exec(function(err,data){
      if(err) throw err;
      res.render("prodcincuentidos/prodcincuentidos",
      {
        prodcincuentidos: data, 
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice
      });
    });
  });
});
 





router.get('/prodcincuentidos/tallecolor/:id',  async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  const prodcincuentidos = await Prodcincuentidos.findById(req.params.id);
  res.render('prodcincuentidos/tallecolor-prodcincuentidos', { 
    prodcincuentidos,
    products: cart.generateArray(), totalPrice: cart.totalPrice

   });
});



router.post('/prodcincuentidos/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcincuentidos.updateOne({_id: id}, req.body);
   const task = await Prodcincuentidos.findById(id);
   task.status = !task.status;
   await task.save();

  res.redirect('/clubmaster-detalles/' + id);
});


router.get('/addtocardprodcincuentidos/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Prodcincuentidos.findById(productId,async function(err, product){
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
 