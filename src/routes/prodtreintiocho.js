const express = require('express');
const router = express.Router();
 

// Models
const Prodtreintiocho = require('../models/prodtreintiocho');
const Cart = require('../models/cart');
const Cartdolar = require('../models/cartdolar');
 
// Helpers
const { isAuthenticated } = require('../helpers/auth');


router.get('/mujer-clasico-ovalada/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodtreintiocho
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodtreintiocho) => {
    Prodtreintiocho.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodtreintiocho/prodtreintiocho', {
        prodtreintiocho,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});





router.post('/prodtreintiocho/new-prodtreintiocho',  async (req, res) => {
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
    const newNote = new Prodtreintiocho({ 
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
    res.redirect('/prodtreintiochoback/1');
  }
});






router.get('/mujer-clasico-ovalada-detalles/:id', async (req, res) => {
  const { id } = req.params;
  const prodtreintiocho = await Prodtreintiocho.findById(id);
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('prodtreintiocho/prodtreintiochoredirect', {
    prodtreintiocho,
    products: cart.generateArray(), totalPrice: cart.totalPrice

  });
});




 ////////////////////////////like////////////////////////

 router.get('/likeprodtreintiocho/:id', async (req, res, next) => {
  // let { id } = req.params;
  // const task = await Ofertauno.findById(id);
  const task = await Prodtreintiocho.findById(req.params.id);
  task.like = !task.like;
  await task.save();
 // res.redirect('/pedidos/:1');
  res.json(true);
});



// New product
router.get('/prodtreintiochoback/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodtreintiocho
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodtreintiocho) => {
    Prodtreintiocho.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodtreintiocho/new-prodtreintiocho', {
        prodtreintiocho,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});






// talle y color
router.get('/prodtreintiocho/tallecolor/:id',  async (req, res) => {
  const prodtreintiocho = await Prodtreintiocho.findById(req.params.id);
  res.render('prodtreintiocho/tallecolor-prodtreintiocho', { prodtreintiocho });
});

router.post('/prodtreintiocho/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodtreintiocho.updateOne({_id: id}, req.body);
  res.redirect('/prodtreintiochoredirect/' + id);
});




//editar


router.get('/prodtreintiocho/edit/:id',  async (req, res) => {
  const prodtreintiocho = await Prodtreintiocho.findById(req.params.id);
  res.render('prodtreintiocho/edit-prodtreintiocho', { prodtreintiocho });
});

router.post('/prodtreintiocho/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodtreintiocho.updateOne({_id: id}, req.body);
  res.redirect('/prodtreintiochoback/1');
});




// Delete 
router.get('/prodtreintiocho/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Prodtreintiocho.deleteOne({_id: id});
  res.redirect('/prodtreintiochoback/1');
});







router.post("/filtroprodtreintiocho", function(req, res){
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
  var prodtreintiocho = Prodtreintiocho.find(flterParameter);
  prodtreintiocho
  //.find( flterParameter) 
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, data) => {
    prodtreintiocho.countDocuments((err, count) => {  
  //.exec(function(err,data){
      if(err) throw err;
      res.render("prodtreintiocho/prodtreintiocho",
      {
        prodtreintiocho: data, 
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice
      });
    });
  });
});
 





router.get('/prodtreintiocho/tallecolor/:id',  async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  const prodtreintiocho = await Prodtreintiocho.findById(req.params.id);
  res.render('prodtreintiocho/tallecolor-prodtreintiocho', { 
    prodtreintiocho,
    products: cart.generateArray(), totalPrice: cart.totalPrice

   });
});



router.post('/prodtreintiocho/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodtreintiocho.updateOne({_id: id}, req.body);
   const task = await Prodtreintiocho.findById(id);
   task.status = !task.status;
   await task.save();

  res.redirect('/clubmaster-detalles/' + id);
});


router.get('/addtocardprodtreintiocho/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Prodtreintiocho.findById(productId,async function(err, product){
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
 