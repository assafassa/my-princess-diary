const express=require('express')
const mongoose=require('mongoose');
const User= require('../models/users');
const nodemailer=require('nodemailer')
const bcrypt=require('bcrypt')
const secretkey='sKt408oGhEDVcX/su8oRkehvMoUkXvFtkkcvJdoNpqKO9ycQ.h0vIKA2s5QF0AVWUe'
const router=express.Router();
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
router.get('/', (req,res)=>{
    res.render('signup')

})
const maxAge=24*60*60
function createtoken(id){
    return jwt.sign({id},secretkey,{
        expiresIn: maxAge
    });
}
router.post('/', (req, res) => {
    let {username, email, action}= req.body;
    User.findOne({ $or: [
        { username: username },
        { email: email }
      ]})
        .then(user=>{
            let messegeback={}
            if (user){
                messegeback.result='Username or mail exits.'
                if (action=='reset password'){
                    messegeback.username=user.username
                    messegeback.email=user.email
                }
                res.json(messegeback); 
            }else {
                messegeback.result='Username or mail no exits.'
                if (action=='create user'){
                    messegeback.username=username
                    messegeback.email=email
                }
                res.json(messegeback);  
            }   
        })
        .catch((err)=>console.log(err))
  
});


const messagebodycreate='To verify your email copy and past the following code in the intended field.'
const messagebodyreset='To reset your password copy and past the following code in the intended field.'
    
router.post('/verifymail',async (req,res)=>{
    verifying=0
    let {email,username, action}=req.body
    let randomverifycode=(Math.floor(Math.random()*1000000)).toString()
    let hashedverifycode=await bcrypt.hash((randomverifycode),13)
    let messagebody
    if (action=='create user'){
        messagebody=messagebodycreate
    }else if(action=='reset password'){
        messagebody=messagebodyreset
    }
    let mailhtml=
    `
    
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Princess Diary</title>
    <style>
        body {
        background-color: rgb(203, 206, 252);
        font-family:cursive;
        font-size: 18px;
        margin-top: 100px;
        }

        .container {
        max-width: 600px;
        margin: 0 auto;
        background-color:  rgb(227, 229, 251);
        color:  rgb(133, 126, 195);
        padding: 20px;
        border: 5px;
        border-style: solid;
        border-color:  rgb(133, 126, 195);
        
        }

        .my-princess-diary{
        font-size: 50px;
        text-align: center;
        color: rgb(22, 117, 114);
        font-weight: bold;
        margin-bottom: 30px;
        text-shadow: 1px 1px 0 rgb(171, 165, 233),  
        1px 1px 0 rgb(171, 165, 233),
        1px 1px 0 rgb(133, 126, 195),
        1px 1px 0 rgb(133, 126, 195);
        }

        .messegeusername{
        font-size:24px;
        color:rgb(116, 106, 186);;
        font-style: bold;
        }

        .verefy-code {
        background-color: rgb(133, 126, 195);
        color:rgb(234, 232, 252) ;
        border: none;
        width: 104px;
        padding: 5px;
        margin: 10px;  
        text-align: center;
        font-size: 25px;
        margin-left: 240px;
        
        }

        
    </style>
    </head>
    <body>
    <div class="container">
        <div class="my-princess-diary">My Princess Diary</div>
        <div class="messegeusername">
            Hi ${username},
        </div>
        <div class="messegebody">
            ${messagebody}
        </div>
        <div class="verefy-code">${randomverifycode}</div>
    </div>  

    </body>
    </html>
    `
    
    let messegeback={}
    let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com', 
        port: 587,  
        secure: false,
        auth: {
          user: 'myPrincessDiaryWebsite@hotmail.com',
          pass: 'mia165Clarisse115$26limou$ine',
        },
      });
    transporter.sendMail({
        from: 'myPrincessDiaryWebsite@hotmail.com',
        to:email,
        subject:'Verification Code for My Princess Diary',
        html:mailhtml,
    })
    .then(async (info)=>{
        if(info.messageId){
            
            messegeback.result='messege sent'
            messegeback.username=username
            messegeback.email=email
            messegeback.messageid=hashedverifycode
            let premitivecookie=await bcrypt.hash((secretkey+'0'+username[0]+hashedverifycode[12]),13)
            messegeback.premitivecookie=premitivecookie
            res.json(messegeback);
            
        }else{
            messegeback.result='messege not sent'
            res.json(messegeback);            
        }
    })
    .catch((e)=>console.log(e))

})

