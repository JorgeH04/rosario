const express = require('express');
const router = express.Router();


// Models  
const Prodtreintidos = require('../models/prodtreintidos');
const Cart = require('../models/cart');
//const Order = require('../models/order');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

  



/////////////////////////////////////////////////////////////////////7


router.post('/prodtreintidos/new-prodtreintidos',  async (req, res) => {
  const { 
    name,
    title,
    image,
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
    const newNote = new Prodtreintidos({ 
      name,
      title,
      image,
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
    res.redirect('/prodtreintidosback/1');
  }
});







router.get('/roundh-detalles/:id', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : 0);

  const { id } = req.params;
  const prodtreintidos = await Prodtreintidos.findById(id);
  res.render('prodtreintidos/prodtreintidosredirect', {
    prodtreintidos,
    products: cart.generateArray(), totalPrice: cart.totalPrice
  });
});
//////////////////////////////////////////////////////////////////


router.get('/roundh/:page', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : 0);

   let perPage = 20;
  let page = req.params.page || 1;

  Prodtreintidos
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodtreintidos) => {
    Prodtreintidos.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodtreintidos/prodtreintidos', {
        prodtreintidos,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice
      });
    });
  });
});






router.get("/search", function(req, res){
  let perPage = 20;
  let page = req.params.page || 1;

  var noMatch = null;
  if(req.query.search) {
      const regex = new RegExp(escape(req.query.search), 'gi');
      // Get all campgrounds from DB
      console.log(req.query.search)
      Prodtres
      // finding all documents
      .find({title: regex}) 
      .sort({ _id: -1 })
      .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
      .limit(perPage) // output just 9 items
      .exec((err, produno) => {
       Prodtres.countDocuments((err, count) => {
        if (err) return next(err);
            res.render("prodtres/prodtres",{
              prodtres, 
              current: page,
              pages: Math.ceil(count / perPage)
            });
          });
        });
  } else {
      // Get all campgrounds from DB
      Prodtres.find({}, function(err, prodtres){
         if(err){
             console.log(err);
         } else {
            res.render("prodtres/prodtres",{
              prodtres,
              current: page,
              pages: Math.ceil(count / perPage)
              });
         }
      });
  }
});







////////////////////////////////////////////////////////////////////7



router.get('/prodtreintidosback/:page', async (req, res) => {
  let perPage = 20;
  let page = req.params.page || 1;

  Prodtreintidos
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodtreintidos) => {
    Prodtreintidos.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodtreintidos/new-prodtreintidos', {
        prodtreintidos,
        current: page,
        pages: Math.ceil(count / perPage)
      });
    });
  });
});


router.get("/searchback", function(req, res){
  let perPage = 8;
  let page = req.params.page || 1;

  var noMatch = null;
  if(req.query.search) {
      const regex = new RegExp(escape(req.query.search), 'gi');
      // Get all campgrounds from DB
      console.log(req.query.search)
      Produno
      // finding all documents
      .find({title: regex}) 
      .sort({ _id: -1 })
      .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
      .limit(perPage) // output just 9 items
      .exec((err, produno) => {
       Produno.countDocuments((err, count) => {
        if (err) return next(err);
            res.render("produno/new-produno",{
              produno, 
              current: page,
              pages: Math.ceil(count / perPage)
            });
          });
        });
  } else {
      // Get all campgrounds from DB
      Produno.find({}, function(err, produno){
         if(err){
             console.log(err);
         } else {
            res.render("produno/new-produno",{
              produno,
              current: page,
              pages: Math.ceil(count / perPage)
              });
         }
      });
  }
});


///////////////////////////////////////////////////////////////////////7


// // talle y color
router.get('/prodtreintidos/tallecolor/:id',  async (req, res) => {
  const prodtreintidos = await Prodtreintidos.findById(req.params.id);
  res.render('prodtreintidos/tallecolor-prodtreintidos', { prodtreintidos });
});

router.post('/prodtreintidos/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodtreintidos.updateOne({_id: id}, req.body);
   const task = await Prodtreintidos.findById(id);
   task.status = !task.status;
   await task.save();

  res.redirect('/roundh-detalles/' + id);
});




//editar
 

router.get('/prodtreintidos/edit/:id',  async (req, res) => {
  const prodtreintidos = await Prodtreintidos.findById(req.params.id);
  res.render('prodtreintidos/edit-prodtreintidos', { prodtreintidos });
});

router.post('/prodtreintidos/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodtreintidos.updateOne({_id: id}, req.body);
  res.redirect('/prodtreintidosback/:1');
});




// Delete 
router.get('/prodtreintidos/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Prodtreintidos.deleteOne({_id: id});
  res.redirect('/prodtreintidosback/:1');
});






 



router.get('/addtocardprodtreintidos/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Prodtreintidos.findById(productId,async function(err, product){
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
      res.redirect('/roundh-detalles/' + productId);
   }


    res.redirect('/shopcart');
  });
});



module.exports = router;