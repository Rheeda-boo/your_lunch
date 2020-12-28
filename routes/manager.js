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

router.get("/addfood", (req,res) => {
    Menu.find()
    .then(menu => {
        console.log(menu);
        res.render("manager/addfood", {
            menu: menu,
        })
    })
    .catch(err => console.log(err));
    
});

router.post("/addfood", (req,res) => {
    console.log(req.body);
    const foodName = req.body.foodName;
    const image = req.body.foodimg;
    const price = req.body.price;
    const description = req.body.description;
    const menu = new Menu({
        foodName: foodName,
        foodimg: image,
        price: price,
        description: description

    });
    menu.save()
    .then(result => {
        console.log('created menu');
        res.redirect("../food/menupage")
    })
    .catch(err => {
        console.log(err);
    });
});


router.get("/vieworders", (req,res) => {
    res.render("manager/vieworders")
} );

router.get("/menu", (req,res) => {
    res.render("manager/manmenu")
} );

router.get("/updatefood", (req,res,menu) => {
    const editMode = req.query.edit;
    const prodId = req.params.menuId;
    console.log(prodId);
    Menu.findById(prodId)    
    .then(menu => {
        res.render("manager/updatefood", {
            editing : editMode,
            menu : menu,
        });

        console.log(menu)
    });
        
        
    // .catch(err => console.log(err));  
});

router.get("/updatefood", (req,res,menu) => {
    const prodId = req.body.menuId;
  const updatedTitle = req.body.foodName;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.foodimg;
  const updatedDesc = req.body.description;

  Menu.findById(prodId)
    .then(menu => {
      menu.foodName = updatedTitle;
      menu.price = updatedPrice;
      menu.description = updatedDesc;
      menu.foodimg = updatedImageUrl;
      return menu.save();
    })
    .then(result => {
      console.log('UPDATED MENU!');
      res.redirect('/food/menupage');
    })
    .catch(err => console.log(err));
});

router.get("/reports", (req,res) => {
    res.render("manager/reports")
} );

// router.get("/checkout", (req,res) => {
//     res.render("food/checkout")
// } );



module.exports = router;