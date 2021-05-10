const express = require('express');
const router = express.Router();


// Models
const Proddieciseis = require('../models/proddieciseis');
const Cart = require('../models/cart');
//const Order = require('../models/order');
const Cartdolar = require('../models/cartdolar');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

  



/////////////////////////////////////////////////////////////////////7


router.post('/proddieciseis/new-proddieciseis',  async (req, res) => {
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
    imageveinte,
    imageveintiuno,
    imageveintidos,
    imageveintitres,
    imageveinticuatro,
    imageveinticinco,
    imageveintiseis,
    imageveintisiete,
    imageveintiocho,
    imageveintinueve,
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
    colorveinte,
    colorveintidos,
    colorveintitres,
    colorveinticuatro,
    colorveinticinco,
    colorveintiseis,
    colorveintisiete,
    colorveintiocho,
    colorveintinueve,

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
    const newNote = new Proddieciseis({ 
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
      imageveinte,
      imageveintiuno,
      imageveintidos,
      imageveintitres,
      imageveinticuatro,
      imageveinticinco,
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
      colorveinte,
      colorveintidos,
      colorveintitres,
      colorveinticuatro,
      colorveinticinco,
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
    res.redirect('/proddieciseisback/1');
  }
});


router.get('/likeproddieciseis/:id', async (req, res, next) => {
  // let { id } = req.params;
  // const task = await Ofertauno.findById(id);
  const task = await Proddieciseis.findById(req.params.id);
  task.like = !task.like;
  await task.save();
 // res.redirect('/pedidos/:1');
  res.json(true);
});  




router.get('/wayfarer-detalles/:id', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : 0);

  const { id } = req.params;
  const proddieciseis = await Proddieciseis.findById(id);
  res.render('proddieciseis/proddieciseisredirect', {
    proddieciseis,
    products: cart.generateArray(), totalPrice: cart.totalPrice
  });
});
//////////////////////////////////////////////////////////////////


router.get('/wayfarer/:page', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : 0);

  let perPage = 16;
  let page = req.params.page || 1;

  Proddieciseis
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, proddieciseis) => {
    Proddieciseis.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('proddieciseis/proddieciseis', {
        proddieciseis,
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





router.post("/filtroproddieciseis", function(req, res){
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
  var proddieciseis = Proddieciseis.find(flterParameter);
  proddieciseis
  //.find( flterParameter) 
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, data) => {
    proddieciseis.countDocuments((err, count) => {  
  //.exec(function(err,data){
      if(err) throw err;
      res.render("proddieciseis/proddieciseis",
      {
        proddieciseis: data, 
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice
      });
    });
  });
});




////////////////////////////////////////////////////////////////////7



router.get('/proddieciseisback/:page', async (req, res) => {
  let perPage = 16;
  let page = req.params.page || 1;

  Proddieciseis
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, proddieciseis) => {
    Proddieciseis.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('proddieciseis/new-proddieciseis', {
        proddieciseis,
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


 



//editar
 

router.get('/proddieciseis/edit/:id',  async (req, res) => {
  const proddieciseis = await Proddieciseis.findById(req.params.id);
  res.render('proddieciseis/edit-proddieciseis', { proddieciseis });
});

router.post('/proddieciseis/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Proddieciseis.updateOne({_id: id}, req.body);
  res.redirect('/proddieciseisback/:1');
});




// Delete 
router.get('/proddieciseis/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Proddieciseis.deleteOne({_id: id});
  res.redirect('/proddieciseisback/:1');
});






 







  
//talllecolor

router.get('/proddieciseis/tallecolor/:id',  async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  const proddieciseis = await Proddieciseis.findById(req.params.id);
  res.render('proddieciseis/tallecolor-proddieciseis', { 
    proddieciseis,
    products: cart.generateArray(), totalPrice: cart.totalPrice

   });
});



router.post('/proddieciseis/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Proddieciseis.updateOne({_id: id}, req.body);
   const task = await Proddieciseis.findById(id);
   task.status = !task.status;
   await task.save();

  res.redirect('/wayfarer-detalles/' + id);
});


router.get('/addtocardproddieciseis/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Prodproddieciseis.findById(productId,async function(err, product){
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
      res.redirect('/wayfarer-detalles/' + productId);
   }


    res.redirect('/shopcart');
  });
});




module.exports = router;
