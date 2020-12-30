const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Menu = require('../models/menu');
const Order = require('../models/order');
const bcrypt = require("bcrypt");
const passport = require("passport");

router.get("/login", (req, res) => {

  res.render("users/login");
});


router.post("/login", (req, res, next) => {
  passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect : '/users/login',
    failureFlash : true,
    })(req,res,next);


    // passport.authenticate("local", (req, res, next,user) => {
    //   if (user.role === "admin") {
    //     res.render("/users/signup")
    //   }
    //   else {
    //     res.render("/")
    //   }
    // })
  

  // if (passport.authenticate("local") = true && user.role === "admin") 
  //     res.render("/users/signup")

  // else {
  //   res.render("/")
  // }    
  


  // passport.authenticate('local', 
  // {
  //     successRedirect : '/',
  //     failureRedirect : '/users/login',
  //     failureFlash : true,
  // }, (err, user) =>  {
  //   if (user){
  //     if (user.role === 'staff' || user.role === 'trainee'){
  //       // successRedirect : '/',

  //       res.render("/user/signup");
  //       console.log("Staff");
  //     }
  //     else if(user.role === 'admin'){
  //       // res.send(403);
  //       console.log("we are in");
  //     } 
  //     else {
  //       res.sendStatus(403);
  //     }  
  //   }  
  //   else {
  //       return res.sendStatus(401)
  //   }
  // })(req, res, next);



  // passport.authenticate("local", (err, user) => {
  //   console.log("err", err);
  //   console.log("user", user);
  //   if (err) {
  //     res.redirect("/users/login");
  //   } else {
  //     if (user.role === "admin") {
  //       res.redirect("/admin/dashbord");
  //     } else {
  //       res.redirect("/");
  //     }
  //   }
  // })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/users/login");
});

router.get("/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/signup", (req, res) => {
  
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
    res.render("users/signup", {
      errors: errors,
      name: name,
      email: email,
      password: password,
      password2: password2,
      role: role
    });
  } else {
    //validation passed
    User.findOne({ email: email }).exec((err, user) => {
      console.log(user);
      if (user) {
        errors.push({ msg: "Email already registered" });
        res.render("users/signup", {
          errors,
          name,
          email,
          password,
          password2,
          role
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
                res.redirect("/users/login");
              })
              .catch((value) => console.log(value));
          })
        );
      }
    });
  }
});

router.get("/logout", (req, res) => {});
module.exports = router;
