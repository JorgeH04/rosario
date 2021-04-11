const express = require('express');
const router = express.Router();
 
// Models
const Prodcuarentidos = require('../models/prodcuarentidos');
const Cart = require('../models/cart');
const Cartdolar = require('../models/cartdolar');
 
// Helpers
const { isAuthenticated } = require('../helpers/auth');


router.get('/mujer-casual-rectangular/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodcuarentidos
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodcuarentidos) => {
    Prodcuarentidos.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodcuarentidos/prodcuarentidos', {
        prodcuarentidos,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});





router.post('/prodcuarentidos/new-prodcuarentidos',  async (req, res) => {
  const { 
    name,
    title,
    image,
    imageuno,
    imagedos,
    imagecuarentidos,
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
    colorcuarentidos,
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
    tallecuarentidos,
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
    const newNote = new Prodcuarentidos({ 
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
      tallecuarentidos,
      oldprice,
      price,
      dolarprice 
    });
    //newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/prodcuarentidosback/1');
  }
});






router.get('/mujer-casual-rectangular-detalles/:id', async (req, res) => {
  const { id } = req.params;
  const prodcuarentidos = await Prodcuarentidos.findById(id);
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('prodcuarentidos/prodcuarentidosredirect', {
    prodcuarentidos,
    products: cart.generateArray(), totalPrice: cart.totalPrice

  });
});




 ////////////////////////////like////////////////////////

 router.get('/likeprodcuarentidos/:id', async (req, res, next) => {
  // let { id } = req.params;
  // const task = await Ofertauno.findById(id);
  const task = await Prodcuarentidos.findById(req.params.id);
  task.like = !task.like;
  await task.save();
 // res.redirect('/pedidos/:1');
  res.json(true);
});



// New product
router.get('/prodcuarentidosback/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodcuarentidos
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodcuarentidos) => {
    Prodcuarentidos.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodcuarentidos/new-prodcuarentidos', {
        prodcuarentidos,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});






// talle y color
router.get('/prodcuarentidos/tallecolor/:id',  async (req, res) => {
  const prodcuarentidos = await Prodcuarentidos.findById(req.params.id);
  res.render('prodcuarentidos/tallecolor-prodcuarentidos', { prodcuarentidos });
});

router.post('/prodcuarentidos/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcuarentidos.updateOne({_id: id}, req.body);
  res.redirect('/prodcuarentidosredirect/' + id);
});




//editar


router.get('/prodcuarentidos/edit/:id',  async (req, res) => {
  const prodcuarentidos = await Prodcuarentidos.findById(req.params.id);
  res.render('prodcuarentidos/edit-prodcuarentidos', { prodcuarentidos });
});

router.post('/prodcuarentidos/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcuarentidos.updateOne({_id: id}, req.body);
  res.redirect('/prodcuarentidosback/1');
});




// Delete 
router.get('/prodcuarentidos/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Prodcuarentidos.deleteOne({_id: id});
  res.redirect('/prodcuarentidosback/1');
});







router.post("/filtroprodcuarentidos", function(req, res){
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
  var prodcuarentidos = Prodcuarentidos.find(flterParameter);
  prodcuarentidos
  //.find( flterParameter) 
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, data) => {
    prodcuarentidos.countDocuments((err, count) => {  
  //.exec(function(err,data){
      if(err) throw err;
      res.render("prodcuarentidos/prodcuarentidos",
      {
        prodcuarentidos: data, 
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice
      });
    });
  });
});
 





router.get('/prodcuarentidos/tallecolor/:id',  async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  const prodcuarentidos = await Prodcuarentidos.findById(req.params.id);
  res.render('prodcuarentidos/tallecolor-prodcuarentidos', { 
    prodcuarentidos,
    products: cart.generateArray(), totalPrice: cart.totalPrice

   });
});



router.post('/prodcuarentidos/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcuarentidos.updateOne({_id: id}, req.body);
   const task = await Prodcuarentidos.findById(id);
   task.status = !task.status;
   await task.save();

  res.redirect('/clubmaster-detalles/' + id);
});


router.get('/addtocardprodcuarentidos/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Prodcuarentidos.findById(productId,async function(err, product){
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
 