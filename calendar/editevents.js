import { myEvents } from "../data/events.js";

export function updateToDoFromEvents(date){
    let dayListHTML=''
    myEvents.forEach((someEvent)=>{
        if(someEvent.date===date){
            let {date, hourStart,name,howLongminutes,withWhom}=someEvent
            let timestamp=date+' '+hourStart
            let finishhour=(dayjs(timestamp).add(howLongminutes,'minute')).format('H:mm')
            dayListHTML+=`
            <li><input type="checkbox">${hourStart}-${finishhour}, ${name} ${withWhomFunction (withWhom)}</li>
            `
        }
    })
    return(dayListHTML)    
    
}

function withWhomFunction (withWhom){
    if (withWhom==[]){
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

