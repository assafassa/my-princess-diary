const express=require('express')
const {createeventSchema}=require('../models/eventsmongo')
const mongoose=require('mongoose');
const {requireAuth}=require('../middleware/authmiddleware');
const User= require('../models/users');
const router=express.Router();

async function getevents(req){
  let userid=req.decodedToken.id
  let user=await User.findOne({_id:userid})
  let username=user.username
  //upload events
  let {Event}= await createeventSchema(username);
  return(Event)
}

router.post('/retrieveevent',requireAuth, async (req, res) => {
  let Event=await getevents(req)
  Event.find()
      .then (Events=>{
        res.json({Events});})
      .catch(err => console.log(err));

});

router.get('/getusername',requireAuth, async(req, res) => {
  let userid=req.decodedToken.id
  let user=await User.findOne({_id:userid})
  let username=user.username
  res.json({username})

});

router.delete('/logoutfromuser',requireAuth, (req, res) => {
  res.cookie('jwt','',{maxAge:1})
  res.redirect('/');
});

router.post('/updatedata',requireAuth,async (req,res)=>{
  let Event=await getevents(req)
  const {changes}=req.body;
  changes.forEach(change => {
    let changeid=change[1].Id
    Event.findOneAndDelete({Id: changeid})
      .then(data=>{
        if (change[0]!='DELETE'){
          let event= new Event(change[1])
          event.save()
            .catch((err)=>console.log(err))
        }
      } )
      .catch((err)=>console.log(err))
  });
  res.json({message:'done updating'})
});



module.exports=router