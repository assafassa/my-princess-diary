const express=require('express')
const {createeventSchema}=require('../models/eventsmongo')
const mongoose=require('mongoose');

const router=express.Router();
let Currentusername=''
let CurrntEvent
router.post('/retrieveevent', (req, res) => {
  const {username, password}= req.body;
  //upload events
  let {Event}= createeventSchema(username);
  Currentusername=username
  CurrntEvent=Event
  Event.find()
      .then (Events=>{res.json({Events});})
      .catch(err => console.log(err));

});

router.get('/getusername', (req, res) => {
  res.json({Currentusername})

});

router.delete('/logoutfromuser', (req, res) => {
  Currentusername=''
  CurrntEvent=null
  res.json()
});

router.post('/updatedata',(req,res)=>{
  const {changes}=req.body;
  changes.forEach(change => {
    let changeid=change[1].Id
    CurrntEvent.findOneAndDelete({Id: changeid})
      .then(data=>{
        if (change[0]!='DELETE'){
          let event= new CurrntEvent(change[1])
          event.save()
            .catch((err)=>console.log(err))
        }
      } )
      .catch((err)=>console.log(err))
  });
  res.json({message:'done updating'})
});



module.exports=router