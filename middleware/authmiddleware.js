const cookieParser = require('cookie-parser');
const jwt=require('jsonwebtoken');
const secretkey='sKt408oGhEDVcX/su8oRkehvMoUkXvFtkkcvJdoNpqKO9ycQ.h0vIKA2s5QF0AVWUe'

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