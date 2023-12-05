const cookieParser = require('cookie-parser');
const jwt=require('jsonwebtoken');
const secretkey='$2b$13$38lKPZYS2CxcEkZ3.GnNeu'

const requireAuth =(req,res,next)=>{
    const token=req.cookies.jwt;

    if(token){
        jwt.verify(token,secretkey,(err,decodedToken)=>{
            if (err){
                res.redirect('/');
            }else{
                req.decodedToken=decodedToken
                next()
            }
        })
    }else{
        res.redirect('/');
    }
}
module.exports={requireAuth};