
const express=require('express');
const mongoose=require('mongoose');
const app =express();
app.use(express.json());
const eventsRoutes=require('./routes/eventsRoutes');
const signupRoutes=require('./routes/signupRoutes');
const dbURI= 'mongodb+srv://lali:123456test@calendar.zjkhx2y.mongodb.net/calenderdb?retryWrites=true&w=majority';
const cookieParser=require('cookie-parser');
app.use(cookieParser());
const {requireAuth}=require('./middleware/authmiddleware');
const authController= require('./controllers/authcontrollers')




mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(process.env.PORT || 3000))
    .catch((err) => console.log(err))

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.head('/robot',authController.autorobot);
app.get('/', (req,res)=>{
    res.render('regester')

})

app.get('/my-princess-diary', requireAuth,(req,res)=>{
    res.render('calendar')

})

app.post('/trytologin',authController.trytologin_post);

  
app.use('/signup',signupRoutes);
app.use('/events',eventsRoutes);

app.use(requireAuth,(req,res)=>{
    res.redirect('/my-princess-diary')
})
