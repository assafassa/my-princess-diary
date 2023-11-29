const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const eventSchema=new Schema({
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
        required:true
    },
    repeatList: {
        type: [String],
        required:true
    },
    checked:{
        type: String,
        required:true
    },
},{timestamps: true});

const Event = mongoose.model('Event', eventSchema, 'assafi')
module.exports= Event;