

const regestation=document.querySelector(".login");

regestation.addEventListener('click',()=>{
    
    let username=document.getElementById("username").value
    let password=document.getElementById("password").value
    
    if (username!='' & password!=''){
        const dataToSend = {
            username,
            password
        };
        // Use fetch to send a POST request to the server
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server if needed
            if (data.result=='yes'){
            window.location.href='/my-princess-diary'
            }else {
            document.querySelector(".messege").innerHTML=data.result
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        }
    
});
