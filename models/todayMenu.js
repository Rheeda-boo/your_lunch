const mongoose  = require("mongoose");


const todayMenuSchema = new  mongoose.Schema({
    foodName : {
        type : String,
        required : true,
    },

    price : {
        type : Number,
        required : true,
    },

    image : {
        type : String,
        required : true,
    },

    day : {
        type : String,
        trim : true
    },

    
});

const todayMenuSchema  = mongoose.model("TodayMenu", todayMenuSchema);

module.exports = todayMenuModel;