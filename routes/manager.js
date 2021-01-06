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

router.get("/addfood", (req,res) => {
    Menu.find()
    .then(menu => {
        
        // console.log(menu);
        res.render("manager/addfood", {
            menu: menu,
            // foodName:foodName,
            // price:price,
        
        })
    })
    .catch(err => console.log(err));
    
});

router.post("/addfood", (req,res) => {
    // console.log(req.body);
    const foodName = req.body.foodName;
    const image = req.body.foodimg;
    const price = req.body.price;
    const day = req.body.day;
    const description = req.body.description;
    const menu = new Menu({
        foodName: foodName,
        foodimg: image,
        day : day,
        price: price,
        description: description,
        userId: req.user
    });

       
    menu.save()
    .then(result => {
        // console.log('created menu');
        res.redirect("/manager/addfood")
    })
    .catch(err => {
        console.log(err);
    });
});


router.get("/vieworders", (req,res) => {
    // res.render("manager/vieworders")
    Order.find()
    .then((order) => {
      // console.log(user);
                
      res.locals.order = order;
      res.render("manager/vieworders", {
        order: order,
        
      });
    })
});

router.get("/deleteorder/:orderId", (req, res) => {
    const oId = req.params.orderId;
    Order.findById(oId).deleteOne()
    .then(order => {
      res.redirect("/manager/vieworders")
    })
  });


  router.post("/deleteorder/:orderId", (req, res) => {
    const oId = req.params.orderId;
    Order.findById(oId).deleteOne()
    .then(order => {
      res.render("manager/vieworders", {
        order : order
      })
    })
  });

  router.get("/deliver/:orderId", (req,res) => {
    const oId = req.params.orderId
    console.log(oId);
    Order.findByIdAndUpdate(oId, {delivered: true})
    .then(orders => {
      res.redirect("/manager/vieworders")
    })
    
    // Order.findByIdAndUpdate(oId, {disabled: false})
    .catch(err => console.log(err));
  })

  router.get("/deletemenu/:menuId", (req, res) => {
    const mId = req.params.menuId;
    console.log(mId)
    Menu.findById(mId).deleteOne()
    .then(menu => {
      res.render("manager/addfood",{
        menu: menu
      })
    })
  })

router.get("/menu", (req,res) => {
    res.render("manager/manmenu")
} );

router.get("/updatefood", (req,res,menu) => {
    const editMode = req.query.edit;
    const prodId = req.params.menuId;
    // console.log(prodId);
    Menu.findById(prodId)    
    .then(menu => {
        res.render("manager/updatefood", {
            editing : editMode,
            menu : menu,
        });

        // console.log(menu)
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