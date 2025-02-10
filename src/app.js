console.log("hello World")

const express = require("express");
const app = express();
const auth = require("./middlewares/auth")
const {mongoDb} = require("./config/database")
const USER = require("./models/user")

app.use(express.json())

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

app.get("/user", async(req, res, next)=>{
    const firstName = req.body.firstName
    console.log("firstName:::::::::", firstName)
    try {

        const getUser = await USER.find({"firstName": firstName})
        if(getUser.length===0){
            res.status(405).send("user not found")
        }
        res.send(getUser)
    } catch (error) {
        res.status(500).send("something went wrong")
        
    }
  

})

app.get("/feed", async(req, res, next)=>{
    try {

        const getUser = await USER.find()
        if(getUser.length===0){
            res.status(405).send("users not found")
        }
        res.send(getUser)
    } catch (error) {
        res.status(500).send("something went wrong")
        
    }
  

})


app.post("/signup" ,async(req, res, next)=>{
    let getUserData = req.body;
    console.log("getuserdata", getUserData)
    let user = new USER(getUserData)

    try {
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

app.patch("/user" ,async(req, res, next)=>{
    let getUserId = req.body.userId;
    let data = req.body
    console.log("getuserdata", data)
    // let user = new USER(getUserData)

    try {
        await USER.findByIdAndUpdate({_id: getUserId}, data, {runValidators: true})
        
        res.send("User got updated");
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



// start DB and then run server
mongoDb().then(()=>{
    console.log("database is connected ")
    app.listen(4002, ()=>{
        console.log("server is running at port 4000")
    })
})
.catch((err)=>{
    console.log("found err at connecting with db", err)
})







