import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function turndaytoid(day){
    return((day).format('YYYY-MM-DD'))
}

let highlightnumber=1
let remindernumber=1

export function choosehilght(){
    if (highlightnumber==5){
        highlightnumber=1
        return('highlight-5')
    }else{
        let highlightStyle=`highlight-${highlightnumber}`
        highlightnumber+=1
        return(highlightStyle)
    }
}

export function chooseremindernumber(){
    if (remindernumber==6){
        remindernumber=1
        return(6)
    }else{
        let stylenumber=remindernumber.toFixed(0)
        remindernumber+=1
        return(stylenumber)
    }
}

export function indays (idday){
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

export function isValidEmail(email) {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }