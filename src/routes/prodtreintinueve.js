const express = require('express');
const router = express.Router();
 

// Models
const Prodtreintinueve = require('../models/prodtreintinueve');
const Cart = require('../models/cart');
const Cartdolar = require('../models/cartdolar');
 
// Helpers
const { isAuthenticated } = require('../helpers/auth');


router.get('/mujer-clasico-rectangular/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodtreintinueve
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodtreintinueve) => {
    Prodtreintinueve.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodtreintinueve/prodtreintinueve', {
        prodtreintinueve,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});



router.get('/mujer-clasico-rectangular-detalles/:id', async (req, res) => {
    const { id } = req.params;
    const prodtreintinueve = await Prodtreintinueve.findById(id);
    var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
  
    res.render('prodtreintinueve/prodtreintinueveredirect', {
      prodtreintinueve,
      products: cart.generateArray(), totalPrice: cart.totalPrice
  
    });
  });

  

  

router.post('/prodtreintinueve/new-prodtreintinueve',  async (req, res) => {
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
    const newNote = new Prodtreintinueve({ 
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
    res.redirect('/prodtreintinueveback/1');
  }
});










 ////////////////////////////like////////////////////////

 router.get('/likeprodtreintinueve/:id', async (req, res, next) => {
  // let { id } = req.params;
  // const task = await Ofertauno.findById(id);
  const task = await Prodtreintinueve.findById(req.params.id);
  task.like = !task.like;
  await task.save();
 // res.redirect('/pedidos/:1');
  res.json(true);
});



// New product
router.get('/prodtreintinueveback/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodtreintinueve
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodtreintinueve) => {
    Prodtreintinueve.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodtreintinueve/new-prodtreintinueve', {
        prodtreintinueve,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});






// talle y color
router.get('/prodtreintinueve/tallecolor/:id',  async (req, res) => {
  const prodtreintinueve = await Prodtreintinueve.findById(req.params.id);
  res.render('prodtreintinueve/tallecolor-prodtreintinueve', { prodtreintinueve });
});

router.post('/prodtreintinueve/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodtreintinueve.updateOne({_id: id}, req.body);
  res.redirect('/prodtreintinueveredirect/' + id);
});




//editar


router.get('/prodtreintinueve/edit/:id',  async (req, res) => {
  const prodtreintinueve = await Prodtreintinueve.findById(req.params.id);
  res.render('prodtreintinueve/edit-prodtreintinueve', { prodtreintinueve });
});

router.post('/prodtreintinueve/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodtreintinueve.updateOne({_id: id}, req.body);
  res.redirect('/prodtreintinueveback/1');
});




// Delete 
router.get('/prodtreintinueve/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Prodtreintinueve.deleteOne({_id: id});
  res.redirect('/prodtreintinueveback/1');
});







router.post("/filtroprodtreintinueve", function(req, res){
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
  var prodtreintinueve = Prodtreintinueve.find(flterParameter);
  prodtreintinueve
  //.find( flterParameter) 
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, data) => {
    prodtreintinueve.countDocuments((err, count) => {  
  //.exec(function(err,data){
      if(err) throw err;
      res.render("prodtreintinueve/prodtreintinueve",
      {
        prodtreintinueve: data, 
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice
      });
    });
  });
});
 





router.get('/prodtreintinueve/tallecolor/:id',  async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  const prodtreintinueve = await Prodtreintinueve.findById(req.params.id);
  res.render('prodtreintinueve/tallecolor-prodtreintinueve', { 
    prodtreintinueve,
    products: cart.generateArray(), totalPrice: cart.totalPrice

   });
});



router.post('/prodtreintinueve/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodtreintinueve.updateOne({_id: id}, req.body);
   const task = await Prodtreintinueve.findById(id);
   task.status = !task.status;
   await task.save();

  res.redirect('/clubmaster-detalles/' + id);
});


router.get('/addtocardprodtreintinueve/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Prodtreintinueve.findById(productId,async function(err, product){
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
 