

import {isValidEmail} from '../calendarScript/utils.js';
import{sendverifymail}from './verify.js'

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
    let password=document.getElementById("password").value
    let email=document.getElementById("email").value
    if (username.length>=5 && password.length>=5 && isValidEmail(email) ){
        const dataToSend = {
            username,
            password,
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
            if (data.result=='Contuning to verify email.'){
                document.querySelector(".messege").innerHTML=data.result
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
    else if (username.length<5 || password.length<5){
        document.querySelector(".messege").innerHTML='Password or username must be 5 charcaters or more.'
        signingup()
    }else if (!isValidEmail(email)){
        document.querySelector(".messege").innerHTML='Email is not valid.'  
        signingup()
    }
}