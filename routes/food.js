const express = require("express");
const router = express.Router();
const Menu = require('../models/menu');
const User = require('../models/user');
const Order = require('../models/order');

router.get("/menupage", (req,res) => {
    Menu.find()
    .then(menu => {
        // console.log(menu);
        res.locals.menu = menu;
        res.render("food/menupage", {
            menu: menu,
        })
    })
    .catch(err => console.log(err))
} );
router.get("/chef", (req,res) => {
    res.render("manager/addfood")
} );


router.get("/cart", (req,res) => {
    req.user
    .populate('cart.items.menuId')
    .execPopulate()
    .then(user => {
      const menu = user.cart.items;
      res.render('food/cart', {
        menu: menu
      });
    })
    .catch(err => console.log(err));
});

router.post("/cart", (req,res) => {
    console.log(req.body);
    const prodId = req.body.menuId;
    Menu.findById(prodId)
    .then(menu => {
        console.log(prodId);
        return req.user.addToCart(menu);
    })
    .then(result => {
        console.log(prodId);
        res.redirect("/");
    }).catch((err) => {
        console.log(err);
        res.redirect("/");
    });

});


router.get("/checkout", (req,res) => {
    res.render("food/checkout")
});

router.post("/checkout", (req,res) => {
    res.locals.user = user;
      res.render("food/checkout", {
        user: user,
        
      });
});

router.post("/createorder", (req,res) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      // const d = new Date();
      // const payment = order.payment;
      const menu = user.cart.items.map(i => {
        return { menu: i.menu, menu: { ...i.menuId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          username: req.user.username,
          userId: req.user
          
        },
        menu: menu,
        date: new Date(),
        pay: pay,
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.render("shop/checkout");
    })
    .catch(err => console.log(err)); 
});

router.get("/createorder", (req,res) => {
    Order.find({  })
    .then(orders => {
      res.render('shop/orders', {
        orders: orders
      }),
      res.render('shop/checkout', {
        orders: orders
      })
    })
    .catch(err => console.log(err));
});


router.post("/deletecart", (req,res) => {
    const prodId = req.body.menuId;
    req.user
    .removeFromCart(prodId)
    .then(result => {
        res.redirect("/food/cart");
     })
     .catch(err => console.log(err))
});

module.exports = router;
