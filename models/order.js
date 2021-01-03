const mongoose  = require("mongoose");
const menuModel = require("./menu");
const Schema = mongoose.Schema;

const orderSchema = new  mongoose.Schema({
    name : [
        { type : mongoose.Schema.Types.ObjectId,
         required : true,
         ref: "userModel"
        }],

    
    menu : [
        { 
            menu : { type: Object, required: true},
            quantity : { type: Object, required: true},
    }],
    

    userId : {
        type: Schema.Types.ObjectId,
        required : true, 
        ref: "userModel",
    },

    // totalAmt : {
    //     type : Number,
    //     required : true,
    // },

    pay: {
        type : String,
        required : true, 
    },

    date: {
        type: Date,
        required : true, 
    }
    
});

const orderModel  = mongoose.model("Order", orderSchema);

module.exports = orderModel;