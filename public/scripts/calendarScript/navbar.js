import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {monthformat} from '../calendar.js'

//nav-bar


export function renderNavBar(){
    document.querySelector(".nav-bar").innerHTML=
    `<img class="js-img homebutton"src="./images/homebutton.png">
    <img class="js-img weeklybutton"src="./images/weekly.png">
    <img class="js-img monthlybutton"src="./images/monthly.png">
    <div class="month">${monthformat}</div>
    go to that date >>
    <input id="gotodate" class="date-input" type="date" >
    <div class="gotodatebutton">></div>
    <img class="js-img savebutton"src="./images/save.png">
    `
}
