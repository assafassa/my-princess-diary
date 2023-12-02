const express=require('express')
const {createeventSchema}=require('../models/eventsmongo')
const mongoose=require('mongoose');
const User= require('../models/users');
const nodemailer=require('nodemailer')

const router=express.Router();
let randomverifycode
let Currentusername
let Currentemail
let Currentpassword
let trying=0
router.get('/', (req,res)=>{
    res.render('signup')

})

router.post('/', (req, res) => {
    let {username, password, email}= req.body;
    User.findOne({ $or: [
        { username: username },
        { email: email }
      ]})
        .then(user=>{
            let messegeback={}
            if (user){
                messegeback.result='Username or mail exits.'
                res.json(messegeback); 
            }else {
                messegeback.result='Contuning to verify email.'
                res.json(messegeback);  
            }   
        })
        .catch((err)=>console.log(err))
  
});



    
router.post('/verifymail',(req,res)=>{
    let {email,username,password}=req.body
    Currentemail=email
    Currentusername=username
    Currentpassword=password
    randomverifycode=Math.floor(Math.random()*1000000)
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
            To verify your email copy and past the following code in the intended field. 
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
    let messegeback={}
    let {verifycode}=req.body
    if(trying<3){
        if (verifycode==randomverifycode){
            let newuser= new User({
                username:Currentusername,
                password:Currentpassword,
                email:Currentemail

            });
            newuser.save()
                .then((result)=>{
                    messegeback.result='Varified, creating a User'
                    res.json(messegeback); 
                })
                .catch((err)=>console.log(err))

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

module.exports=router