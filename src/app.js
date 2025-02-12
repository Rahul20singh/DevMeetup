console.log("hello World")

const express = require("express");
const app = express();
const bcrypt = require("bcrypt")
const auth = require("./middlewares/auth")
const {mongoDb} = require("./config/database")
const USER = require("./models/user")
const {validateSignUpData} = require("./utils/validations")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const authValidation = require("./middlewares/auth")
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const userRoute = require("./routes/user")
app.use(express.json())
app.use(cookieParser())

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRoute)

const secretKey = "DEV@METTUP73828282";

mongoDb().then(()=>{
    console.log("database is connected ")
    app.listen(4002, ()=>{
        console.log("server is running at port 4000")
    })
})
.catch((err)=>{
    console.log("found err at connecting with db", err)
})



// app.use("/", (req, res)=>{
//     res.end("hello from the server sks");
// })

// app.use("/test", (req, res)=>{
//     res.send("at test path")
// })

// app.use("/hello", (req, res)=>{
//     res.send("at hello path")
// })


// app.listen(3000, ()=>{
//     console.log("server is running successfully")
// })

// 





// Root path handler (for GET requests)
// app.get("/", (req, res) => {
//     res.send("hello from the server sks");
// });

// Test path handler (for GET requests)
// app.get("/test", (req, res) => {
//     res.send("at test path");
// });

// // Hello path handler (for GET requests)
// app.get("/hello", (req, res) => {
//     res.send("at hello path");
// });


// app.get("/user", (req, res)=>{
//     res.send('pls find the user data: {"name": "rahul"}')
// })

// app.post("/user", (req, res)=>{
//     res.send("user data is successfully pushed")
// })

// app.delete("/user", (req, res)=>{
//     res.send("user data is successfully deleted")
// })

// app.patch("/user", (req, res)=>{
//     res.send("user data is successfully updated by patch")
// })

// app.put("/user", (req, res)=>{
//     res.send("user data is successfully updated by put")
// })




// request query
// app.get("/user", (req, res)=>{
//     console.log("request query", req.query)
//     res.send("got request query")

// })

// request Params (dynamic routes)
// app.get("/user/:userId/:age/:pass", (req, res)=>{
//     console.log("got request params", req.params)
//     res.send("got request params")
// })


// multiple route handlers (1st way)

// app.get("/user", (req, res, next)=>{
//     console.log("first handlers")
//     next()
// }, 
// (req, res, next)=>{
//     console.log("2nd handlers")
//     next()

// },
// (req, res, next)=>{
//     console.log("3rd handlers")
//     res.send("sucess")
// }

// )


/// 2nd way

// app.get("/user", (req, res, next)=>{
//     console.log("first handlers")
//     next()
// }
// )

// app.get("/user",
// (req, res, next)=>{
//     console.log("3rd handlers")
//     res.send("sucess")
// }

// )




// Middlewares

// app.use("/user", auth)

// app.get("/user/getData", (req, res, next)=>{
//     try {
        
//     } catch (error) {
//         res.status(500).send("something went wrong")
//     }
// })

// app.get("/user",(req, res, next)=>{
//     console.log("hereeeeeeeeeeeeeeeeee")
//     // res.send("found user data")
//     throw new Error("error")
// })

// app.use("/", (err, req, res, next)=>{
//     if(err){
//         res.status(500).send("something went wrong")
//     }
//     res.send("home page")
// })


// Start the server
// app.listen(3000, () => {
//     console.log("server is running successfully");
// });

// app.get("/user", async(req, res, next)=>{
//     const firstName = req.body.firstName
//     console.log("firstName:::::::::", firstName)
//     try {

//         const getUser = await USER.find({"firstName": firstName})
//         if(getUser.length===0){
//             res.status(405).send("user not found")
//         }
//         res.send(getUser)
//     } catch (error) {
//         res.status(500).send("something went wrong")
        
//     }
  

// })

// app.get("/feed", async(req, res, next)=>{
//     try {

//         const getUser = await USER.find()
//         if(getUser.length===0){
//             res.status(405).send("users not found")
//         }
//         res.send(getUser)
//     } catch (error) {
//         res.status(500).send("something went wrong")
        
//     }
  

// })

// app.get("/profile", authValidation, async(req, res, next)=>{
//     try {
//         let user = req.user
//         const {token} = req.cookies;
//         const {_id} = jwt.verify(token, secretKey)
//         if(!_id){
//             throw new Error("Token is not present")
//         }
//         console.log("id", _id)
//         const user = await USER.findById(_id)
//         console.log("ussssssss", user)
//         if(!user){
//             throw new Error("User is not present, login again")
//         }
        
//         res.send("profile is shown successfully: "+user)
//     } catch (error) {
//         res.send(error)
//     }
// })

// app.post("/login", async(req, res, next)=>{
//     const {emailId, password} = req.body;

//     try{
//         let user = await USER.findOne({"emailId": emailId})
//         console.log("user:::::::::::::::::::", user)
//         if(!user){
//             throw new Error("Invalid Credentials")
//         }
//         // const token = await jwt.sign({_id: user._id}, secretKey, {"expiresIn": "1d"})
//         let token = await user.getJWT()
//         console.log("token", token)
//         res.cookie("token", token, {expires: new Date(Date.now() + 8 *3600000)})
//         res.send("login successful")
        
//         // isPasswordCorrect = await bcrypt.compare(password, user.password)
//         // if(isPasswordCorrect){
//         //     res.cookie("token", "183hbsnsjj2i292")
//         //     res.send("login successful")
//         // }
//         // else{
//         //     throw new Error("Invalid Credentials")
//         // }

//     }
//     catch(err){
//         res.status(400).send("ERROR "+ err)
//     }
// })

// app.get("/connectionRequest", authValidation, async(req, res, next)=>{
//     const user = req.user
//     console.log("userrrrrrrrr1", user)
//     res.send(user)
// })


// app.post("/signup" ,async(req, res, next)=>{
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

// app.patch("/user" ,async(req, res, next)=>{
//     let getUserId = req.body.userId;
//     let data = req.body
//     console.log("getuserdata", data)
//     // let user = new USER(getUserData)

//     try {
//         await USER.findByIdAndUpdate({_id: getUserId}, data, {runValidators: true})
        
//         res.send("User got updated");
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

// app.patch("/user/:userId" ,async(req, res, next)=>{
//     let getUserId = req.params.userId;
//     let data = req.body
//     console.log("getuserdata", data)


//     // let user = new USER(getUserData)

//     try {

//         let ALLOWED_UPDATES = ["skills", "age", "firstName", "gender"]
//         let isUpdatAllowed = Object.keys(req.body).every((val)=>ALLOWED_UPDATES.includes(val))
//         console.log("keys", Object.keys(req.body), isUpdatAllowed)
//         if(!isUpdatAllowed){
//             throw new Error("update not allowed")
//         }
//         await USER.findByIdAndUpdate({_id: getUserId}, data, {runValidators: true})
        
//         res.send("User got updated");
//     } catch (error) {
//         console.log("errrrrrr", error)
//         // If there's an error, pass it to the next middleware
//         next(error); 
//     }

// }, (err, req, res, next)=>{
//     if(err){
//         console.log("eeeeeeeeeeeee", err)
//         res.status(400).send(err.message)
//     }
// })



// start DB and then run server








