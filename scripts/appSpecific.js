import * as iconInfo from "./iconInfo.js";

export function getWeeklyDays(date){
    
    const newDate = parseDate(date);
    const today = extractDateDate(new Date());
    const newDateString = extractDateDate(newDate);

    if(today === newDateString){
        return "Today"
    }

    const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysInWeek[newDate.getDay()];

}

export function getDay(date){
    const newDate = parseDate(date);

    const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysInWeek[newDate.getDay()];
}

export function getHours(date){

    const newDate = parseDate(date);
    const hours = newDate.getHours();
    
    if(hours >= 10){
        return hours;
    }
    else{
        return "0" + hours;
    }
    
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
//Function that retur icon based on time and weather condition
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

export function getHourlyIcon(data, index){
    const timeThen = extractTime(data.forecast.forecastday[0].hour[index].time);
    const sunrise = convertTime12to24(data.forecast.forecastday[0].astro.sunrise);
    const sunset = convertTime12to24(data.forecast.forecastday[0].astro.sunset);
    const code = data.forecast.forecastday[0].hour[index].condition.code;
    const find = iconInfo.iconInfoStorage.find(item => item.code === code);
 
    if(timeThen > sunrise && timeThen < sunset){
        
        return `icons/day/${find.icon}.png`
    }
    else{
        return `icons/night/${find.icon}.png`
    }
}

export function getDailyIcon(data, index){

    const code = data.forecast.forecastday[index].day.condition.code;
    const find = iconInfo.iconInfoStorage.find(item => item.code === code);
  
    return `icons/day/${find.icon}.png`
   
}

export function getUvCondition(data){
    const score = data.current.uv;

    return score < 3 ? "Low" :
    score < 6 ? "Moderate" :
    score < 8 ? "High" :
    score < 11 ? "Very High" : "Extreme" 
}

//Functiont that parses string to a Date
function parseDate(date){
    
    return new Date(date);
}

export function convertTime12to24(time12h){
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
//Function that extracts the time from a string ex -> "2023-08-10 14:00" => "14:00";
function extractTime(dateTimeString) {
    
    const [datePart, timePart] = dateTimeString.split(' ');
  
    
    return timePart;
}
//Function that extracts the day, mouth and year into a single string -> Thu Aug 17 2023 19:07:32 => "2-8-2023";
function extractDateDate(date)
{
    const day = date.getDay();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const joined = [day, month, year].join("-");

    return joined;
}