// pass: abcd123456789
// mongodb+srv://bishtrahul393:abcd123456789@namasterahul.eah4f.mongodb.net/mongosh --version
// Current IP Address (106.76.236.218/32) added!
// Visit Network Access to modify your settings.

const mongoose = require("mongoose");

const mongoDb = async()=>{
    console.log("hereeeeeeeeeeeeee")
    return await  mongoose.connect("mongodb+srv://bishtrahul393:abcd123456789@namasterahul.eah4f.mongodb.net/DevMeetUp",
        {
            useNewUrlParser: true,  // for backward compatibility with older MongoDB servers
            useUnifiedTopology: true,  // use the newer connection engine
        }
    )
}

module.exports = {
    mongoDb
}
   