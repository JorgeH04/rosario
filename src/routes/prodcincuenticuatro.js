const express = require('express');
const router = express.Router();
 

// Models
const Prodcincuenticuatro = require('../models/prodcincuenticuatro');
const Cart = require('../models/cart');
const Cartdolar = require('../models/cartdolar');
 
// Helpers
const { isAuthenticated } = require('../helpers/auth');


router.get('/hombre-moda-rectangular/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodcincuenticuatro
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodcincuenticuatro) => {
    Prodcincuenticuatro.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodcincuenticuatro/prodcincuenticuatro', {
        prodcincuenticuatro,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});





router.post('/prodcincuenticuatro/new-prodcincuenticuatro',  async (req, res) => {
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
    const newNote = new Prodcincuenticuatro({ 
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
    res.redirect('/prodcincuenticuatroback/1');
  }
});






router.get('/hombre-moda-rectangular-detalles/:id', async (req, res) => {
  const { id } = req.params;
  const prodcincuenticuatro = await Prodcincuenticuatro.findById(id);
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('prodcincuenticuatro/prodcincuenticuatroredirect', {
    prodcincuenticuatro,
    products: cart.generateArray(), totalPrice: cart.totalPrice

  });
});




 ////////////////////////////like////////////////////////

 router.get('/likeprodcincuenticuatro/:id', async (req, res, next) => {
  // let { id } = req.params;
  // const task = await Ofertauno.findById(id);
  const task = await Prodcincuenticuatro.findById(req.params.id);
  task.like = !task.like;
  await task.save();
 // res.redirect('/pedidos/:1');
  res.json(true);
});



// New product
router.get('/prodcincuenticuatroback/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodcincuenticuatro
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodcincuenticuatro) => {
    Prodcincuenticuatro.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodcincuenticuatro/new-prodcincuenticuatro', {
        prodcincuenticuatro,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});






// talle y color
router.get('/prodcincuenticuatro/tallecolor/:id',  async (req, res) => {
  const prodcincuenticuatro = await Prodcincuenticuatro.findById(req.params.id);
  res.render('prodcincuenticuatro/tallecolor-prodcincuenticuatro', { prodcincuenticuatro });
});

router.post('/prodcincuenticuatro/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcincuenticuatro.updateOne({_id: id}, req.body);
  res.redirect('/prodcincuenticuatroredirect/' + id);
});




//editar


router.get('/prodcincuenticuatro/edit/:id',  async (req, res) => {
  const prodcincuenticuatro = await Prodcincuenticuatro.findById(req.params.id);
  res.render('prodcincuenticuatro/edit-prodcincuenticuatro', { prodcincuenticuatro });
});

router.post('/prodcincuenticuatro/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcincuenticuatro.updateOne({_id: id}, req.body);
  res.redirect('/prodcincuenticuatroback/1');
});




// Delete 
router.get('/prodcincuenticuatro/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Prodcincuenticuatro.deleteOne({_id: id});
  res.redirect('/prodcincuenticuatroback/1');
});







router.post("/filtroprodcincuenticuatro", function(req, res){
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
  var prodcincuenticuatro = Prodcincuenticuatro.find(flterParameter);
  prodcincuenticuatro
  //.find( flterParameter) 
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, data) => {
    prodcincuenticuatro.countDocuments((err, count) => {  
  //.exec(function(err,data){
      if(err) throw err;
      res.render("prodcincuenticuatro/prodcincuenticuatro",
      {
        prodcincuenticuatro: data, 
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice
      });
    });
  });
});
 





router.get('/prodcincuenticuatro/tallecolor/:id',  async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  const prodcincuenticuatro = await Prodcincuenticuatro.findById(req.params.id);
  res.render('prodcincuenticuatro/tallecolor-prodcincuenticuatro', { 
    prodcincuenticuatro,
    products: cart.generateArray(), totalPrice: cart.totalPrice

   });
});



router.post('/prodcincuenticuatro/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodcincuenticuatro.updateOne({_id: id}, req.body);
   const task = await Prodcincuenticuatro.findById(id);
   task.status = !task.status;
   await task.save();

  res.redirect('/clubmaster-detalles/' + id);
});


router.get('/addtocardprodcincuenticuatro/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Prodcincuenticuatro.findById(productId,async function(err, product){
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
 