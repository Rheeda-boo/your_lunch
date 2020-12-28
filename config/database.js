const mongoose = require("mongoose");
const connection = mongoose.connection;

mongoose.connect("mongodb://localhost:27017/YourLunch",
 {useNewUrlParser: true}, 
 { useUnifiedTopology: true } );

connection.on("connected", () => {
    console.log("Database connected successfully");
});

connection.on("disconnected", () => {
    console.log("Database not connected");
});

connection.on("error", () => {
    console.error(error);
});

module.exports = connection;