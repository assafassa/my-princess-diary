const express=require('express')

const {requireAuth}=require('../middleware/authmiddleware');
const router=express.Router();
const eventcontroller=require('../controllers/eventcontrollers')


router.post('/retrieveevent',requireAuth,eventcontroller.retrieveevent_post);

router.get('/getusername',requireAuth,eventcontroller.getusername_get);

router.delete('/logoutfromuser',requireAuth, eventcontroller.logoutfromuser_delete);

router.post('/updatedata',requireAuth,eventcontroller.updatedata_post);



module.exports=router