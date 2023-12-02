import { signingup } from "./signingup.js"
import{changepasswordpage, resrtingpssword} from "./forgotpass.js"
let username
let password
let email
let action

export function sendverifymail(data){
    ({username,password,email,action}=data)

    let dataToSend={username,password,email,action}
    fetch('/signup/verifymail',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    
    })
    .then((res)=>res.json())
    .then((newdata)=>{
        if (newdata.result=="messege sent"){
            document.querySelector(".messege").innerHTML="Message sent, look in your email."
            setTimeout(()=>{verifypage()},2000)
            
        }else if (newdata.result=="messege not sent"){
            document.querySelector(".messege").innerHTML="Failed semd message.Try another time."
            if (action=='create user'){
                signingup()
            }else if (action=='reset password'){
                resrtingpssword()
                /////here
            }
        }
    })
    .catch((e)=>console.log(e))
}


function verifypage(){
    document.querySelector(".loginbox").innerHTML=
    `
    <p> The email your entered:</p>
    <p class="yourmail">${email}</p>
    <p class="divederverify">To complete the verification process,</p>
    <p>please enter the code sent to your email:</p>
    <input id="verifycode" class="js-input verifycode" type="text">
    <div><button class="verify">Verify</button></div>
    <div class="messege"></div>
    `
    veryfyingup()

}
//const singup=document.querySelector(".signup");
function veryfyingup(){
    let verify=document.querySelector(".verify")
    verify.removeEventListener('click',handlerverify);
    verify.addEventListener('click',handlerverify);
}

function handlerverify(){
    let datatosend={}
    datatosend.verifycode=document.getElementById("verifycode").value
    datatosend.action=action
    fetch('/signup/checkcode',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datatosend)
    })
    .then((res)=>res.json())
    .then((newdata)=>{
        if (newdata.result=='Varified, creating a User'){
            document.querySelector(".messege").innerHTML='Varified, creating a User'
            setTimeout(()=>{window.location.href='/'},3000);
        }else if (newdata.result=='Varified, create new password.'){
            changepasswordpage(username)
            ////hereee
        }else if (newdata.result=='Not varified, try again'){
            document.querySelector(".messege").innerHTML='Not varified, try again'
            setTimeout(()=>{document.querySelector(".messege").innerHTML=''},2000);
            veryfyingup()

        }else if (newdata.result=='failed 3 times. going back to singup'){
            if (action=='create user'){
                document.querySelector(".messege").innerHTML='failed 3 times. going back to singup'
                setTimeout(()=>{window.location.href='/signup'},2000);
            }else if (action=='reset password'){
                document.querySelector(".messege").innerHTML='failed 3 times. going back to regester'
                setTimeout(()=>{window.location.href='/'},2000);    
            }
        }
    })
    .catch((e)=>console.log(e))
    
    
}

