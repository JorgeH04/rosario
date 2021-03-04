const express = require('express');
const router = express.Router();


// Models
const Prodveinte = require('../models/prodveinte');
const Cart = require('../models/cart');
//const Order = require('../models/order');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

  



/////////////////////////////////////////////////////////////////////7


router.post('/prodveinte/new-prodveinte',  async (req, res) => {
  const { 
    name,
    title,
    image,
    imagedos,
    imagetres,
    imagecuatro,
    imagecinco,
    description,
    filtroprice,
    enstock,
    color,
    coloruno,
    colordos,
    colortres,
    colorcuatro,
    talle,
    talleuno,
    talledos,
    talletres,
    tallecuatro,
    tallecinco,
    talleseis,
    oldprice,
    price
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
    const newNote = new Prodveinte({ 
        name,
        title,
        image,
        imagedos,
        imagetres,
        imagecuatro,
        imagecinco,
        description,
        filtroprice,
        enstock,
        color,
        coloruno,
        colordos,
        colortres,
        colorcuatro,
        talle,
        talleuno,
        talledos,
        talletres,
        tallecuatro,
        tallecinco,
        talleseis,
        oldprice,
        price
    });
    //newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/prodveinteback/1');
  }
});







router.get('/prodveinteredirect/:id', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : 0);

  const { id } = req.params;
  const prodveinte = await Prodveinte.findById(id);
  res.render('prodveinte/prodveinteredirect', {
    prodveinte,
    products: cart.generateArray(), totalPrice: cart.totalPrice
  });
});
//////////////////////////////////////////////////////////////////


router.get('/prodveinteindex/:page', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : 0);

   let perPage = 8;
  let page = req.params.page || 1;

  Prodveinte
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodveinte) => {
    Prodveinte.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodveinte/prodveinte', {
        prodveinte,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice
      });
    });
  });
});






router.get("/search", function(req, res){
  let perPage = 8;
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



router.get('/prodveinteback/:page', async (req, res) => {
  let perPage = 8;
  let page = req.params.page || 1;

  Prodveinte
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodveinte) => {
    Prodveinte.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodveinte/new-prodveinte', {
        prodveinte,
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
// router.get('/prodtres/tallecolor/:id',  async (req, res) => {
//   const prodtres = await Prodtres.findById(req.params.id);
//   res.render('prodtres/tallecolor-prodtres', { prodtres });
// });

// router.post('/prodtres/tallecolor/:id',  async (req, res) => {
//   const { id } = req.params;
//   await Prodtres.updateOne({_id: id}, req.body);
//   res.redirect('/prodtresredirect/' + id);
// });




//editar
 

router.get('/prodveinte/edit/:id',  async (req, res) => {
  const prodveinte = await Prodveinte.findById(req.params.id);
  res.render('prodveinte/edit-prodveinte', { prodveinte });
});

router.post('/prodveinte/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodveinte.updateOne({_id: id}, req.body);
  res.redirect('/prodveinteback/:1');
});




// Delete 
router.get('/prodveinte/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Prodveinte.deleteOne({_id: id});
  res.redirect('/prodveinteback/:1');
});






router.get('/addtocardprodveinte/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Prodveinte.findById(productId, function(err, product){
    if(err){
      return res-redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    req.flash('success', 'Producto agregado al carro exitosamente');
    //res.redirect('/prodsieteredirect/' + productId);
    res.redirect('/shopcart');
  });
});



module.exports = router;
