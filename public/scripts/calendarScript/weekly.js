import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { turndaytoid, choosehilght,chooseremindernumber,indays } from './utils.js';
import {today, day} from '../calendar.js'
import { myEvents } from '../../data/events.js';

//utils
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

export function getRemindDate(date,reminddaybefore){
    let remindday=dayjs(date).subtract(reminddaybefore, 'day')
    return(turndaytoid(remindday))
}

function isRepeatDate(repeatList,date1,date2){
    if (date1==date2){
        return(false)
    }
    if (dayjs(date1).isBefore(dayjs(date2))){
        let diffrence=dayjs(date2).diff(date1,repeatList[1],true)
        let check=diffrence/Number(repeatList[0])
        if (check!==0 &&check==check.toFixed(0)){
            return(true);
        }
    }
    return(false);
}



function ifreminderepeat(repeatList,date1,date2,name){
    if (repeatList[0]!='0'){
        if(isRepeatDate(repeatList,date1,date2)){
            return(true)
        }
    }else if (name=='Birthday'){
        if (isRepeatDate([1,'year'],date1,date2)){
            return(true)
        }
    }
    return(false)
}

//weekly
export function renderthisweek (){
    
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
    return(weekDayHTML)
    
}



//update events
export function renderToDoFromEvents(date){
    let dayListHTML=''
    myEvents.forEach((someEvent)=>{
        if(someEvent.date===date ||((someEvent.repeatList)[0]!=0 && isRepeatDate(someEvent.repeatList,someEvent.date,date))){
            let {date, hourStart,name,howLongminutes,withWhom,checked}=someEvent
            if (name!='Birthday'){
                let timestamp=date+' '+hourStart
                let finishhour=(dayjs(timestamp).add(howLongminutes,'minute')).format('H:mm')
                dayListHTML+=`
                <li ><input id="${timestamp}" class="checkbox" type="checkbox" ${checked}>
                <div class=${choosehilght()}> ${hourStart}-${finishhour}, ${name} ${withWhomFunction (withWhom)} </div>
                <div id="${timestamp}" class="update-event">
                <div id="${timestamp}" class="delete">Delete</div>
                <div id="${timestamp}" class="edit">Edit</div></div></li>
                `
            }
        }
    })
    return(dayListHTML)    
    
}


export function renderremindersFromEvents(date){
    let dayListHTML='<p>Reminders:</p>'
    myEvents.forEach((someEvent)=>{
        if(someEvent.reminddate==date || ifreminderepeat(someEvent.repeatList,someEvent.reminddate,date,someEvent.name)){
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