
const {createeventSchema}=require('../models/eventsmongo')

const User= require('../models/users');


async function getevents(req){
  let userid=req.decodedToken.id
  let user=await User.findOne({_id:userid})
  let username=user.username
  //upload events
  let {Event}= await createeventSchema(username);
  return(Event)
}


module.exports.retrieveevent_post= async (req, res) => {
    let Event=await getevents(req)
    Event.find()
        .then (Events=>{
          res.json({Events});})
        .catch(err => console.log(err));
  
}

module.exports.getusername_get= async(req, res) => {
    let userid=req.decodedToken.id
    let user=await User.findOne({_id:userid})
    let username=user.username
    res.json({username})
  
}

module.exports.logoutfromuser_delete= (req, res) => {
    res.cookie('jwt','',{maxAge:1})
    res.json()
}

module.exports.updatedata_post=async (req,res)=>{
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
}
  