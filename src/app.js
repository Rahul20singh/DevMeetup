console.log("hello World")

const express = require("express");
const app = express();

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

// Root path handler (for GET requests)
app.get("/", (req, res) => {
    res.send("hello from the server sks");
});

// Test path handler (for GET requests)
app.get("/test", (req, res) => {
    res.send("at test path");
});

// Hello path handler (for GET requests)
app.get("/hello", (req, res) => {
    res.send("at hello path");
});

// Start the server
app.listen(3000, () => {
    console.log("server is running successfully");
});