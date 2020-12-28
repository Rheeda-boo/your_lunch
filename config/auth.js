function authRole(password){
    return(req, res, next) => {
       if(req.user.password !== "admin123") {
           res.status(401);
           return res.send("Wrong Password");
       } else {
           console.log("Yaay")
       }
    }
}

module.exports = authRole;