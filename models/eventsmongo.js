const mongoose=require('mongoose');
let Schema=mongoose.Schema;
let eventSchema=new Schema({
    Id:{
        type: String,
        required:true

    },
    date: {
        type: String,
        required:true
    },
    hourStart: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true
    },
    howLongminutes: {
        type: Number,
        required:true
    },
    withWhom: {
        type: [String],
        required:true
    },
    reminddaybefore: {
        type: Number,
        required:true
    },
    reminddate: {
        type: String,
        required:false
    },
    repeatList: {
        type: [String],
        required:true
    },
    checked:{
        type: String,
        required:false
    },
},{timestamps: true});
function  createeventSchema(username){

    let Event = mongoose.model('Event', eventSchema, username)
    return ({Event})
}

module.exports = {
    createeventSchema

};