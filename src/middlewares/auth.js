const jwt = require("jsonwebtoken")
const secretKey = "DEV@METTUP73828282";
const USER = require('../models/user')

const auth = async(req, res, next)=>{

    try {
        let {token} = req.cookies;
        console.log("token", token)
        if(!token){
            throw new Error("token is not present")
        }
        let {_id} = await jwt.verify(token, secretKey)
        console.log("_id", _id)
        if(!_id){
            throw new Error("token is not correct")
        } 
        const user = await USER.findById(_id);
        if(!user){
            throw new Error("user is not present")
        }
        req.user = user;
        console.log("at auth middleware", user)
        // res.send(user)
        next()     
    } catch (error) {
        console.log("got error", error)
        res.status(400).send("ERROR:::::"+ error.message)
        // res.status(400).send(error)
        // next()
    }

   
}

module.exports = auth;