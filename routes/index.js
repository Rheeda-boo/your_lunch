const express = require("express");
const router = express.Router();
const Menu = require('../models/menu');
const User = require('../models/user');
const Order = require('../models/order');


router.get("/",(req,res) => {
//     console.log(req.user);
//    res.render("index")

Menu.find()
    .then(menu => {
        console.log(menu);
        res.locals.menu = menu;
        res.render("index", {
            menu: menu,
        })
    })
    .catch(err => console.log(err))

} );

module.exports = router;