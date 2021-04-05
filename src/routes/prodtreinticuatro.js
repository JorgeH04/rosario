const express = require('express');
const router = express.Router();


// Models  
const Prodtreinticuatro = require('../models/prodtreinticuatro');
const Cart = require('../models/cart');
//const Order = require('../models/order');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

  



/////////////////////////////////////////////////////////////////////7


router.post('/prodtreinticuatro/new-prodtreinticuatro',  async (req, res) => {
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
    const newNote = new Prodtreinticuatro({ 
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
    res.redirect('/prodtreinticuatroback/1');
  }
});







router.get('/prodtreinticuatroredirect/:id', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : 0);

  const { id } = req.params;
  const prodtreinticuatro = await Prodtreinticuatro.findById(id);
  res.render('prodtreinticuatro/prodtreinticuatroredirect', {
    prodtreinticuatro,
    products: cart.generateArray(), totalPrice: cart.totalPrice
  });
});
//////////////////////////////////////////////////////////////////


router.get('/prodtreinticuatroindex/:page', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : 0);

   let perPage = 8;
  let page = req.params.page || 1;

  Prodtreinticuatro
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodtreinticuatro) => {
    Prodtreinticuatro.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodtreinticuatro/prodtreinticuatro', {
        prodtreinticuatro,
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



router.get('/prodtreinticuatroback/:page', async (req, res) => {
  let perPage = 8;
  let page = req.params.page || 1;

  Prodtreinticuatro
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodtreinticuatro) => {
    Prodtreinticuatro.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodtreinticuatro/new-prodtreinticuatro', {
        prodtreinticuatro,
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
 

router.get('/prodtreinticuatro/edit/:id',  async (req, res) => {
  const prodtreinticuatro = await Prodtreinticuatro.findById(req.params.id);
  res.render('prodtreinticuatro/edit-prodtreinticuatro', { prodtreinticuatro });
});

router.post('/prodtreinticuatro/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodtreinticuatro.updateOne({_id: id}, req.body);
  res.redirect('/prodtreinticuatroback/:1');
});




// Delete 
router.get('/prodtreinticuatro/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Prodtreinticuatro.deleteOne({_id: id});
  res.redirect('/prodtreinticuatroback/:1');
});






router.get('/addtocardprodtreinticuatro/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Prodtreinticuatro.findById(productId, function(err, product){
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