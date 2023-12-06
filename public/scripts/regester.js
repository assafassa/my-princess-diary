
import {forgotpasswordpage} from './regesterScript/forgotpass.js'
import {retreevedata} from './calendarScript/cloud.js'


function handelrenter(event){
    if(event.key==='Enter'){
        handlerlogin()
    }
}

function loginwebsite(){
    document.querySelector(".login").addEventListener('click',handlerlogin)
    document.body.addEventListener('keydown',handelrenter)

}    

function handlerlogin(){
    document.querySelector(".messege").innerHTML=`<img class="loadinggiffpug" src="../images/loadinggiff/Xqg8.gif" ><img class="loadinggiff" src="../images/loadinggiff/WMDx.gif" >`
    document.querySelector(".login").removeEventListener('click',handlerlogin)
    document.body.removeEventListener('keydown',handelrenter)
    let username=document.getElementById("username").value
    let password=document.getElementById("password").value
    
    if (username!='' && password!=''){
        const dataToSend = {
            username,
            password
        };
        // Use fetch to send a POST request to the server
        fetch('/trytologin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response 
            dataToSend.username= data.username
            if (data.result=='login sucessful. Retrieving your data'){
                document.querySelector(".messege").innerHTML=data.result
                retreevedata()
            }else {
                document.querySelector(".messege").innerHTML=data.result
                setTimeout(()=>{document.querySelector(".messege").innerHTML=''},3000)
                loginwebsite()
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
}

document.querySelector('.signup').addEventListener('click',()=>{
    window.location.href='/signup'
});

document.querySelector(".forgotpassword").addEventListener('click',()=>{
    forgotpasswordpage()
})
loginwebsite()