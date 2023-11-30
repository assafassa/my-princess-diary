export let myEvents=JSON.parse(localStorage.getItem('myEvents'))
export let myChanges=JSON.parse(localStorage.getItem('myChanges'))
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {renderInputWindow} from '../scripts/calendar.js'
import {withWhomFunction, getRemindDate} from '../scripts/calendarScript/weekly.js'
if (!myEvents){
    myEvents=
        [
            {
                Id:'2023-11-21 13:00',
                date: '2023-11-21',
                hourStart: '13:00',
                name: 'Shopping',
                howLongminutes: 45,
                withWhom: ['Blair','Serena'],
                reminddaybefore: 1,
                reminddate: '2023-11-20',
                repeatList: ['0','day'],
                checked:'',
    
            },
            
            
        ];
}
if (!myChanges){
    myChanges=
        [   
            ['DELETE',
            {
                Id: '2023-11-21 13:00',
                date: '2023-11-21',
                hourStart: '13:00',
                name: 'Shopping',
                howLongminutes: 45,
                withWhom: ['Blair','Serena'],
                reminddaybefore: 1,
                reminddate: '2023-11-20',
                repeatList: ['0','day'],
                checked:'',
    
            }],
            

            
        ];
}

function deleteduplicatechanges(selectedEventId){
    let myNewChanges=[]
    myChanges.forEach((change)=>{
       let changeid= change[1].Id
       if (changeid!=selectedEventId){
            myNewChanges.push(change)
       }
    })
    myChanges=myNewChanges
}
export function saveToStorage(){
    myEvents.sort((a, b) => {
        const EventAId=a.Id
        const EventBId=b.Id
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
    localStorage.setItem('myChanges',JSON.stringify(myChanges));
    
}

export function deleteEvent(eventId){
    const newEvents=[]

    myEvents.forEach((selectedEvent)=>{
        let selectedEventId= selectedEvent.Id
        if (selectedEventId!==eventId){
            newEvents.push(selectedEvent)
        }else{
            deleteduplicatechanges(selectedEventId)
            myChanges.push(['DELETE',selectedEvent])
        }
    });
    myEvents = newEvents

    saveToStorage();

}

export function deletereminder(eventId){
    myEvents.forEach((selectedEvent)=>{
        let selectedEventId= selectedEvent.Id
        if (selectedEventId==eventId){
            selectedEvent.reminddate=''
            selectedEvent.reminddaybefore=0
            deleteduplicatechanges(selectedEventId)
            myChanges.push(['UPDATE',selectedEvent])
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
        newEvent.Id=newEvent.date+' '+newEvent.hourStart
        myEvents.forEach((selectedEvent)=>{
            let selectedEventId= selectedEvent.Id
            if (selectedEventId===newEvent.Id){
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
        deleteduplicatechanges(newEvent.Id)
        myChanges.push(['ADDorEDIT',newEvent])
        saveToStorage()
        renderInputWindow()

    }
    
    
}

export function editEvent(eventId){
    
    let eventObject
    myEvents.forEach((Event)=>{
        let selectedEventId= Event.Id
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

function sortEvents(a,b){
    if (dayjs(a).isBefore(dayjs(b))){
        return(-1)
    }else if (dayjs(b).isBefore(dayjs(a))){
        return(1)
    }

}

export function checkedevent(eventId){
    myEvents.forEach((selectedEvent)=>{
        let selectedEventId= selectedEvent.Id
        if (selectedEventId==eventId){
            if (selectedEvent.checked==' '){
                selectedEvent.checked='checked'
            }else if (selectedEvent.checked=='checked'){
                selectedEvent.checked=' '
  
            }
            deleteduplicatechanges(eventId)
            myChanges.push(['ADDorEDIT',selectedEvent])
        }
    })
    
    saveToStorage();
}
