const express = require("express");
const router = express.Router();
const authRole = require("../config/auth")
const User = require('../models/user');
const Menu = require('../models/menu');
const Order = require('../models/order');
const bcrypt = require("bcrypt");
const passport = require("passport");


router.get("/dashboard", (req,res) => {
    res.render("admin/dashboard")
} );

router.post("/dashboard", (req,res) => {
  res.render("admin/dashboard")
} );

router.get("/adduser", (req,res) => {
    res.render("admin/adduser")
} );


router.post("/adduser", (req, res) => {
  
    const { name, email, password, password2, role } = req.body;
    let errors = [];
    console.log(" Name " + name + " email :" + email + " pass:" + password);
    if (!name || !email || !password || !password2) {
      errors.push({ msg: "Please fill in all fields" });
    }
    //check if match
    if (password !== password2) {
      errors.push({ msg: "Passwords do not match" });
    }
  
    if (password.length < 6) {
      errors.push({ msg: "Password must be at least 6 characters" });
    }
    if (errors.length > 0) {
      res.render("admin/allusers", {
        errors: errors,
        name: name,
        email: email,
        password: password,
        password2: password2,
      });
    } else {
      //validation passed
      User.findOne({ email: email }).exec((err, user) => {
        console.log(user);
        if (user) {
          errors.push({ msg: "Email already registered" });
          res.render("admin/adduser", {
            errors,
            name,
            email,
            password,
            password2,
          });
        } else {
          const newUser = new User({
            name: name,
            email: email,
            password: password,
            role: role,
          });
  
          //hash password
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              //save pass to hash
              newUser.password = hash;
              //save user
              newUser
                .save()
                .then((value) => {
                  console.log(value);
                  req.flash("success_msg", "You have now registered!");
                  res.redirect("/admin/allusers");
                })
                .catch((value) => console.log(value));
            })
          );
        }
      });
    }
  });

router.get("/allusers", (req,res) => {
    res.render("admin/allusers")
} );

router.get("/allorders", (req,res) => {
    res.render("admin/allorders")
} );

router.get("/coupons", (req,res) => {
    res.render("admin/coupons")
} );

router.get("/createaccounts", (req,res) => {
    res.render("admin/createaccounts")
} );

router.get("/checkout", (req,res) => {
    res.render("admin/checkout")
} );

module.exports = router;