const express=require('express')
const mongoose=require('mongoose');
const User= require('../models/users');
const nodemailer=require('nodemailer')
const bcrypt=require('bcrypt')

const router=express.Router();
let randomverifycode
let trying=0
let verifying=0
router.get('/', (req,res)=>{
    res.render('signup')

})

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
    
router.post('/verifymail',(req,res)=>{
    verifying=0
    let {email,username, action}=req.body
    randomverifycode=Math.floor(Math.random()*1000000)
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
    .then((info)=>{
        if(info.messageId){
            messegeback.result='messege sent'
            messegeback.username=username
            messegeback.email=email
            res.json(messegeback);
            trying=0
        }else{
            messegeback.result='messege not sent'
            res.json(messegeback);            
        }
    })
    .catch((e)=>console.log(e))

})

router.post('/checkcode',(req,res)=>{
    let messegeback=req.body
    let {verifycode}=req.body
    if(trying<3){
        if (verifycode==randomverifycode){
            verifying=1
            messegeback.result='Varified, create password.'
            res.json(messegeback);
        }else{
            messegeback.result='Not varified, try again'
            res.json(messegeback); 
            trying+=1
        }
    }else{
        messegeback.result='failed 3 times. going back to singup'
        res.json(messegeback); 
    }

})
router.post('/createuser',async (req,res)=>{
    let{username,email,password}=req.body
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
            res.json(messegeback);
        })
        .catch((err)=>console.log(err))
})

router.post('/changepassword', async (req, res) => {
    try {
        let messegeback = {};
        if (verifying == 1) {
            let { username, password } = req.body;
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