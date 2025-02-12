const mongoose = require("mongoose");
const USER = require("../models/user")

const connectionRequestSchema = new  mongoose.Schema({
   fromUserId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
   },
   toUserId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
   },
   status:{
    type: String,
    enum:{
        values: ["intersted", "ignored", "accepted", "rejected"],
        message: `{Value} is incorrect status type`
    },
    required: true
   },

    
}, {Timestamp: true})


connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("User cannot send request to himself")
    }
    next()

})

connectionRequestSchema.index({"fromUserId": 1, "toUserId":1})


const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports = ConnectionRequest;