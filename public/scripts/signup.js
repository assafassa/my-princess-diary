
import {isValidEmail} from './calendarScript/utils.js';

document.querySelector('.haveaccout').addEventListener('click',()=>{
    window.location.href='/'
});

const singup=document.querySelector(".signup");
function signingup(){
    singup.removeEventListener('click',handlersign);
    singup.addEventListener('click',handlersign);

}

function handlersign(){
    let username=document.getElementById("username").value
    let password=document.getElementById("password").value
    let email=document.getElementById("email").value
    console.log('here')
    if (password.length>=5 && password.length>=5 && isValidEmail(email) ){
        const dataToSend = {
            username,
            password,
            email
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
            if (data.result=='User created'){
                document.querySelector(".messege").innerHTML=data.result
                setTimeout(()=>{
                    window.location.href='/'
                },1000)
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

signingup()