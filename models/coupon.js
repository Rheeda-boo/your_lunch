const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const couponSchema = new Schema({
    code : {
        type : String,
        required : true,
    },

    date : {
        type : String,
        required : true,
    },

});
 

module.exports = mongoose.model("Coupon", couponSchema);