router.post('/checkcode',async (req,res)=>{
    let messegeback=req.body
    let {verifycode,messageid,premitivecookie,username}=req.body
    let is0=await bcrypt.compare(secretkey+'0'+username[0]+messageid[12],premitivecookie)
    let is1=await bcrypt.compare(secretkey+'1'+username[1]+messageid[12],premitivecookie)
    let is2=await bcrypt.compare(secretkey+'2'+username[2]+messageid[12],premitivecookie)
    if (is0){
        premitivecookie=await bcrypt.hash((secretkey+'1'+username[1]+messageid[12]),13)
    }else if (is1){
        premitivecookie=await bcrypt.hash((secretkey+'2'+username[2]+messageid[12]),13)
    }
    messegeback.premitivecookie=premitivecookie
    
    let isvalid =await bcrypt.compare(verifycode,messageid)
    if (isvalid){
        let sucsesscode= await bcrypt.hash((secretkey+username[2]+messageid[1]),13)
        messegeback.premitivecookie=sucsesscode
        messegeback.result='Varified, create password.'
        res.json(messegeback);
    }else if (!is2){
        messegeback.result='Not varified, try again'
        res.json(messegeback); 
    }else if (is2){
        messegeback.result='failed 3 times. going back to singup'
        res.json(messegeback); 
    }

})
router.post('/createuser',async (req,res)=>{
    let{username,email,password,premitivecookie,messageid}=req.body
    let veryfy= await bcrypt.compare((secretkey+username[2]+messageid[1]),premitivecookie)
    if (veryfy){
        let hashedpassword= await bcrypt.hash(password,13)
        let newuser= new User({
            username:username,
            password:hashedpassword,
            email:email,
        })
        newuser.save()
            .then((result)=>{
                let messegeback={}
                messegeback.result='Varified, creating a User'
                ///////create token 
                let token= createtoken(newuser._id)
                res.cookie('jwt',token,{httpOnly:true, maxAge:maxAge*1000})
                res.json(messegeback);
            })
            .catch((err)=>console.log(err))
    }
})

router.post('/changepassword', async (req, res) => {
    let{username,password,premitivecookie,messageid}=req.body
    let veryfy= await bcrypt.compare((secretkey+username[2]+messageid[1]),premitivecookie)
    try {
        let messegeback = {};
        if (veryfy) {
            
            let user = await User.findOne({ username: username });

            if (!user) {
                // Handle the case where the user is not found
                messegeback.result = 'User not found.';
                res.json(messegeback);
                return;
            }

            let name = user.username;
            let pass = user.password;
            let mail = user.email;
            let previous = user.previousmails;

            let check = 0;

            for (let pas of previous) {
                let isvalid = await bcrypt.compare(password, pas);

                if (isvalid) {
                    messegeback.result = 'previous password.';
                    res.json(messegeback);
                    check = 1;
                    break;
                }
            }

            if (check === 0) {
                let isvalid = await bcrypt.compare(password, pass);
                if (isvalid) {
                    messegeback.result = 'previous password.';
                    res.json(messegeback);
                } else {
                    await User.findOneAndDelete({ username: name });

                    previous.push(pass);
                    let newhashedpass= await bcrypt.hash(password,13)
                    let newUser = new User({
                        username: name,
                        password: newhashedpass,
                        email: mail,
                        previousmails: previous
                    });

                    await newUser.save();
                    messegeback.result = 'new password saved';
                    res.json(messegeback);
                }
            }
        }
    } catch (err) {
        console.error(err);
        // Handle other errors if needed
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports=router