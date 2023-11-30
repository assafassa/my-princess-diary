


export function updateeventscloud(){
    let myChanges=JSON.parse(localStorage.getItem('myChanges'))
    fetch('/events/updatedata',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({changes: myChanges})
    })
    .then(response => {
        localStorage.setItem('myChanges', JSON.stringify([]))
        document.querySelector(".updatedcontainor").innerHTML='updated'
        document.querySelector(".savebutton").innerHTML=`<img class="js-img savebuttonimg"src="./images/savecheck.png">`
        setTimeout(() => {
            document.querySelector(".updatedcontainor").innerHTML='' 
            document.querySelector(".savebutton").innerHTML=`<img class="js-img savebuttonimg"src="./images/save.png">`
        }, 1000);
    })
    .catch(error => {
        console.error('Error:', error);
    });    
}