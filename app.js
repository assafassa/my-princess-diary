const secretkey='sKt408oGhEDVcX/su8oRkehvMoUkXvFtkkcvJdoNpqKO9ycQ.h0vIKA2s5QF0AVWUe'
const express=require('express');
const mongoose=require('mongoose');
const app =express();
app.use(express.json());
const User= require('./models/users');
const eventsRoutes=require('./routes/eventsRoutes');
const signupRoutes=require('./routes/signupRoutes');
const nodemailer=require('nodemailer')
const bcrypt=require('bcrypt')
const dbURI= 'mongodb+srv://lali:123456test@calendar.zjkhx2y.mongodb.net/calenderdb?retryWrites=true&w=majority';
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const {requireAuth}=require('./middleware/authmiddleware');
app.use(cookieParser());

const maxAge=24*60*60
function createtoken(id){
    return jwt.sign({id},secretkey,{
        expiresIn: maxAge
    });
}

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

app.set('view engine', 'ejs')
app.use(express.static('public'))

//bulshit register
app.get('/', (req,res)=>{
    res.render('regester')

})

app.get('/my-princess-diary', requireAuth,(req,res)=>{
    res.render('calendar')

})



app.post('/trytologin', async (req, res) => {
    let {username, password}= req.body;
    User.findOne({ $or: [
        { username: username },
        { email: username }
      ]})
        .then(async user=>{
            let messegeback={}
            if (user){
                let isvalid = await bcrypt.compare(password, user.password);
                if (isvalid) {
                ///////create token 
                let token= createtoken(user._id)
                res.cookie('jwt',token,{httpOnly:true, maxAge:maxAge*1000})
                messegeback.result='login sucessful. Retrieving your data'
                messegeback.username=user.username
                }else if (!isvalid){
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

