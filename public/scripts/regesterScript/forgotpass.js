

import { sendverifymail } from "./verify.js"
import {isValidEmail} from "../calendarScript/utils.js"
let Currentusername
let premitivecookie
let messageid


//handelr to button to change html to input mail



//handelr to button to change html to input mail
export function forgotpasswordpage(){
    document.querySelector(".head").innerHTML='Forgot Password'
    document.querySelector(".loginbox").innerHTML=
    `
    <p class="paragarphsend"> Enter your email:</p>
    <input id="email" class="js-input emailinput" type="text">
    <p class="paragarphsend">To send a verification code, click the button.</p>
    <div><button class="send">Send</button></div>
    <div class="messege"></div>
    `
    resrtingpssword()

}
//const singup=document.querySelector(".signup");
export function resrtingpssword(){
    document.body.addEventListener('keydown',handelrenter)
    document.querySelector(".send").addEventListener('click',handlersend);
}
function handelrenter(event){
    if(event.key==='Enter'){
        handlersend()
    }
}

function handlersend(){
    document.querySelector(".send").removeEventListener('click',handlersend);
    document.body.removeEventListener('keydown',handelrenter)
    document.querySelector(".messege").innerHTML=`<img class="loadinggiffpug" src="../images/loadinggiff/Xqg8.gif" ><img class="loadinggiff" src="../images/loadinggiff/WMDx.gif" >`
    let email=document.getElementById("email").value
    if (isValidEmail(email)){
        let dataToSend={
            email,
            username:'nani',
            action:'reset password'
        }
        fetch('/signup',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then((res)=>res.json())
        .then((newdata)=>{
            if (newdata.result=='Username or mail exits.'){
                dataToSend.username=newdata.username
                sendverifymail(dataToSend)
            }else if (newdata.result=='Username or mail no exits.'){
                document.querySelector(".messege").innerHTML='Email does not exit. Tryagain'
                setTimeout(()=>{document.querySelector(".messege").innerHTML=''},2000);
                resrtingpssword()

            }
        })
        .catch((e)=>console.log(e))
    }else{
        document.querySelector(".messege").innerHTML='Email does not valid. Try another'
        setTimeout(()=>{document.querySelector(".messege").innerHTML=''},2000);
        resrtingpssword() 
    }    
    
}


export function changepasswordpage(data){
    premitivecookie=data.premitivecookie
    Currentusername=data.username
    messageid=data.messageid
    document.querySelector(".head").innerHTML='Change Password'
    document.querySelector(".loginbox").innerHTML=
    `
    <p class="yourmail">Hi ${Currentusername}</p>
    <p class="paragarphsend">Enter new password:</p>
    <input id="password1" class="js-input passwordinput" type="password">
    <p>Enter new password again:</p>
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
            premitivecookie,
            messageid,
        }
        fetch('/signup/changepassword',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then((res)=>res.json())
        .then((newdata)=>{
            if (newdata.result=='new password saved'){
                document.querySelector(".messege").innerHTML='New password saved.'
                setTimeout(()=>{window.location.href='/'},2000);
                
            }else if (newdata.result=='previous password.'){
                document.querySelector(".messege").innerHTML='You cannot reuse your previous password.'
                setTimeout(()=>{document.querySelector(".messege").innerHTML=''},2000);
                changingpssword()

            }
        })
        .catch((e)=>console.log(e))
    }    
    
}

