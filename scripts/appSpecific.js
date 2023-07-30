import * as iconInfo from "./iconInfo.js";

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
const sliderWrapper = document.getElementById("sliderWrapper");
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
const CARD_WIDTH = 67; // Adjust this value based on your card width
const NUM_CARDS = sliderWrapper.children.length;
console.log(sliderWrapper.children.length);

sliderWrapper.addEventListener("mousedown", dragStart);
sliderWrapper.addEventListener("touchstart", dragStart);
sliderWrapper.addEventListener("mouseup", dragEnd);
sliderWrapper.addEventListener("touchend", dragEnd);
sliderWrapper.addEventListener("mousemove", drag);
sliderWrapper.addEventListener("touchmove", drag);

function dragStart(event) {
  event.preventDefault();
  isDragging = true;

  if (event.type === "touchstart") {
    startPosition = event.touches[0].clientX;
  } else {
    startPosition = event.clientX;
  }
}

function drag(event) {
  if (isDragging) {
    let currentPosition = 0;

    if (event.type === "touchmove") {
      currentPosition = event.touches[0].clientX;
    } else {
      currentPosition = event.clientX;
    }

    currentTranslate = prevTranslate + currentPosition - startPosition;
    checkBoundary(); // Check if the slider is at its boundary
  }
}

function checkBoundary() {
  const minTranslate = -(NUM_CARDS-1) * CARD_WIDTH;
  const maxTranslate = 0;

  if (currentTranslate > maxTranslate) {
    currentTranslate = maxTranslate;
  } else if (currentTranslate < minTranslate) {
    currentTranslate = minTranslate;
  }
}

function dragEnd() {
  isDragging = false;
  prevTranslate = currentTranslate;
}

function updateSliderPosition() {
  sliderWrapper.style.transform = `translateX(${currentTranslate}px)`;
  requestAnimationFrame(updateSliderPosition);
}

updateSliderPosition();


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
