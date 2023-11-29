const express=require('express');
const mongoose=require('mongoose');
const morgan = require('morgan');
const app =express();
app.use(express.json());
const User= require('./models/users');
const Event= require('./models/eventsmongo');



const dbURI= 'mongodb+srv://lali:123456test@calendar.zjkhx2y.mongodb.net/calenderdb?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

app.set('view engine', 'ejs')
app.use(express.static('public'))

//bulshit register
app.get('/', (req,res)=>{
    res.render('regester')

})

app.get('/my-princess-diary', (req,res)=>{
    res.render('calendar')

})

app.get('/add',(req,res)=>{
    const user= new User({
        username:'assafi',
        password:'lali123',
        email:'lali@mail.tau.ac.il'

    });
    user.save()
        .then((result)=>console.log('saved'))
        .catch((err)=>console.log(err))
})

app.get('/addevent',(req,res)=>{
    const event= new Event({
        date: '2023-11-23',
        hourStart: '15:45',
        name: 'First day at my new job',
        howLongminutes: 120,
        withWhom: ['Yael'],
        reminddaybefore: 2,
        reminddate: '2023-11-21',
        repeatList: ['0','day'],
        checked:'',    
    });
    event.save()
        .then((result)=>console.log('saved'))
        .catch((err)=>console.log(err))
})

app.post('/', (req, res) => {
    const {username, password}= req.body;
    console.log(req.body)
    User.findOne({username})
        .then(user=>{
            let messegeback={}
            if (user){
               if (user.password==password) {
                //need to add event
                messegeback.result='yes'
               }else if (user.password!=password){
                messegeback.result='Username or Password are incorrect.'
               }
            }else {
                messegeback.result='Username does not exit.'
            }
            res.json(messegeback);
        })
        .catch((err)=>console.log(err))
  
  });