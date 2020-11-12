const jwt = require('jsonwebtoken');
//require('dotenv/config');


module.exports = function(req,res,next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        console.log("process.env.TOKEN_SECRET",process.env.TOKEN_SECRET);
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log("verified",verified);
        req.userData = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token')
    }
}
