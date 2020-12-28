const express = require("express");
const app =  express();
const expressLayouts = require("express-ejs-layouts");
const database = require("./config/database");

const session = require('express-session');
const flash = require('connect-flash')


const indexRouter = require("./routes/index");
const foodRouter = require("./routes/food");
const adminRouter = require("./routes/admin");
const managerRouter = require("./routes/manager");
const usersRouter = require("./routes/users");
const passport = require('passport');
require("./config/passport")(passport);

// app.use(adminUser);

app.use(express.urlencoded({extended : false}));

app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
   }));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
   res.locals.user = req.user;
   next();
})

app.use(flash());
  app.use((req,res,next)=> {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error  = req.flash('error');
   next();
   })

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
// app.set("layout", "layouts/layout");
// app.use(expressLayouts);
app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/food", foodRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/manager", managerRouter);

const PORT = process.env.PORT || 5600;

app.listen(PORT, ()=> {
   console.log(`Listening to port ${PORT}`)   
});

