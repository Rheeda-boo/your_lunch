const mongoose  = require("mongoose");
const menuModel = require("./menu");

const orderSchema = new  mongoose.Schema({
    firstname : [
        { type : mongoose.Schema.Types.ObjectId,
         required : true,
         ref: "userModel"
        }],

    lastname : [
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
    
});

const orderModel  = mongoose.model("Order", orderSchema);

module.exports = orderModel;