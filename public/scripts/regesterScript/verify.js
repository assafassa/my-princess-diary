import { signingup, createpasswordpage } from "./signingup.js"
import{changepasswordpage, resrtingpssword} from "./forgotpass.js"
let username
let email
let action
let messageid
let premitivecookie
export function sendverifymail(data){
    ({username,email,action}=data)

    fetch('/signup/verifymail',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    
    })
    .then((res)=>res.json())
    .then((newdata)=>{
        if (newdata.result=="messege sent"){
            messageid=newdata.messageid
            premitivecookie=newdata.premitivecookie
            document.querySelector(".messege").innerHTML="Message sent, look in your email."
            setTimeout(()=>{verifypage()},2000)
            
        }else if (newdata.result=="messege not sent"){
            document.querySelector(".messege").innerHTML="Failed semd message.Try another time."
            if (action=='create user'){
                signingup()
            }else if (action=='reset password'){
                resrtingpssword()
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
    document.body.addEventListener('keydown',handelrenter)
    document.querySelector(".verify").addEventListener('click',handlerverify);
}
function handelrenter(event){
    if(event.key==='Enter'){
        handlerverify()
    }
}
function handlerverify(){
    document.querySelector(".verify").removeEventListener('click',handlerverify);
    document.body.removeEventListener('keydown',handelrenter)
    document.querySelector(".messege").innerHTML=`<img class="loadinggiffpug" src="../images/loadinggiff/Xqg8.gif" ><img class="loadinggiff" src="../images/loadinggiff/WMDx.gif" >`
    let datatosend={
        action,
        email,
        username,
        messageid,
        premitivecookie
    }
    datatosend.verifycode=document.getElementById("verifycode").value
    fetch('/signup/checkcode',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datatosend)
    })
    .then((res)=>res.json())
    .then((newdata)=>{
         if (newdata.result=='Varified, create password.'){
            if (newdata.action=='create user'){
                createpasswordpage(newdata)
            }else if(newdata.action){
                changepasswordpage(newdata)
            }
        }else if (newdata.result=='Not varified, try again'){
            document.querySelector(".messege").innerHTML='Not varified, try again'
            premitivecookie=newdata.premitivecookie
            messageid=newdata.messageid
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

