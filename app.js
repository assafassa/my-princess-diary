
const express=require('express');
const mongoose=require('mongoose');
const app =express();
app.use(express.json());
const User= require('./models/users');
const eventsRoutes=require('./routes/eventsRoutes');
const signupRoutes=require('./routes/signupRoutes');
const nodemailer=require('nodemailer')


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



app.post('/trytologin', (req, res) => {
    let {username, password}= req.body;
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


  
app.use('/signup',signupRoutes);
app.use('/events',eventsRoutes);

