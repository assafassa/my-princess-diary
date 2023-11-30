const mongoose=require('mongoose');
const Schema=mongoose.Schema;

function  createeventSchema(username){
    const eventSchema=new Schema({
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

    let Event = mongoose.model('Event', eventSchema, username)
    return ({Event})
}

module.exports = {
    createeventSchema

};