import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deleteEvent ,addEvent,editEvent,deletereminder, checkedevent} from "../data/events.js";
import {renderthisweek} from './calendarScript/weekly.js'
import { renderNavBar,logout } from './calendarScript/navbar.js';
import { renderthismonth } from './calendarScript/monthly.js';
import { turndaytoid } from './calendarScript/utils.js';
import {updateeventscloud} from './calendarScript/cloud.js';

export let today=dayjs()
export let day=dayjs()
export let monthformat=day.format('MMMM, YYYY')
export let monthDays=day.daysInMonth()
export let monthId=day.format('YYYY-MM')
let monthOrWeek=0

let idtoday=today.format('YYYY-MM-DD')

//console.log(dayjs('2023-11-25').format('d'))

//practice
//console.log(dayjs().daysInmonth())
//console.log(dayjs().subtract(1,'day'))
//Get the number of days in the current month.
//console.log(dayjs().daysInmonth())

export let Currentusername=''



//weekly

function renderWebsite (){
    if (monthOrWeek==1){
        document.querySelector(".monthly").innerHTML=renderthismonth()
    }else if (monthOrWeek==0){
        document.querySelector(".next-week").innerHTML=renderthisweek()
    }
    
    //interactive things to render thepage
    //left Arrow
    document.querySelector('.left-arrow')
        .addEventListener('click',()=>{
            if (monthOrWeek==0){
                day=day.subtract(7,'day')
            }else if (monthOrWeek==1){
                day=day.subtract(32,'day')
            }
            monthformat=day.format('MMMM, YYYY')
            monthDays=day.daysInMonth()
            monthId=day.format('YYYY-MM')
            renderNavBar()
            renderWebsite()
        })
    
    //right Arrow
    document.querySelector('.right-arrow')
        .addEventListener('click',()=>{
            if (monthOrWeek==0){
                day=day.add(7,'day')
            }else if (monthOrWeek==1){
                day=day.add(32,'day')
            }
            monthformat=day.format('MMMM, YYYY')
            monthDays=day.daysInMonth()
            monthId=day.format('YYYY-MM')
            renderNavBar()
            renderWebsite()
            
        }) 

    //delete event
    document.querySelectorAll(".delete").forEach((button)=>{
        button.addEventListener('click',()=>{
            deleteEvent(button.id)
            
            renderWebsite()
        })
    })
    //edit event
    document.querySelectorAll(".edit").forEach((button)=>{
        button.addEventListener('click',()=>{
            
            editEvent(button.id,day)
            
            deleteEvent(button.id)
            
            renderWebsite()
            
        })
    })
    //check event
    
    document.querySelectorAll(".checkbox").forEach((checkbutton)=>{
        checkbutton.addEventListener('click',()=>{
            checkedevent(checkbutton.id)
            if (checkbutton.checked==false){
                checkbutton.checked=true
            }else{
                checkbutton.checked=false
            }
            renderWebsite()
        })
    })
    //delete reminder
    document.querySelectorAll(".rdelete").forEach((button)=>{
        button.addEventListener('click',()=>{
            deletereminder(button.id)

            renderWebsite()
        })
    })
    //home button
    document.querySelector(".homebutton").addEventListener('click',()=>{
        if (turndaytoid(day)!=turndaytoid(today)){
            day=today
            monthformat=day.format('MMMM, YYYY')
            monthDays=day.daysInMonth()
            monthId=day.format('YYYY-MM')
            renderNavBar()
            renderWebsite()
        }
    })
    //go to date
    document.querySelector(".gotodatebutton").addEventListener('click',()=>{
        goToDate()
        renderWebsite()
    })
    //monthly
    document.querySelector(".monthlybutton").addEventListener('click',()=>{
        if (monthOrWeek==0){
            document.querySelector(".content").innerHTML=''
            monthOrWeek=1
            document.querySelector(".content").classList.remove("next-week")
            document.querySelector(".content").classList.add("monthly")
            renderWebsite()
        }
    })

    //weekly
    document.querySelector(".weeklybutton").addEventListener('click',()=>{
        if (monthOrWeek==1){
            document.querySelector(".content").innerHTML=''
            document.querySelector(".content").classList.remove("monthly")
            document.querySelector(".content").classList.add("next-week")
            monthOrWeek=0
            renderWebsite()
        }
    })
    //upload data to cloud
    document.querySelector(".savebutton").removeEventListener('click',handlerforupdatedata)
    document.querySelector(".savebutton").addEventListener('click',handlerforupdatedata)

    //logout
    document.querySelector(".logout").addEventListener('click',logout)

    window.addEventListener('scroll', function () {
        // Check if the scroll position is below the specified distance
        if (window.scrollY >= distanceFromTop) {
            fixedSidebar.classList.add('fixed');
        } else {
            fixedSidebar.classList.remove('fixed');
        }
    });
    
}


//side input add event

export function renderInputWindow(){
    
    document.querySelector(".event-window").innerHTML=
        `
        <div class="flowbar">
            Add New Event:
            <input id="date" class="js-input date-input" type="date" >
            start time
            <input id="hourStart" class="js-input start-time-input" type="text" placeholder="00:00">
            <input id="howLongminutes" class="js-input minutes-input" type="number" placeholder="minutes long">
            <textarea id="name" class="js-input name-input" id="myTextArea" rows="1" cols="1" placeholder="the name of event"></textarea>
            <textarea id="withWhom" class="js-input with-input" id="myTextArea" rows="1" cols="1" placeholder="with Whom"></textarea>
            remind days before:
            <input id="reminddaybefore" class="js-input days-input" type="number" placeholder="number">
            repeat in
            <textarea id="repeatList" class="js-input days-input" id="myTextArea" rows="1" cols="1" placeholder="0, day"></textarea>
            <button class="update-event-button">Submit</button>
            <div class="if-missing"></div>
        </div>
        `
    document.querySelector(".update-event-button").addEventListener('click',(handlerUpdateButton))
}

function handlerUpdateButton(){
    addEvent()
    renderWebsite()

}

//nav-bar
export function goToDate(){
    let goToDateValue=document.getElementById('gotodate').value
    if (goToDateValue.toString()==''){
    }else{
        day=dayjs(goToDateValue)
        monthformat=day.format('MMMM, YYYY')
        monthDays=day.daysInMonth()
        monthId=day.format('YYYY-MM')
        //render the date
        renderNavBar()  
    }
}

function handlerforupdatedata(){
    updateeventscloud()
    renderNavBar()
    renderWebsite()
    
}

function getusername(){
    fetch('/events/getusername',{
        method:'GET'
    })
    .then(response => response.json())
    .then((data)=>{
        Currentusername=data.username
        renderNavBar()
        renderWebsite ()
        renderInputWindow()

    })
    .catch((err)=>console.log(err))
}

document.querySelector(".content").classList.add("next-week")
getusername()



