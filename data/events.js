export let myEvents=JSON.parse(localStorage.getItem('myEvents'))
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {renderInputWindow} from '../scripts/calendar.js'
import {withWhomFunction, getRemindDate} from '../scripts/calendarScript/weekly.js'
if (!myEvents){
    myEvents=
        [
            {
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
            {
                date: '2023-11-22',
                hourStart: '9:00',
                name: 'Study Java script',
                howLongminutes: 240,
                withWhom: [Liel],
                reminddaybefore: 0,
                reminddate: '',
                repeatList: ['0','day'],
                checked:'',
    
            },
            {
                date: '2023-11-22',
                hourStart: '17:00',
                name: 'Clean my room',
                howLongminutes: 60,
                withWhom: [],
                reminddaybefore: 0,
                reminddate: '',
                repeatList: ['0','day'],
                checked:'',
    
            },
            {
                date: '2023-11-23',
                hourStart: '12:00',
                name: 'Studdy session',
                howLongminutes: 180,
                withWhom: ['Rori','Paris'],
                reminddaybefore: 3,
                reminddate: '2023-11-20',
                repeatList: ['1','month'],
                checked:'',
    
            },
            {
                date: '2023-11-23',
                hourStart: '15:45',
                name: 'First day at my new job',
                howLongminutes: 120,
                withWhom: ['Yael'],
                reminddaybefore: 2,
                reminddate: '2023-11-21',
                repeatList: ['0','day'],
                checked:'',
    
            },
            {
                date: '2023-11-25',
                hourStart: '17:00',
                name: 'Washing my hair',
                howLongminutes: 180,
                withWhom: ['me','myself','I'],
                reminddaybefore: 0,
                reminddate: '',
                repeatList: ['1','week'],
                checked:'',
    
            },
            {
                date: '2023-11-26',
                hourStart: '0:00',
                name: 'Birthday',
                howLongminutes: 70,
                withWhom: ['Shira'],
                reminddaybefore: 2,
                reminddate: '2023-11-26',
                repeatList: ['0','day'],
                checked:'',
    
            },
            {
                date: '2023-11-26',
                hourStart: '18:00',
                name: 'Ingection',
                howLongminutes: 10,
                withWhom: ['Mom'],
                reminddaybefore: 7,
                reminddate: '2023-11-19',
                repeatList: ['28','day'],
                checked:'',
    
            },
            {
                date: '2023-11-26',
                hourStart: '19:00',
                name: 'Dinner Party',
                howLongminutes: 120,
                withWhom: ['Shira','Eden'],
                reminddaybefore: 2,
                reminddate: '2023-11-24',
                repeatList: ['0','day'],
                checked:'',
    
            },

            
        ];
}

export function saveToStorage(){
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

function sortEvents(a,b){
    if (dayjs(a).isBefore(dayjs(b))){
        return(-1)
    }else if (dayjs(b).isBefore(dayjs(a))){
        return(1)
    }

}

export function checkedevent(eventId){
    myEvents.forEach((selectedEvent)=>{
        let selectedEventId= selectedEvent.date+' '+selectedEvent.hourStart
        if (selectedEventId==eventId){
            if (selectedEvent.checked==' '){
                selectedEvent.checked='checked'
            }else if (selectedEvent.checked=='checked'){
                selectedEvent.checked=' '
  
            }

        }
    })

    saveToStorage();
}
