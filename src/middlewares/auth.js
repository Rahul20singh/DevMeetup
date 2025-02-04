const auth = (req, res, next)=>{

    const token = "xyz";
    const isAuthorized = token === "xyza"
    if(!isAuthorized){
        res.status(401).send("not authorized")
    }
    next()
}

module.exports = auth;