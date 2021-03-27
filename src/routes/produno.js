const express = require('express');
const router = express.Router();
const mercadopago = require("mercadopago");
const paypal = require('paypal-rest-sdk');

 
// Models
const Produno = require('../models/produno');
const Cart = require('../models/cart');
const Cartdolar = require('../models/cartdolar');
const Order = require('../models/order');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

const userController=require('../config/controllers');
const User = require('../models/User');
const nodeMailer = require('../config/nodemailer');


const resetMailer=require('../mailer/resetPasswordmailer');
const resetSuccess=require('../mailer/resetPasswordSuccess');


const venta =require('../mailer/resetPasswordSuccess');
const pago =require('../mailer/resetPasswordSuccess');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AQc6BTFp8STtOFTt6GTue2HBmoVlSlnJXuLa2i_U2giuOwqCm6wVQB8EP5n925UgXb08pK1a3AE2y6XL',
  'client_secret': 'EFSgKO0QQGE-URzmVMB-9eT9fOxAPXPEpNZ07RiyZOnb5m5PoizR0q7ML3i8RR1X0W9TWCOC-bmM-mPK'
});

const PUBLISHABLE_KEY = 'pk_test_tLOvqVJ7f6zGY6ZQIs8GV0Sa00MVT90sTm'
const SECRET_KEY = 'sk_test_rCp23dn4fDasEqfGiVkhHvii00SyEkd4GS'





/////////////////////////////////////////front//////////////////////////////////////////////////

router.get('/aviador/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Produno 
  .find({}) // finding all documents
  .sort( {timestamp: -1})
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, produno) => {
    Produno.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('produno/produno', {
        produno,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});






router.get('/aviador-detalles/:id', async (req, res) => {
  const { id } = req.params;
  const produno = await Produno.findById(id);
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('produno/produnoredirect', {
    produno,
    products: cart.generateArray(), totalPrice: cart.totalPrice

  }); 
});




////////////////////////////////////////back/////////////////////////////////////////////////////7

router.post('/produno/new-produno',  async (req, res) => {
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
    const newNote = new Produno({ 
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
    res.redirect('/produnoback/:1');
  }
});





router.get('/produnoback/:page', async (req, res) => {


  let perPage =12;
  let page = req.params.page || 1;

  Produno 
  .find({}) // finding all documents
  .sort( {timestamp: -1})
 
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, produno) => {
    Produno.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('produno/new-produno', {
        produno,
        current: page,
        pages: Math.ceil(count / perPage)
      });
    });
  });
});








router.get("/searchback", function(req, res){
  var noMatch = null;
  if(req.query.search) {
      const regex = new RegExp(escape(req.query.search), 'gi');
      // Get all campgrounds from DB
      console.log(req.query.search)
      Produno.find({title: regex}, function(err, produno){
         if(err){
             console.log(err);
         } else {
            if(produno.length < 1) {
                noMatch = "No campgrounds match that query, please try again.";
            }
            res.render("produno/new-produno",{produno, noMatch: noMatch});
         }
      });

  } else {
      // Get all campgrounds from DB
      Produno.find({}, function(err, produno){
         if(err){
             console.log(err);
         } else {
            res.render("produno/produno",{produno, noMatch: noMatch});
         }
      });
  }
});


  









router.get("/search", function(req, res){
  var noMatch = null;
  if(req.query.search) {
      const regex = new RegExp(escape(req.query.search), 'gi');
      // Get all campgrounds from DB
      console.log(req.query.search)
      Produno.find({title: regex}, function(err, produno){
         if(err){
             console.log(err);
         } else {
            if(produno.length < 1) {
                noMatch = "No campgrounds match that query, please try again.";
            }
            res.render("produno/produno",{produno, noMatch: noMatch});
         }
      });

  } else {
      // Get all campgrounds from DB
      Produno.find({}, function(err, produno){
         if(err){
             console.log(err);
         } else {
            res.render("produno/produno",{produno, noMatch: noMatch});
         }
      });
  }
});



/////////////////////////////////filter/////////////////////////////////////////////




router.post("/filtroprod", function(req, res){
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
  var produno = Produno.find(flterParameter);
  produno
  //.find( flterParameter) 
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, data) => {
    produno.countDocuments((err, count) => {  
  //.exec(function(err,data){
      if(err) throw err;
      res.render("produno/produno",
      {
        produno: data, 
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice
      });
    });
  });
});






        

