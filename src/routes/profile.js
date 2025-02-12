const express = require("express");
const profileRouter = express.Router()
const authValidation = require("../middlewares/auth")
const USER = require("../models/user")


profileRouter.get("/profile/view", authValidation, async(req, res, next)=>{
    try {
        let user = req.user
        // const {token} = req.cookies;
        // const {_id} = jwt.verify(token, secretKey)
        // if(!_id){
        //     throw new Error("Token is not present")
        // }
        // console.log("id", _id)
        // const user = await USER.findById(_id)
        // console.log("ussssssss", user)
        // if(!user){
        //     throw new Error("User is not present, login again")
        // }
        
        res.send("profile is shown successfully: "+user)
    } catch (error) {
        res.send(error)
    }
})

profileRouter.patch("/profile/edit", authValidation, async(req, res, next)=>{
    try {
        let user = req.user
        let data = req.body
        
        let updatedUser = await USER.findByIdAndUpdate(user._id, data, {returnDocument: "after"} )
        
        res.send("profile is updated successfully: "+updatedUser)
    } catch (error) {
        res.send(error)
    }
})

profileRouter.patch("/user/:userId" ,async(req, res, next)=>{
    let getUserId = req.params.userId;
    let data = req.body
    console.log("getuserdata", data)


    // let user = new USER(getUserData)

    try {

        let ALLOWED_UPDATES = ["skills", "age", "firstName", "gender"]
        let isUpdatAllowed = Object.keys(req.body).every((val)=>ALLOWED_UPDATES.includes(val))
        console.log("keys", Object.keys(req.body), isUpdatAllowed)
        if(!isUpdatAllowed){
            throw new Error("update not allowed")
        }
        await USER.findByIdAndUpdate({_id: getUserId}, data, {runValidators: true})
        
        res.send("User got updated");
    } catch (error) {
        console.log("errrrrrr", error)
        // If there's an error, pass it to the next middleware
        next(error); 
    }

}, (err, req, res, next)=>{
    if(err){
        console.log("eeeeeeeeeeeee", err)
        res.status(400).send(err.message)
    }
})

module.exports = profileRouter