const auth = (req, res, next)=>{

    const token = "xyz";
    const isAuthorized = token === "xyz"
    if(!isAuthorized){
        res.status(401).send("not authorized")
    }
    next()
}

module.exports = auth;