const mongoose  = require("mongoose");


const menuSchema = new  mongoose.Schema({
    foodName : {
        type : String,
        required : true,
    },

    price : {
        type : Number,
        required : true,
    },

    foodimg : {
        type : String,
        required : true,
    },

    description : {
        type : String,
        trim : true
    },

    // todaysMenu : {
    //     type: boolean,
    //     default: false,
    // }
    
});

const menuModel  = mongoose.model("Menu", menuSchema);

module.exports = menuModel;