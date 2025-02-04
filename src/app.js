console.log("hello World")

const express = require("express");
const app = express();
const auth = require("./middlewares/auth")

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

app.use("/user", auth)

app.get("/user",(req, res, next)=>{
    res.send("found user data")
})


// Start the server
app.listen(3000, () => {
    console.log("server is running successfully");
});