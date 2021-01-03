const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
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

    day : {
        type : String,
        required : true,
    },

    description : {
        type : String,
        trim : true
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
    
});

const menuModel  = mongoose.model("Menu", menuSchema);

module.exports = menuModel;