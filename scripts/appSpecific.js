import * as iconInfo from "./iconInfo.js";

const containerBackground = "#5B9BE3";
const containerBackgroundHovered = "#7AADE6"

const slider = document.getElementById("slider");
const innerSlider = document.getElementById("slider-inner");

let pressed = false; 
let startx;
let x;

export function getDay(date){
    
    const newDate = parseDate(date);
    const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysInWeek[newDate.getDay()];

}

export function getHours(date){

    const newDate = parseDate(date);
    return newDate.getHours();
}

export function getMinutes(date){
    const newDate = parseDate(date);
    const minutes = newDate.getMinutes();
    
    if(minutes >= 10){
        return minutes;
    }
    else{
        return "0" + minutes;
    }
    
}

export function getIconLive(data){

    const timeNow = extractTime(data.location.localtime);
    const sunrise = convertTime12to24(data.forecast.forecastday[0].astro.sunrise);
    const sunset = convertTime12to24(data.forecast.forecastday[0].astro.sunset);
    const code = data.current.condition.code;
    const find = iconInfo.iconInfoStorage.find(item => item.code === code);
 
    if(timeNow > sunrise && timeNow < sunset){
        
        return `icons/day/${find.icon}.png`
    }
    else{
        return `icons/night/${find.icon}.png`
    }
}


// Weather slider
export function mouseEnter(){
    slider.style.cursor = "grab";
}

export function dragStart(event){
    pressed = true;
    startx = event.offsetX - innerSlider.offsetLeft;
    slider.style.cursor = "grabbing";
}

export function dragEnd(){
    pressed = false;
    slider.style.cursor = "grab";
}

export function drag(event){
    if(!pressed) return;
    event.preventDefault();

    x = event.offsetX

    innerSlider.style.left = `${x - startx}px`;

    checkBoundary();
}



function checkBoundary(){
    let outer = slider.getBoundingClientRect();
    let inner = innerSlider.getBoundingClientRect();

    if(parseInt(innerSlider.style.left) > 0){
        innerSlider.style.left = "0px";
    }else if(inner.right < outer.right) {
        innerSlider.style.left = `-${inner.width - outer.width}px`
    }
}



function parseDate(date){
    
    return new Date(date);
}

function convertTime12to24(time12h){
    const [time, modifier] = time12h.split(' ');
  
    let [hours, minutes] = time.split(':');
  
    if (hours === '12') {
      hours = '00';
    }
  
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return `${hours}:${minutes}`;
}

function extractTime(dateTimeString) {
    
    const [datePart, timePart] = dateTimeString.split(' ');
  
    
    return timePart;
}
