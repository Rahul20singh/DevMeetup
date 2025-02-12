const express = require("express");
const requestRouter = express.Router()
const validateSignUpData = require("../utils/validations")


requestRouter.post("/send/intersted/:userId" ,async(req, res, next)=>{
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



requestRouter.post("/send/ignored/:userId" ,async(req, res, next)=>{
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

requestRouter.post("/review/accepted/:requestId" ,async(req, res, next)=>{
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

requestRouter.post("/review/rejected/:requestId" ,async(req, res, next)=>{
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

module.exports = requestRouter