const express = require("express");
const router = express.Router();
const Menu = require('../models/menu');
const User = require('../models/user');
const Coupon = require("../models/coupon");
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
  User.find()
    .then(user => {
  res.locals.user = user;
  res.render("food/checkout", {
    user: user,
    name: name,
    email: email
    
  });
})
});

router.post("/checkout", (req,res) => {
    // res.locals.user = user;
      res.render("food/checkout", {
        // user: user,
        
      });
});

router.post("/createorder", (req,res) => {
    req.user
    .populate('cart.items.menuId')
    .execPopulate()
    .then(user => {
      
      const menu = user.cart.items.map(i => {
        return { quantity: i.quantity, menu: { ...i.menuId._doc } };
      });
      const order = new Order({
        user: {
    
          name: req.user.name,
          userId: req.user
          
        },
        menu: menu,
        date: new Date(),
        delivered: false,
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/")
    })
    .catch(err => console.log(err)); 
});

router.get("/create-order", (req,res) => {
    Order.find({})
    .then(orders => {
      res.render('/', {
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


router.get("/checkcoupon", (req,res) => {
  const code = req.body.code;
  Coupon.findOne({code : code})
    .then(coupon => {
      if(!coupon) {
        console.log("no no no")
      } else {
        console.log("yaaay")
      }

      res.render('/food/checkout', {
        coupon: coupon
      })
    })

  .catch(err => console.log(err));
});

router.post("/checkcoupon", (req,res) => {
  const code = req.body.code;
  Coupon.findOne({code : code})
    .then(coupon => {
      if(!coupon) {
        console.log("no no no")
      } else {
        console.log("yaaay")
      }

      res.render('/food/checkout', {
        coupon: coupon
      })
    })

  .catch(err => console.log(err));
});

module.exports = router;
