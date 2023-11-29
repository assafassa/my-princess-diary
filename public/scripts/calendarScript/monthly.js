import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { turndaytoid, indays } from './utils.js';
import {today, day, monthDays,monthId} from '../calendar.js'

import { renderremindersFromEvents, renderToDoFromEvents } from './weekly.js';

    
//console.log(day.daysInMonth())
export function renderthismonth (){
    let firstDayOfMonthId=monthId+'-01'
    let lastDayOfMonthId=monthId+`-${monthDays}`
    let weekdayoffirstday=dayjs(firstDayOfMonthId).format('d')
    let weekdayoflastday=dayjs(lastDayOfMonthId).format('d')
    let loopnumber=Number(monthDays)+Number(weekdayoffirstday)+6-Number(weekdayoflastday)
    let otherloopnamber= Number(monthDays)+Number(weekdayoffirstday)
    let firstdayonmonthly= dayjs(firstDayOfMonthId).subtract(weekdayoffirstday,'day')
    let numberofweeks=Math.ceil(loopnumber/7)
    let imageleftElementsrc = './images/leftarrow.png'
    let imagerightElementsrc = './images/rightarrow.png'
    let monthHTML=`
    <img class='arrow-image left-arrow' src=${imageleftElementsrc}>
    <div class="monthly${numberofweeks}">
    `
    let trackmonth=0
    let daysbefore=0
    for (let k=0; k<loopnumber;k++){
        let thatday=firstdayonmonthly.add(k,'day')
        let showday=(thatday).format('dddd, D')
        let idday=turndaytoid(thatday)
        trackmonth+=1
        if (daysbefore>=Number(weekdayoffirstday) && trackmonth<=otherloopnamber){
            monthHTML+=`
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
        }else{
            daysbefore+=1
            monthHTML+=`
            <div id=(${(idday)}) class="weekday not-in-this-month">
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
    }
        
    monthHTML+=`</div><img class='arrow-image right-arrow' src=${imagerightElementsrc}>`
    return(monthHTML)
    

}
//<div class="monthly${numberofweeks}"></div>