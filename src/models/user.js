const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    age: {
        type: Number,
        unique: true,
        min: 18
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        lowercase: true,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("gender is not valid")
            }
        }
    },
    photoUrl:{
        type: String
    },
    about:{
        type: String,
        default: "this is default value for about field"
    },
    skills:{
        type: [String]
    }


}, {timestamps: true});



const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel;