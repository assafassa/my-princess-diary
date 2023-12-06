

import {isValidEmail} from '../calendarScript/utils.js';
import{sendverifymail}from './verify.js'
import{retreevedata} from '../calendarScript/cloud.js'

let Currentusername
let Currentemail
let premitivecookie
let messageid

export function signingup(){
    let singup=document.querySelector(".signup");
    singup.removeEventListener('click',handlersign);
    document.body.removeEventListener('keydown',handelrenter)
    document.body.addEventListener('keydown',handelrenter)
    singup.addEventListener('click',handlersign);

}
function handelrenter(event){
    if(event.key==='Enter'){
        handlersign()
    }
}
function handlersign(){
    document.querySelector(".messege").innerHTML=`<img class="loadinggiffpug" src="../images/loadinggiff/Xqg8.gif" ><img class="loadinggiff" src="../images/loadinggiff/WMDx.gif" >`
    let username=document.getElementById("username").value
    let email=document.getElementById("email").value
    if (username.length>=5 && isValidEmail(email) ){
        const dataToSend = {
            username,
            email,
            action:'create user'
        };
        // Use fetch to send a POST request to the server
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response 
            if (data.result=='Username or mail no exits.'){
                document.querySelector(".messege").innerHTML='Contuning to verify email.'
                sendverifymail(dataToSend)
            }else {
            document.querySelector(".messege").innerHTML=data.result
            signingup()
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    else if (username.length<5){
        document.querySelector(".messege").innerHTML='Username must be 5 charcaters or more.'
        signingup()
    }else if (!isValidEmail(email)){
        document.querySelector(".messege").innerHTML='Email is not valid.'  
        signingup()
    }
}

export function createpasswordpage(data){

    Currentusername=data.username
    Currentemail=data.email
    premitivecookie=data.premitivecookie
    messageid=data.messageid
    document.querySelector(".head").innerHTML='Create Password'
    document.querySelector(".loginbox").innerHTML=
    `
    <p class="yourmail">Hi ${Currentusername}</p>
    <p class="paragarphsend">Enter password:</p>
    <input id="password1" class="js-input passwordinput" type="password">
    <p>Enter password again:</p>
    <input id="password2" class="js-input passwordinput" type="password">
    <div><button class="save">Save</button></div>
    <div class="messege"></div>
    `
    changingpssword()

}
//const singup=document.querySelector(".signup");
function changingpssword(){
    document.body.addEventListener('keydown',handelrenter1)
    document.querySelector(".save").addEventListener('click',handlersave);
}
function handelrenter1(event){
    if(event.key==='Enter'){
        handlersave()
    }
}

function handlersave(){
    document.querySelector(".save").removeEventListener('click',handlersave);
    document.body.removeEventListener('keydown',handelrenter1)
    document.querySelector(".messege").innerHTML=`<img class="loadinggiffpug" src="../images/loadinggiff/Xqg8.gif" ><img class="loadinggiff" src="../images/loadinggiff/WMDx.gif" >`
    let firstpassword=document.getElementById("password1").value
    let secondpassword=document.getElementById("password2").value
    if (firstpassword<5){
        document.querySelector(".messege").innerHTML='Password must be 5 charcaters or more.'
        setTimeout(()=>{document.querySelector(".messege").innerHTML=''},2000);
        changingpssword()
    }else if(firstpassword!=secondpassword){
        document.querySelector(".messege").innerHTML="Passwords don\'t match."
        setTimeout(()=>{document.querySelector(".messege").innerHTML=''},2000);
        changingpssword()
    }else{
        let dataToSend={
            username: Currentusername,
            password:firstpassword,
            email:Currentemail,
            premitivecookie,
            messageid,
        }
        fetch('/signup/createuser',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then((res)=>res.json())
        .then((newdata)=>{
            document.querySelector(".messege").innerHTML='created a user.'
            retreevedata()
            setTimeout(()=>{window.location.href='/my-princess-diary'},2000);
        })
        .catch((e)=>console.log(e))
    }    
    
}

