import { myEvents,deleteEvent ,addEvent,editEvent,deletereminder} from "../data/events.js";

let today=dayjs()
let day=dayjs()
let month=day.format('MMMM, YYYY')
let idtoday=today.format('YYYY-MM-DD')
let highlightnumber=1
let remindernumber=1





//practice
//console.log(dayjs().daysInMonth())
//console.log(dayjs().subtract(1,'day'))
//Get the number of days in the current month.
//console.log(dayjs().daysInMonth())



//utils
export function sortEvents(a,b){
    if (dayjs(a).isBefore(dayjs(b))){
        return(-1)
    }else if (dayjs(b).isBefore(dayjs(a))){
        return(1)
    }

}
function isRepeatDate(repeatList,date1,date2){
    console.log(date1,date2)
    if (date1==date2){
        return(false)
    }
    let day1=dayjs(date1)
    let day2=dayjs(date2)
    while (day1.isBefore(day2)){
        day1=day1.add(repeatList[0],repeatList[1])
        if (turndaytoid(day1)==turndaytoid(day2)){
            return(true);
        }
    }
    return(false);
}


function turndaytoid(day){
    return((day).format('YYYY-MM-DD'))
}
function choosehilght(){
    if (highlightnumber==5){
        highlightnumber=1
        return('highlight-5')
    }else{
        let highlightStyle=`highlight-${highlightnumber}`
        highlightnumber+=1
        return(highlightStyle)
    }
}
function chooseremindernumber(){
    if (remindernumber==6){
        remindernumber=1
        return(6)
    }else{
        let stylenumber=remindernumber.toFixed(0)
        remindernumber+=1
        return(stylenumber)
    }
}

export function getRemindDate(date,reminddaybefore){
    let remindday=dayjs(date).subtract(reminddaybefore, 'day')
    return(turndaytoid(remindday))
}
//weekly
function updateThisWeek (){
    
    let imageleftElementsrc = './images/leftarrow.png'
    let imagerightElementsrc = './images/rightarrow.png'
    let weekDayHTML=`<img class='arrow-image left-arrow' src=${imageleftElementsrc}>`
    for (let i = 0; i <= 6; i++) {
        let thatday=day.add(i,'day')
        let showday=(thatday).format('dddd, D')
        let idday=turndaytoid(thatday)
        weekDayHTML+=`
        <div id=(${(idday)}) class="weekday">
            ${indays(idday,today)}
            <p class='show-date'>${showday}</p>
            <ol id=(r${(idday)}) class="recurrence">
                ${renderremindersFromEvents(idday)}
            </ol>
            <p>TO DO LIST:</p>
            <ol id=(${(idday)}) class="to-do-list">
                ${renderToDoFromEvents(idday)}
            </ol>
        </div>` 
    }
    weekDayHTML+=`<img class='arrow-image right-arrow' src=${imagerightElementsrc}>`

    //interactive things to render thepage
    //left Arrow
    document.querySelector(".next-week").innerHTML=weekDayHTML
    document.querySelector('.left-arrow')
        .addEventListener('click',()=>{
            day=day.subtract(7,'day')
            month=day.format('MMMM, YYYY')
            renderNavBar()
            updateThisWeek(day,today)
        })
    
    //right Arrow
    document.querySelector('.right-arrow')
        .addEventListener('click',()=>{
            day=day.add(7,'day')
            month=day.format('MMMM, YYYY')
            renderNavBar()
            updateThisWeek(day,today)
            
        }) 

    //delete event
    document.querySelectorAll(".delete").forEach((button)=>{
        button.addEventListener('click',()=>{
            deleteEvent(button.id)
            
            updateThisWeek()
        })
    })
    //edit event
    document.querySelectorAll(".edit").forEach((button)=>{
        button.addEventListener('click',()=>{
            
            editEvent(button.id,day)
            
            deleteEvent(button.id)
            
            updateThisWeek()
            
        })
    })
    //delete reminder
    document.querySelectorAll(".rdelete").forEach((button)=>{
        button.addEventListener('click',()=>{
            deletereminder(button.id)

            updateThisWeek()
        })
    })
    //home button
    document.querySelector(".homebutton").addEventListener('click',()=>{
        day=today
        month=day.format('MMMM, YYYY')
        renderNavBar()
        updateThisWeek()
    })
    //go to date
    document.querySelector(".gotodatebutton").addEventListener('click',()=>{
        goToDate()
        updateThisWeek()
    })
    
}