router.post("/filtrocolor", function(req, res){
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  var flrtName = req.body.filtrocolor;

  if(flrtName!='' ) {

    var flterParameter={ $and:[{ color:flrtName},
      {$and:[{},{}]}
      ]
       
    }
    }else{
      var flterParameter={}
  }
  var produno = Produno.find(flterParameter);
  produno
  //.find( flterParameter) 
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, data) => {
    produno.countDocuments((err, count) => {  
  //.exec(function(err,data){
      if(err) throw err;
      res.render("produno/produno",
      {
        produno: data, 
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});






router.post("/filtrocolor", function(req, res){

  let perPage = 15;
  let page = req.params.page || 1;

  var flrtName = req.body.filtrocolor;

  if(flrtName!='' ) {

    var flterParameter={ $and:[{ color:flrtName},
      {$and:[{},{}]}
      ]
       
    }
    }else{
      var flterParameter={}
  }
  var produno = Produno.find(flterParameter);
  produno
  //.find( flterParameter) 
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, data) => {
    produno.countDocuments((err, count) => {  
  //.exec(function(err,data){
      if(err) throw err;
      res.render("produno/produno",
      {
        produno: data, 
        current: page,
        pages: Math.ceil(count / perPage)
      
      });
    });
  });
});




////////////////////////////like////////////////////////

router.get('/likeproduno/:id', async (req, res, next) => {
  // let { id } = req.params;
  // const task = await Ofertauno.findById(id);
  const task = await Produno.findById(req.params.id);
  task.like = !task.like;
  await task.save();
 // res.redirect('/pedidos/:1');
  res.json(true);
});

///////////////////////////////////////////////////////////////////////////7






// talle y color
router.get('/produno/tallecolor/:id',  async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  const produno = await Produno.findById(req.params.id);
  res.render('produno/tallecolor-produno', { 
    produno,
    products: cart.generateArray(), totalPrice: cart.totalPrice

   });
});

router.post('/produno/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Produno.updateOne({_id: id}, req.body);
   const task = await Produno.findById(id);
   task.status = !task.status;
   await task.save();

  res.redirect('/aviador-detalles/' + id);
});




//editar



router.get('/produno/edit/:id',  async (req, res) => {
  const produno = await Produno.findById(req.params.id);
  res.render('produno/edit-produno', { produno });
});

router.post('/produno/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Produno.updateOne({_id: id}, req.body);
  res.redirect('/produnoback/:1');
});




// Delete 
router.get('/produno/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Produno.deleteOne({_id: id});
  res.redirect('/produnoback/:1');
});








//////////////////////////////cart////////////////////////////////////7

router.get('/shopcart', function (req, res, next){
  if(!req.session.cart){
    return res.render('cart/shopcart', {products:null})
  }
 // var cartdolar = new Cartdolar(req.session.cartdolar);
  var cart = new Cart(req.session.cart);
  res.render('cart/shopcart', {
    products: cart.generateArray(), 
    totalPrice: cart.totalPrice,
  //  totalPriceDolar: cartdolar.totalPrice
  })
});





router.get('/addtocardproduno/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Produno.findById(productId,async function(err, product){
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
      res.redirect('/aviador-detalles/' + productId);
   }


    console.log(req.session.cart);
   // req.flash('success', 'Producto agregado al carro exitosamente');
    //res.redirect('/produnoredirect/' + productId);
    res.redirect('/shopcart');
  });
});





 



router.get('/reduce/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
 
   cart.reduceByOne(productId);
  req.session.cart = cart;
   res.redirect('/shopcart');
});

router.get('/remove/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
 
 // cartdolar.removeItem(productId);
  cart.removeItem(productId);
  req.session.cart = cart;
   res.redirect('/shopcart');
});


router.get('/removee/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
 
   cart.removeItem(productId);
  req.session.cart = cart;
   res.redirect('/prepagar');
});
    

router.get('/removex/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
 
  cart.removeItem(productId);
  req.session.cart = cart;
   res.redirect('/');  
});

router.get('/sumar/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
 
   cart.sumar(productId);
  req.session.cart = cart;  
   res.redirect('/shopcart');
});

router.get('/', function (req, res, next){
  if(!req.session.cart){
    return res.render('cart/shopcart', {products:null})
  }
  var cart = new Cart(req.session.cart);
  res.render('/', {products: cart.generateArray(), totalPrice: cart.totalPrice})
});








