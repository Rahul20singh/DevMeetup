const express = require("express");

const userRoute = express.Router();
const userAuth = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectioRequest")
const User = require("../models/user")
const safeFields =  ["firstName", "lastName", "age", "skills", "about"]
// "firstName lastName age skills about"

userRoute.get("/user/request/received", userAuth, async(req, res, next)=>{
    const loggedInUser = req.user;

    try{
        const requests = await ConnectionRequest.find({
            "toUserId": loggedInUser._id,
            "status": "intersted"
        }).populate("fromUserId", safeFields)
        res.json({
            'message': "fetched all request",
            "data": requests
        })
    }
    catch(err){
        res.status(400).send(err.message)

    }
    


})

userRoute.get("/user/connection", userAuth, async(req, res)=>{
    const loggedInUser = req.user;

    try {
        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"}
            ]
        }).populate("fromUserId", safeFields)
        .populate("toUserId", safeFields)

        const data = connectionRequest.map((obj)=>{
            if(obj.fromUserId._id.toString() === loggedInUser.toString()){
                return obj.toUserId
            }
            return obj.fromUserId
        })

        res.json({
            data: data
        })
    } catch (err) {
        res.send(err.message)
    }
})

userRoute.get("/user/feed", userAuth, async(req, res)=>{
    const loggedInUser = req.user
    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit)
    limit = limit > 50 ? 50 : limit;
    const skip = (page-1) * limit

    try {
        const feedData = await ConnectionRequest.find({
            $or:[
                {toUserId: loggedInUser._id}, {fromUserId: loggedInUser._id}
            ]
        });


        console.log("fffffffffff", feedData)
        const hiddenUsersFromFeed = new Set();

        feedData.forEach((each)=>{
            hiddenUsersFromFeed.add(each.fromUserId._id.toString())
            hiddenUsersFromFeed.add(each.toUserId._id.toString())
        })

        console.log("feedDatafeedData", hiddenUsersFromFeed)

        const users = await User.find({
           $and:[{
            _id: {$nin: Array.from(hiddenUsersFromFeed)} 
           }, 
           { _id: {$ne: loggedInUser._id} }]
        }).select(safeFields).skip(skip).limit(limit)

        res.json({
            message: "fetched feed profiles",
            data: users
        })

        
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

module.exports = userRoute;