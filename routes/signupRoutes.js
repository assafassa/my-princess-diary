const express=require('express')
const router=express.Router();
const authController= require('../controllers/authcontrollers')

router.get('/', (req,res)=>{
    res.render('signup')

})

router.post('/', authController.signup_post);

router.post('/verifymail', authController.signupverifymail_post);  

router.post('/checkcode', authController.signupcheckcode_post);  

router.post('/createuser', authController.signupcreateuser_post); 

router.post('/changepassword', authController.changepassword_post); 

module.exports=router