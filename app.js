
const express=require('express');
const mongoose=require('mongoose');
const app =express();
app.use(express.json());
const User= require('./models/users');
const eventsRoutes=require('./routes/eventsRoutes');



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

app.get('/signup', (req,res)=>{
    res.render('signup')

})

app.post('/trytologin', (req, res) => {
    const {username, password}= req.body;
    User.findOne({username})
        .then(user=>{
            let messegeback={}
            if (user){
               if (user.password==password) {
                messegeback.result='login sucessful. Retrieving your data'
                
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
app.post('/signup', (req, res) => {
    const {username, password, email}= req.body;
    User.findOne({ $or: [
        { username: username },
        { email: email }
      ]})
        .then(user=>{
            let messegeback={}
            if (user){
                messegeback.result='Username or mail exits.'
                res.json(messegeback); 
            }else {
                let newuser= new User({
                    username:username,
                    password:password,
                    email:email
            
                });
                newuser.save()
                    .then((result)=>{
                        messegeback.result='User created'
                        res.json(messegeback); 
                    })
                    .catch((err)=>console.log(err)) 
            }   
        })
        .catch((err)=>console.log(err))
  
});


  

app.use('/events',eventsRoutes);
/*

const Event= require('./models/eventsmongo');
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
*/
app.get('/add',(req,res)=>{
    const user= new User({
        username:'lali123',
        password:'lali123',
        email:'laliesp@mail.tau.ac.il'

    });
    user.save()
        .then((result)=>console.log('saved'))
        .catch((err)=>console.log(err))
})
