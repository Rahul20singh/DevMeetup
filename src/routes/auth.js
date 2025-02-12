const express = require("express");
const authRouter = express.Router()
const USER = require("../models/user")
const validateSignUpData = require("../utils/validations")
const bcrypt = require("bcrypt")

authRouter.post("/login", async(req, res, next)=>{
    const {emailId, password} = req.body;

    try{
        let user = await USER.findOne({"emailId": emailId})
        console.log("user:::::::::::::::::::", user)
        if(!user){
            throw new Error("Invalid Credentials")
        }
        // const token = await jwt.sign({_id: user._id}, secretKey, {"expiresIn": "1d"})
        let token = await user.getJWT()
        console.log("token", token)
        res.cookie("token", token, {expires: new Date(Date.now() + 8 *3600000)})
        res.send("login successful")
        
        // isPasswordCorrect = await bcrypt.compare(password, user.password)
        // if(isPasswordCorrect){
        //     res.cookie("token", "183hbsnsjj2i292")
        //     res.send("login successful")
        // }
        // else{
        //     throw new Error("Invalid Credentials")
        // }

    }
    catch(err){
        res.status(400).send("ERROR "+ err)
    }
})

authRouter.post("/signup" ,async(req, res, next)=>{
    let {firstName, lastName, password, age, emailId} = req.body;

    try {
         // validate data
        validateSignUpData(req)

        // encrypt password
        let hashPassword = await bcrypt.hash(password, 10)
        console.log("hashPassword", hashPassword)
        let user = new USER({
    
            firstName, 
            lastName,
            age,
            emailId,
            password: hashPassword
        })
        await user.save();
        res.send("User got created");
    } catch (error) {
        console.log("errrrrrr", error)
        // If there's an error, pass it to the next middleware
        next(error); 
    }

}, (err, req, res, next)=>{
    if(err){
        res.status(400).send(err.message)
    }
})

authRouter.post("/logout" ,async(req, res, next)=>{
   res.cookie("token", null, {
    expires: new Date(Date.now())
   }),
   res.send("logout successful")
})


module.exports = authRouter;