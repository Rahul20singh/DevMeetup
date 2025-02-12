const express = require("express");
const requestRouter = express.Router()
const validateSignUpData = require("../utils/validations")
const authValidation = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectioRequest")
const USER = require("../models/user")
const mongoose = require("mongoose")


requestRouter.post("/send/:status/:userId" , authValidation, async(req, res, next)=>{

    let fromUserId = req.user._id;
    let toUserId = req.params.userId
    let status = req.params.status
    console.log("here::::::::::::::::")
    let validStatusType = ["intersted", "ignored"]

    try{
        let data = await new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })


        // validate status is valid or not
        if(!validStatusType.includes(status)){
            throw new Error("status is incorrect")
        }

        // check if fromUserId is valid or not
        let findFromUser = await USER.findById(toUserId)
        console.log("findFromUserfindFromUser:::::::", findFromUser)
        if(!findFromUser){
            throw new Error("User is not present")

        }


        // check for existing connection
        const existingRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        })
        console.log("existingRequest", existingRequest)
        if(existingRequest){
            console.log("got error:::::::::::::;;;")
            throw new Error("Connection is already exist")
        }

        await data.save()
        res.json({
            "message": `${req.user.firstName} has sent connection request to ${findFromUser.firstName}`,
            data: data
        })

    }
    catch(err){
        console.log('at catch')
        res.status(400).send(err.message)
    }

  
})



// requestRouter.post("/send/ignored/:userId" ,async(req, res, next)=>{
//     let {firstName, lastName, password, age, emailId} = req.body;

//     try {
//          // validate data
//         validateSignUpData(req)

//         // encrypt password
//         let hashPassword = await bcrypt.hash(password, 10)
//         console.log("hashPassword", hashPassword)
//         let user = new USER({
    
//             firstName, 
//             lastName,
//             age,
//             emailId,
//             password: hashPassword
//         })
//         await user.save();
//         res.send("User got created");
//     } catch (error) {
//         console.log("errrrrrr", error)
//         // If there's an error, pass it to the next middleware
//         next(error); 
//     }

// }, (err, req, res, next)=>{
//     if(err){
//         res.status(400).send(err.message)
//     }
// })

requestRouter.post("/review/:status/:requestId", authValidation, async(req, res, next)=>{
   
    let loggedInUser = req.user;
    let {status, requestId} = req.params;
    try {
        const allowedStatus = ["accepted", "rejected"]
        if(!allowedStatus.includes(status)){
            throw new Error("status not allowed")
        }

        console.log("loggedIn", loggedInUser._id)
        // requestId = new mongoose.Types.ObjectId(requestId)
        const isRequestPresent = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "intersted"
        })
       
        if(!isRequestPresent){
            throw new Error("Request is not present")
        }

        isRequestPresent['status'] = status;

        const data = await isRequestPresent.save()

        res.json({
            "message": "Request has been sent",
            data: data
        })


         
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