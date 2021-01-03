const mongoose  = require("mongoose");
const menuModel = require("./menu");

const orderSchema = new  mongoose.Schema({
    name : [
        { type : mongoose.Schema.Types.ObjectId,
         required : true,
         ref: "userModel"
        }],

    
    menu : [
        { type : mongoose.Schema.Types.ObjectId,
         required : true,
         ref: "menuModel"
        }],
    

    totalAmt : {
        type : Number,
        required : true,
    },

    payOption: {
        type : String,
        required : true, 
    }
    
});

const orderModel  = mongoose.model("Order", orderSchema);

module.exports = orderModel;