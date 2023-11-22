import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deleteEvent ,addEvent,editEvent,deletereminder, checkedevent} from "../data/events.js";
import {renderthisweek} from './calendarScript/weekly.js'
import { renderNavBar } from './calendarScript/navbar.js';
import { renderthismonth } from './calendarScript/monthly.js';

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





//weekly

function renderWebsiteWeek (){
    let weekDayHTML=renderthisweek()
    //interactive things to render thepage
    //left Arrow
    document.querySelector(".next-week").innerHTML=weekDayHTML
    document.querySelector('.left-arrow')
        .addEventListener('click',()=>{
            day=day.subtract(7,'day')
            monthformat=day.format('MMMM, YYYY')
            renderNavBar()
            renderWebsiteWeek()
        })
    
    //right Arrow
    document.querySelector('.right-arrow')
        .addEventListener('click',()=>{
            day=day.add(7,'day')
            monthformat=day.format('MMMM, YYYY')
            renderNavBar()
            renderWebsiteWeek()
            
        }) 

    //delete event
    document.querySelectorAll(".delete").forEach((button)=>{
        button.addEventListener('click',()=>{
            deleteEvent(button.id)
            
            renderWebsiteWeek()
        })
    })
    //edit event
    document.querySelectorAll(".edit").forEach((button)=>{
        button.addEventListener('click',()=>{
            
            editEvent(button.id,day)
            
            deleteEvent(button.id)
            
            renderWebsiteWeek()
            
        })
    })
    //check event
    
    document.querySelectorAll(".checkbox").forEach((checkbutton)=>{
        checkbutton.addEventListener('click',()=>{
            checkedevent(checkbutton.id)
            renderWebsiteWeek()
            if (checkbutton.checked==false){
                checkbutton.checked=true
            }else{
                checkbutton.checked=false
            }
            
        })
    })
    //delete reminder
    document.querySelectorAll(".rdelete").forEach((button)=>{
        button.addEventListener('click',()=>{
            deletereminder(button.id)

            renderWebsiteWeek()
        })
    })
    //home button
    document.querySelector(".homebutton").addEventListener('click',()=>{
        day=today
        monthformat=day.format('MMMM, YYYY')
        renderNavBar()
        renderWebsiteWeek()
    })
    //go to date
    document.querySelector(".gotodatebutton").addEventListener('click',()=>{
        goToDate()
        renderWebsiteWeek()
    })
    //monthly
    document.querySelector(".monthlybutton").addEventListener('click',()=>{
        if (monthOrWeek==0){
        document.querySelector(".content").innerHTML=''
        monthOrWeek=1
        document.querySelector(".content").classList.remove("next-week")
        document.querySelector(".content").classList.add("monthly")
        renderWebsiteMonth()
        }
    })
    
}

function renderWebsiteMonth (){
    let monthlyHTML=renderthismonth()
    //interactive things to render thepage
    //left Arrow
    document.querySelector(".monthly").innerHTML=monthlyHTML
    document.querySelector('.left-arrow')
        .addEventListener('click',()=>{
            day=day.subtract(32,'day')
            monthformat=day.format('MMMM, YYYY')
            monthDays=day.daysInMonth()
            monthId=day.format('YYYY-MM')
            renderNavBar()
            renderWebsiteMonth()
        })
    
    //right Arrow
    document.querySelector('.right-arrow')
        .addEventListener('click',()=>{
            day=day.add(32,'day')
            monthformat=day.format('MMMM, YYYY')
            monthDays=day.daysInMonth()
            monthId=day.format('YYYY-MM')
            renderNavBar()
            renderWebsiteMonth()
            
        }) 

    //delete event
    document.querySelectorAll(".delete").forEach((button)=>{
        button.addEventListener('click',()=>{
            deleteEvent(button.id)
            
            renderWebsiteMonth()
        })
    })
    //edit event
    document.querySelectorAll(".edit").forEach((button)=>{
        button.addEventListener('click',()=>{
            
            editEvent(button.id,day)
            
            deleteEvent(button.id)
            
            renderWebsiteMonth()
            
        })
    })
    //check event
    
    document.querySelectorAll(".checkbox").forEach((checkbutton)=>{
        checkbutton.addEventListener('click',()=>{
            checkedevent(checkbutton.id)
            renderWebsiteMonth()
            if (checkbutton.checked==false){
                checkbutton.checked=true
            }else{
                checkbutton.checked=false
            }
            
        })
    })
    //delete reminder
    document.querySelectorAll(".rdelete").forEach((button)=>{
        button.addEventListener('click',()=>{
            deletereminder(button.id)

            renderWebsiteMonth()
        })
    })
    //home button
    document.querySelector(".homebutton").addEventListener('click',()=>{
        day=today
        monthformat=day.format('MMMM, YYYY')
        monthDays=day.daysInMonth()
        monthId=day.format('YYYY-MM')
        renderNavBar()
        renderWebsiteMonth()
    })
    //go to date
    document.querySelector(".gotodatebutton").addEventListener('click',()=>{
        goToDate()
        renderWebsiteMonth()
    })
    //weekly
    document.querySelector(".weeklybutton").addEventListener('click',()=>{
        document.querySelector(".content").innerHTML=''
        document.querySelector(".content").classList.remove("monthly")
        document.querySelector(".content").classList.add("next-week")
        monthOrWeek=0
        renderWebsiteWeek()
    })
    
}




//side input add event

export function renderInputWindow(){
    
    document.querySelector(".event-window").innerHTML=
        `
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
        `
    document.querySelector(".update-event-button").addEventListener('click',(handlerUpdateButton))
}

function handlerUpdateButton(){
    addEvent()
    if (monthOrWeek==0){
        renderWebsiteWeek()
    }else if (monthOrWeek==1){
        renderWebsiteMonth()
    }

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

//monthly


document.querySelector(".content").classList.add("next-week")
renderNavBar()
renderWebsiteWeek ()
renderInputWindow()


