

const regestation=document.querySelector(".login");

regestation.addEventListener('click',()=>{
    
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
            if (data.result=='login sucessful. Retrieving your data'){
                document.querySelector(".messege").innerHTML=data.result
                fetch('/events/retrieveevent',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                })
                .then(response => response.json())
                .then(data=>{
                    let {Events}=data
                    localStorage.setItem('myEvents', JSON.stringify(Events));
                    window.location.href='/my-princess-diary'
                    

                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }else {
            document.querySelector(".messege").innerHTML=data.result
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        }
    
});

document.querySelector('.signup').addEventListener('click',()=>{
    window.location.href='/signup'
});