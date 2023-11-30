const express=require('express')
const {createeventSchema}=require('../models/eventsmongo')

const router=express.Router();

router.post('/retrieveevent', (req, res) => {
    const {username, password}= req.body;
    //upload events
  let {Event}= createeventSchema(username);
  Event.find()
      .then (Events=>{res.json({Events});})
      .catch(err => console.log(err));

});

module.exports=router