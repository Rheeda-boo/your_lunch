const database = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");

const importData = () => {
  const newUser = new User({
    name: "Admin User",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin",

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
         process.exit(0);
        })
        .catch((value) =>{
            console.log(value);
            process.exit(1);
        } );
    })
  );
};

importData();

// const importData = async () => {
//     try{
//         await userModel.deleteMany();
//         await categoryModel.deleteMany();

//         const savedCategories = await userModel.insertMany(user);
//         console.log('categories, created');

//         const products = product.map((prod) => {
//             return {...prod, category: savedCategories[0]._id}
//         });

//         await productModel.insertMany(products);

//         console.log('Admin Added');
//         process.exit();

//     }catch(e) {
//         console.error('error: '+e);
//         process.exit(1);
//     }

// }

// importData();

// user.create(user, function(e) {
//     if (e) {
//         throw e;
//     }
// });

// module.exports = user