function indays (idday){
    if (idday==turndaytoid(dayjs().subtract(1,'day'))){
        return('<p class="day-of-week">Yesterday</p>')
    }   
    if (idday==turndaytoid(dayjs())){
        return ('<p class="day-of-week">Today</p>')
    }else if(idday==turndaytoid(dayjs().add(1,'day'))){
        return('<p class="day-of-week">Tomorrow</p>')
    }else if (idday==turndaytoid(dayjs().add(2,'day'))){
        return('<p class="day-of-week">Two Days</p>')
    }else {
        return('<p class="day-of-week-none"> _</p>')
    }
}


//update events
export function renderToDoFromEvents(date){
    let dayListHTML=''
    myEvents.forEach((someEvent)=>{
        if(someEvent.date===date ){
            let {date, hourStart,name,howLongminutes,withWhom}=someEvent
            if (name!='Birthday'){
                let timestamp=date+' '+hourStart
                let finishhour=(dayjs(timestamp).add(howLongminutes,'minute')).format('H:mm')
                dayListHTML+=`
                <li class=${choosehilght()} ><input class="checkbox" type="checkbox">${hourStart}-${finishhour}, ${name} ${withWhomFunction (withWhom)}
                <div id="${timestamp}" class="update-event">
                <div id="${timestamp}" class="delete">Delete</div>
                <div id="${timestamp}" class="edit">Edit</div></div></li>
                `
            }
        }
    })
    return(dayListHTML)    
    
}


/*
||((someEvent.repeatList)[0]!==0 && isRepeatDate(someEvent.repeatList,someEvent.date,date))

//someEvent.date===date || (((someEvent.repeatList)[0]==0)&&(isRepeatDate(someEvent.repeatList,someEvent.date,date)))
myEvents.forEach((someEvent)=>{
    console.log(someEvent.name, ((someEvent.repeatList)[0]!==0 && isRepeatDate(someEvent.repeatList,someEvent.date,idtoday)))
})*/

export function renderremindersFromEvents(date){
    let dayListHTML='<p>Reminders:</p>'
    myEvents.forEach((someEvent)=>{
        if(someEvent.reminddate==date){
            let {date, hourStart,name,withWhom,reminddaybefore}=someEvent
            let timestamp=date+' '+hourStart
            if (name=='Birthday'){
                dayListHTML+=`
                <li ><image class='rimage' src="./images/presents/present${chooseremindernumber()}.png"> ${withWhom[0]}'s Birthday
                <div id="${timestamp}" class="update-event">
                <div id="${timestamp}" class="delete">Delete</div>
                <div id="${timestamp}" class="edit">Edit</div></div></li>
                `                
            }
            else if(reminddaybefore){
                dayListHTML+=`
                <li  ><image class='rimage' src="./images/reminders/reminder${chooseremindernumber()}.png"> ${name} ${withWhomFunction (withWhom)} in ${reminddaybefore} days
                <div id="${timestamp}" class="update-event">
                <div id="${timestamp}" class="rdelete">Delete</div>
                <div id="${timestamp}" class="edit">Edit</div></div></li>
                `
            }
            
        }
    })
    if (dayListHTML=='<p>Reminders:</p>'){
        return('')
    }else{
        return(dayListHTML) 
    }
    
}

/*
|| 
            ((someEvent.repeatList)[0]!==0 && isRepeatDate(someEvent.repeatList,someEvent.reminddate,date))||
            ((someEvent.name=='Birthday')&& isRepeatDate([1,'year'],someEvent.reminddate,date))
*/

export function withWhomFunction (withWhom){
    if (withWhom==[]){
        return('')
    }else if(!withWhom[0]){
        return('')
    }else{
        let withWhomString='with '
        withWhom.forEach((whome)=>{
            withWhomString+=' '+whome+' and'
        })
        withWhomString=withWhomString.replace(/\s+and$/, '')
        return(withWhomString)
    }
}

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
    document.querySelector(".update-event-button").addEventListener('click',handlerUpdateButton)
}

function handlerUpdateButton(){
    addEvent()
    updateThisWeek()

}

//nav-bar
function goToDate(){
    let goToDateValue=document.getElementById('gotodate').value
    if (goToDateValue.toString()==''){
    }else{
        day=dayjs(goToDateValue)
        month=day.format('MMMM, YYYY')
        //render the date
        renderNavBar()  
    }
}

function renderNavBar(){
    document.querySelector(".nav-bar").innerHTML=
    `<img class="homebutton"src="./images/homebutton.png">
    <div class="month">${month}</div>
    go to that date >>
    <input id="gotodate" class="date-input" type="date" >
    <div class="gotodatebutton">></div>`
}

renderNavBar()
updateThisWeek ()
renderInputWindow()

//monthly

