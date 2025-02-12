const mongoose = require("mongoose");
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const secretKey = "DEV@METTUP73828282";

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
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address "+ value)
            }
        }
    },
    age: {
        type: Number,
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


userSchema.methods.getJWT = async function () {
    console.log("hereeeeeeeeeeeeeeeeeeeeeeee")
    console.log(this, "ttttttttttttttttt")
    let token = await jwt.sign({_id: this._id}, secretKey, {expiresIn: "1d"})
    console.log("token11111111111111", token)
    return token
}

userSchema.methods.validatePassword = async function (password) {

    const hashPassword = await bcrypt.hash(this.password, 10)
    return hashPassword

}


const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel;