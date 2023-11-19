export let myEvents=JSON.parse(localStorage.getItem('myEvents'))
import {renderInputWindow, withWhomFunction, getRemindDate, sortEvents} from '../calendar.js'
if (!myEvents){
    myEvents=
        [
            {
                date:'2023-11-16',
                hourStart:'12:00',
                name:'Study session at Lukes',
                howLongminutes: 90,
                withWhom:['Rory','Paris'],
                rimindaysbefore:2,
                repeat:'month',
            },
            {
                date:'2023-11-17',
                hourStart:'16:00',
                name:'salon appointment',
                howLongminutes: 70,
                withWhom:['Micky','Mouse'],
                rimindbefore:{
                    week:1,
                    day:3,
                    hour:5,
                    minute:20,
                },
                repeat:'month',
            },
            {
                date:'2023-11-18',
                hourStart:'10:30',
                name:'Breakfast at Tiffany',
                howLongminutes: 60,
                withWhom:['Audrey'],
                rimindbefore:{
                    week:1,
                    day:3,
                    hour:5,
                    minute:20,
                },
                repeat:'month',
            },
            {
                date:'2023-11-19',
                hourStart:'12:00',
                name:'Study session at Lukes',
                howLongminutes: 90,
                withWhom:['Rory','Paris'],
                rimindbefore:{
                    week:1,
                    day:3,
                    hour:5,
                    minute:20,
                },
                repeat:'month',
            },
            {
                date:'2023-11-20',
                hourStart:'16:00',
                name:'salon appointment',
                howLongminutes: 70,
                withWhom:['Micky','Mouse'],
                rimindbefore:{
                    week:1,
                    day:3,
                    hour:5,
                    minute:20,
                },
                repeat:'month',
            },
            {
                date:'2023-11-21',
                hourStart:'10:30',
                name:'Breakfast at Tiffany',
                howLongminutes: 60,
                withWhom:['Audrey'],
                rimindbefore:{
                    week:1,
                    day:3,
                    hour:5,
                    minute:20,
                },
                repeat:'month',
            },{
                date:'2023-11-22',
                hourStart:'12:00',
                name:'Study session at Lukes',
                howLongminutes: 90,
                withWhom:['Rory','Paris'],
                rimindbefore:{
                    week:1,
                    day:3,
                    hour:5,
                    minute:20,
                },
                repeat:'month',
            },
            {
                date:'2023-11-23',
                hourStart:'16:00',
                name:'salon appointment',
                howLongminutes: 70,
                withWhom:['Micky','Mouse'],
                rimindbefore:{
                    week:1,
                    day:3,
                    hour:5,
                    minute:20,
                },
                repeat:'month',
            },
            {
                date:'2023-11-23',
                hourStart:'10:30',
                name:'Breakfast at Tiffany',
                howLongminutes: 60,
                withWhom:['Audrey'],
                rimindbefore:{
                    week:1,
                    day:3,
                    hour:5,
                    minute:20,
                },
                repeat:'month',
            },

            
        ];
}

function saveToStorage(){
    myEvents.sort((a, b) => {
        const EventAId=a.date+' '+a.hourStart
        const EventBId=b.date+' '+b.hourStart
        return(sortEvents(EventAId,EventBId));
        /*const timeA = a.hourStart.split(':');
        const timeB = b.hourStart.split(':');
        
        const hourA = parseInt(timeA[0], 10);
        const minuteA = parseInt(timeA[1], 10);
    
        const hourB = parseInt(timeB[0], 10);
        const minuteB = parseInt(timeB[1], 10);
    
        // Compare hours first
        if (hourA !== hourB) {
            return hourA - hourB;
        }
    
        // If hours are the same, compare minutes
        return minuteA - minuteB;*/
    });
    localStorage.setItem('myEvents', JSON.stringify(myEvents));
}

export function deleteEvent(eventId){
    const newEvents=[]

    myEvents.forEach((selectedEvent)=>{
        let selectedEventId= selectedEvent.date+' '+selectedEvent.hourStart
        if (selectedEventId!==eventId){
            newEvents.push(selectedEvent)
        }
    });
    myEvents = newEvents

    saveToStorage();

}
export function deletereminder(eventId){
    myEvents.forEach((selectedEvent)=>{
        let selectedEventId= selectedEvent.date+' '+selectedEvent.hourStart
        if (selectedEventId==eventId){
            selectedEvent.reminddate=''
            selectedEvent.reminddaybefore=0
        }
    })
    saveToStorage();
}

export function addEvent(){
    
    document.querySelector(".if-missing").innerHTML=''
    let newEvent={}
    let check=0
    document.querySelectorAll(".js-input").forEach((inputValue)=>{
        let Value=inputValue.value
        let typeValue=inputValue.id
        if (typeValue=='withWhom'){
            if ((Value).toString()===''){
                newEvent[typeValue]=[]
            }else{
                newEvent[typeValue]=Value.split(' and ')
            }
        }else if (typeValue=='reminddaybefore'){
            if ((Value).toString()===''){
                newEvent[typeValue]=0
            }else{
                newEvent[typeValue]=Value
            }
        }else if (typeValue=='repeatList'){
            if ((Value).toString()===''){
                newEvent[typeValue]=[0,'day']
            }else{
                newEvent[typeValue]=Value.split(', ')
            }
        }else if (typeValue=='hourStart'){
            if ((Value).toString()===''){
                newEvent[typeValue]='0:00'
            }else{
                newEvent[typeValue]=Value
            }
        }else if((Value).toString()===''){
            check=1
            document.querySelector(".if-missing").innerHTML='somthing missing'
        }else{
            newEvent[typeValue]=Value
        }
        
        
    })
    
    //check if id exits
    if (check==0){
        let newEventId=newEvent.date+' '+newEvent.hourStart
        myEvents.forEach((selectedEvent)=>{
            let selectedEventId= selectedEvent.date+' '+selectedEvent.hourStart
            if (selectedEventId===newEventId){
                check=1
                document.querySelector(".if-missing").innerHTML='you have an event at that time'
            }
        });
    }
    if (check==0){
        //create reminder
        if (newEvent.name=='Birthday'){
            newEvent.reminddate=newEvent.date
        }else if(newEvent.reminddaybefore==0){
            newEvent.reminddate=''
        }else{
            newEvent.reminddate=getRemindDate(newEvent.date,newEvent.reminddaybefore)
        }
        myEvents.push(newEvent)
        saveToStorage()
        renderInputWindow()

    }
    
    
}

export function editEvent(eventId){
    
    let eventObject
    myEvents.forEach((Event)=>{
        let selectedEventId= Event.date+' '+Event.hourStart
        if (selectedEventId==eventId){
            eventObject= Event
        }
    });
    
    document.getElementById('date').value = eventObject.date;
    document.getElementById('hourStart').value = eventObject.hourStart;
    document.getElementById('howLongminutes').value = eventObject.howLongminutes;
    document.getElementById('name').value = eventObject.name;
    document.getElementById('withWhom').value = withWhomFunction(eventObject.withWhom).replace('with ', '');
    document.getElementById('reminddaybefore').value=eventObject.reminddaybefore
    document.getElementById('repeatList').value=eventObject.repeatList[0]+', '+eventObject.repeatList[1]
}

