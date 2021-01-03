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
    res.render("food/checkout")
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
