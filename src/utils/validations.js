const validator = require("validator")
const validateSignUpData = (req)=>{
    const {firstName, lastName, password, age, emailId} = req.body;
    if(!firstName || !lastName){
        throw new Error("Please provide firstName and lastName")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Please provide correct email address")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please provide strong password")
    }
}

module.exports = validateSignUpData
