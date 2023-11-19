import { evalsrting } from '../calendar.js'
import {updateToDoFromEvents} from './editevents.js'
import {turndaytoid} from './utils.js'

export function updateThisWeek (day,today){
    
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
            <p>TO DO LIST:</p>
            <ol id=(${(idday)}) class="to-do-list">
                ${updateToDoFromEvents(idday)}
            </ol>
        </div>` 
    }
    weekDayHTML+=`<img class='arrow-image right-arrow' src=${imagerightElementsrc}>`
    document.querySelector(".next-week").innerHTML=weekDayHTML
    document.querySelector('.left-arrow')
        .addEventListener('click',()=>{
            day=day.subtract(7,'day')
            updateThisWeek(day)
        })
    document.querySelector('.right-arrow')
        .addEventListener('click',()=>{
            day=day.add(7,'day')
            updateThisWeek(day)
        })  
      
    
}

function indays (idday,today){
    if (idday==turndaytoid(evalsrting(today.subtract(1,'day')))){
        return('<p class="day-of-week">Yesterday</p>')
    }    
    if (idday==turndaytoid(today)){
        return ('<p class="day-of-week">Today</p>')
    }else if(idday==turndaytoid(today.add(1,'day'))){
        return('<p class="day-of-week">Tommorow</p>')
    }else if (idday==turndaytoid(today.add(2,'day'))){
        return('<p class="day-of-week">Two Days</p>')
    }else {
        return('<p class="day-of-week-none"> _</p>')
    }
}



