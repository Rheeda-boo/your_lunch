const express = require("express");
const router = express.Router();
const Menu = require('../models/menu');
const User = require('../models/user');
const Order = require('../models/order');

router.get("/menupage", (req,res) => {
    Menu.find()
    .then(menu => {
        console.log(menu);
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
    // res.render("food/cart")
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const menu = user.cart.items;
      res.render('food/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        menu: menu
      });
    })
    .catch(err => console.log(err));
});


router.get("/checkout", (req,res) => {
    res.render("food/checkout")
});

// router.post("/cart", (req,res) => {
//     const prodId = req.body.productId;
//     Menu.findById(prodId)
//     .then(product => {
//         return req.user.addToCart(product);
//     })
//     .then(result => {
//         console.log(result);
//         res.redirect("food/cart");
//     });
// }​​​​​​​​);

module.exports = router;