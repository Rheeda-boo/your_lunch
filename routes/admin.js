const express = require("express");
const router = express.Router();
const authRole = require("../config/auth");
const User = require("../models/user");
const Menu = require("../models/menu");
const Order = require("../models/order");
const bcrypt = require("bcrypt");
const passport = require("passport");

router.get("/dashboard", (req, res) => {
  res.render("admin/dashboard");
});

router.post("/dashboard", (req, res) => {
  res.render("admin/dashboard");
});

router.get("/adduser", (req, res) => {
  res.render("admin/adduser");
});

router.post("/adduser", (req, res) => {
  const { name, email, password, password2, role } = req.body;
  let errors = [];
  // console.log(" Name " + name + " email :" + email + " pass:" + password);
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
      // console.log(user);
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
                // console.log(value);
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

router.get("/deleteuser/:userId", (req, res) => {
  const uId = req.params.userId;
  User.findById(uId).deleteOne()
  .then(user => {
    res.render("admin/allusers", {
      user : user
    })
  })
});


router.get("/allusers", (req, res) => {
  User.find()
    .then((user) => {
      // console.log(user);
      let adminCounter = 0;
      let staffCounter = 0;
      let traineeCounter = 0;
      let managerCounter = 0;

      for (let person of user) {
        if (person.role === "admin") {
          adminCounter++;
        } else if (person.role === "manager") {
          managerCounter++;
        } else if (person.role === "staff") {
          staffCounter++;
        } else {
          traineeCounter++;
        } 
      }
           
      res.locals.user = user;
      res.render("admin/allusers", {
        user: user,
        adminCounter : adminCounter,
        traineeCounter :traineeCounter,
        managerCounter : managerCounter,
        staffCounter: staffCounter,
      });
    })

    .catch((err) => console.log(err));

  // res.render("admin/allusers")
});

router.get("/allorders", (req, res) => {
  res.render("admin/allorders");
});

router.get("/coupons", (req, res) => {
  res.render("admin/coupons");
});


router.get("/checkout", (req, res) => {
  res.render("admin/checkout");
});

module.exports = router;
