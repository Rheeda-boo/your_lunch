const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new  mongoose.Schema({
    name : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        trim : true,
    },

    password : {
        type : String,
        required : true,   
    },

    role : {
        type : String,
        required : true,   
    },

    isApproved : {
      type : Boolean,
      default : false,   
  },

    cart: {
        items: [
          {
            menuId: {
              type: Schema.Types.ObjectId,
              ref: 'Menu',
              required: true
            },
            quantity: { type: Number, required: true }
          }
        ]
      }

    
});

userSchema.methods.addToCart = function(menu) {
  console.log(menu);
  const cartMenuIndex = this.cart.items.findIndex(cp => {
    return cp.menuId.toString() === menu._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];
 
  if (cartMenuIndex >= 0) {
    newQuantity = this.cart.items[cartMenuIndex].quantity + 1;
    updatedCartItems[cartMenuIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      menuId: menu._id,
      quantity: newQuantity
    });
  }
  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
};
 
userSchema.methods.removeFromCart = function(menuId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.menuId.toString() !== menuId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};
 
userSchema.methods.clearCart = function() {
  this.cart = { items: [] };
  return this.save();
};

const userModel  = mongoose.model("User", userSchema);

module.exports = userModel;