router.get('/checkout',isAuthenticated, function (req, res, next){
  var cart = new Cart(req.session.cart);
  res.render('cart/checkout', {products: cart.generateArray(), total: cart.totalPrice})
});



router.post('/confirmacion', isAuthenticated, async (req, res, next)=>{
  if(!req.session.cart){
    return res.render('/', {products:null})
  }
  const cart = new Cart(req.session.cart);
  const c = new User (req.user);

  const order = new Order({
    user: req.user,
    cart: cart,
    totalcart: cart.totalPrice, 
    name: req.body.name,
    surname: req.body.surname,
    address: req.body.address,
    localidad: req.body.localidad,
    piso: req.body.piso,
    number: req.body.number,
    //emaill: req.body.emaill,
    emaill: c.email,
    nota: req.body.nota
      

  });
  console.log(order)
  await order.save();
  venta.venta(order);

  req.flash('success_msg', 'Note Added Successfully');
  res.redirect('/mediodepago');
  
})
 

router.get('/prepagar', isAuthenticated,function (req, res, next){
  if(!req.session.cart){
    return res.render('/', {products:null})
  }
  var cart = new Cart(req.session.cart);
  res.render('cart/prepagar', {products: cart.generateArray(), total: cart.totalPrice})
});



router.get('/mediodepago',isAuthenticated, function (req, res, next){

  if(!req.session.cart){
    return res.render('/', {products:null})
  }
  var cart = new Cart(req.session.cart);
  var cartdolar = new Cartdolar(req.session.cart);

  res.render('cart/mediodepago', {
    products: cart.generateArray(), 
    total: cart.totalPrice,
    totalPriceDolar: cartdolar.totalPrice

  })
});


 
 

////////////////////////////////mercadopago//////////////////////////////////////




router.post('/checkout',isAuthenticated,  async (req, res) => {

  if(!req.session.cart){
    return res.render('/', {products:null})
 }
 const cart = new Cart(req.session.cart);
   
 const c = new User (req.user); 


 const order = new Order({
  user: req.user,
  cart: cart,
  totalcart: cart.totalPrice, 
  emaill: c.email,
  name: req.body.name
});
   
 
  mercadopago.configure({
 
       access_token: 'APP_USR-2605494813352200-031815-a46d64727de486388f8e224f29452ac7-47919432',
       publicKey: 'APP_USR-588de8ac-d055-45eb-ad5a-3bf44b2ccae7'
  
    });
  
    // Cria um objeto de preferência
    let preference = {
      items: [
        {
          title: "Total a pagar:",
          unit_price: cart.totalPrice, 
          quantity: 1
        }
      ]
    };
     
    mercadopago.preferences
      .create(preference)
      .then(function(response) {
        global.init_point = response.body.init_point;
        var preference_id = response.body.id;
        res.render("cart/checkout", { preference_id });
      })
      .catch(function(error) {
        res.render("error");
        console.log(error);
      });

      venta.pago(order);

});  









////////////////////////////////paypal//////////////////////////////////////

 
router.post('/paypalcheckout', (req, res) => {
  if(!req.session.cart){
    return res.render('/', {products:null})
 }
 //const cart = new Cart(req.session.cart);
 const cartdolar = new Cartdolar(req.session.cartdolar);
 

 var payReq = {
  intent:'sale',
  payer: {
    payment_method: 'paypal'
  },
  redirect_urls:{
    return_url:'http://localhost:3000/success',
    cancel_url:'http://localhost:3000/cancel'
  },
  transactions: [{

    
 
    amount: {
        currency: 'USD',
        total: req.session.cartdolar.totalPriceDolar
    },
    "description": "Hat for the best team ever"
}]
};



paypal.payment.create(payReq, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});

});

router.get('/success', (req, res) => {
 
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [{
        amount: {
            "currency": 'USD',
            "total": req.session.cartdolar.totalPriceDolar
        }
    }]
  };         



  paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment ) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
       // res.send('Success');
       req.flash('success', 'El pago ha sido efectuado. Muchas Gracias y hasta la próxima compra');

  
       res.redirect('/end');
    }
});
});



router.get('/cancel', (req, res) => res.send('Cancelled'));

router.get('/end', function (req, res, next){
  var cart = new Cart(req.session.cart);
  const order = Order.find({})
  res.render('cart/end', {products: cart.generateArray(), order})
});

router.post('/end',userController.pago);










module.exports = router;  