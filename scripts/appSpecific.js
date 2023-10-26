import * as iconInfo from "./iconInfo.js";
import * as basic from "./basicFunctions.js";
import * as call from "./calls.js";
import * as index from "./index.js";

const api = {
    key: "c836ad97ddf247c3bb9162714231907",
    base: "https://api.weatherapi.com/v1/"
}
const mainEl = document.getElementById("main");

export function getWeeklyDays(date, index){
    
    const newDate = parseDate(date);
   

    if(index === 0){
        return "Today"
    }

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

function getIconDayHour(data, hour, day){
    const timeNow = extractTime(data.forecast.forecastday[day].hour[hour].time);
    const sunrise = convertTime12to24(data.forecast.forecastday[day].astro.sunrise);
    const sunset = convertTime12to24(data.forecast.forecastday[day].astro.sunset);
    const code = data.forecast.forecastday[day].hour[hour].condition.code;
    const find = iconInfo.iconInfoStorage.find(item => item.code === code);
 
    if(timeNow > sunrise && timeNow < sunset){
        
        return `icons/day/${find.icon}.png`
    }
    else{
        return `icons/night/${find.icon}.png`
    }
}

export function getHourlyIcon(data, index, day){
    
    const timeThen = extractTime(data.forecast.forecastday[day].hour[index].time);
    const sunrise = convertTime12to24(data.forecast.forecastday[day].astro.sunrise);
    const sunset = convertTime12to24(data.forecast.forecastday[day].astro.sunset);
    const code = data.forecast.forecastday[day].hour[index].condition.code;
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

function getUvCondtitionCertainDay(score){
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

//Function that displays the weather for specific hour
export function getSpecificWeatherHour(data, hour, day)
{
    //Getting all current weather elements by ids
    const cityNameEl = document.getElementById("city-name-current");
    const degEl = document.getElementById("degrees-current");
    const conditionEl = document.getElementById("condition-current");
    const feelsEl = document.getElementById("feels-current");
    const dateEl = document.getElementById("date-current");
    const imgEl = document.getElementById("weather-icon-holder");

    //Getting all additional info elements by ids
    const uvStat = document.getElementById("uv-stat");
    const humidityStat = document.getElementById("humidity-stat");
    const windStat = document.getElementById("wind-stat");

    //Setting new weather information for all current weather elements
    basic.setInnerHTML(cityNameEl, data.location.name);
    basic.setInnerHTML(degEl, `${Math.round(data.forecast.forecastday[day].hour[hour]["temp_c"])}°`);
    basic.setInnerHTML(conditionEl, data.forecast.forecastday[day].hour[hour].condition.text);
    basic.setInnerHTML(feelsEl, `Feels like 
    ${Math.round(data.forecast.forecastday[day].hour[hour]["feelslike_c"])}°`);
    basic.setInnerHTML(dateEl, `${getWeeklyDays(data.forecast.forecastday[day].hour[hour].time)}
    ${getHours(data.forecast.forecastday[day].hour[hour].time)}:${getMinutes(data.forecast.forecastday[day].hour[hour].time)}`);
    basic.setSrcAttribute(imgEl, getIconDayHour(data, hour, day));

    //Setting new weather information for all additional information elements
    basic.setInnerHTML(uvStat, getUvCondtitionCertainDay(data.forecast.forecastday[day].hour[hour].uv));
    basic.setInnerHTML(humidityStat, data.forecast.forecastday[day].hour[hour].humidity + " %");
    basic.setInnerHTML(windStat, Math.round(data.forecast.forecastday[day].hour[hour]["wind_kph"]) + " km/h");
   
}


//Function that updates the weather for all hours for a certain day
export function updateHourlyWeather(data, day){
   
    const sliderInnerCon = document.getElementById("slider-inner");

        //Getting all current weather elements by ids
        const degEl = document.getElementById("degrees-current");
        const conditionEl = document.getElementById("condition-current");
        const feelsEl = document.getElementById("feels-current");
        const dateEl = document.getElementById("date-current");
        const imgEl = document.getElementById("weather-icon-holder");
        //Setting each 
        basic.setInnerHTML(degEl, `${Math.round(data.forecast.forecastday[day].day["maxtemp_c"])}°`);
        basic.setInnerHTML(conditionEl, data.forecast.forecastday[day].day.condition.text);
        basic.setInnerHTML(feelsEl, `${Math.round(data.forecast.forecastday[day].day["maxtemp_c"])}° / 
        ${Math.round(data.forecast.forecastday[day].day["mintemp_c"])}° feels like 
        ${Math.round(data.current["feelslike_c"])}°`);
        basic.setInnerHTML(dateEl,  `${getWeeklyDays(data.forecast.forecastday[day].date)}`);
        basic.setSrcAttribute(imgEl, getDailyIcon(data, day));
    
    for(let i = 0; i < 24; i++){

        //Getting each hour element by ids
        const hourSlide = document.getElementById(`hour-slide-${i}`);
        const time = document.getElementById(`hour-time-${i}`);
        const icon = document.getElementById(`hour-icon-${i}`);
        const degrees = document.getElementById(`hour-degrees-${i}`);
        const chance = document.getElementById(`hour-chance-${i}`);
        //Setting each hour new information
        basic.setInnerHTML(time, `${getHours(data.forecast.forecastday[day].hour[i].time)}:${getMinutes(data.forecast.forecastday[day].hour[i].time)}`);
        basic.setSrcAttribute(icon, getHourlyIcon(data, i, day));
        basic.setInnerHTML(degrees, `${Math.round(data.forecast.forecastday[day].hour[i]["temp_c"])}°`);
        basic.setInnerHTML(chance, `<span><i class="fa-solid fa-droplet"></i> ${data.forecast.forecastday[day].hour[i]["chance_of_rain"]}%</span>`)
        
        //Changing the parent element of selected-slide class 
        hourSlide.addEventListener("click", function(){
            if(sliderInnerCon.querySelector(".slected-slide"))
             {
               
                const removeSelectedClass = sliderInnerCon.querySelector(".slected-slide");
                basic.removeClassAttribute(removeSelectedClass, "slected-slide");
             }
            
             getSpecificWeatherHour(data, i, day);
             basic.addClassAttribute(hourSlide, "slected-slide");
        });

    }

    const uvStat = document.getElementById("uv-stat");
    const humidityStat = document.getElementById("humidity-stat");
    const windStat = document.getElementById("wind-stat");
    const riseStat = document.getElementById("rise-stat");
    const setStat = document.getElementById("set-stat");

    basic.setInnerHTML(uvStat, getUvCondtitionCertainDay(data.forecast.forecastday[day].day.uv));
    basic.setInnerHTML(humidityStat, data.forecast.forecastday[day].day.avghumidity + " %");
    basic.setInnerHTML(windStat, Math.round(data.forecast.forecastday[day].day["maxwind_kph"]) + " km/h");
    basic.setInnerHTML(riseStat, convertTime12to24(data.forecast.forecastday[day].astro.sunrise));
    basic.setInnerHTML(setStat, convertTime12to24(data.forecast.forecastday[day].astro.sunset));


}
//Checks if there is default city in the localStorage and removes all elements in main
export function checkForDefaultCity(){
    
    if(localStorage.getItem("defaultCity")){
        basic.removeChildNodes(mainEl);
    }
}

export function displaySavedCities(){
    const cityListContainer = document.getElementById("city-list");
    const cityList = JSON.parse(localStorage.getItem("savedCities"));
    

    basic.removeChildNodes(cityListContainer);

    if(cityList){
        for(let i = 0; i < cityList.length; i++){
            const cityContainer = basic.createNode("div");
            const cityName = basic.createNode("p");
            const removeButton = basic.createNode("i");
        
            basic.setClassAttribute(cityContainer, "saved-city");

            basic.setInnerHTML(cityName, cityList[i]);
            basic.setClassAttribute(removeButton, "fa-solid fa-xmark");

            basic.append(cityListContainer, cityContainer);
            basic.append(cityContainer, cityName);
            basic.append(cityContainer, removeButton);

            cityName.addEventListener("click", function(){
                if(!document.getElementById("selected-city")){
                    basic.setIdAttribute(cityName, "selected-city");
                }
                else{
                    const selected = document.getElementById("selected-city");
                    selected.removeAttribute("id");
                    basic.setIdAttribute(cityName, "selected-city")
                }
                
                
                call.getCity(api.key, api.base, cityList[i]);
            });

            removeButton.addEventListener("click", function(){
                cityList.splice(i, 1);
                localStorage.setItem("savedCities", JSON.stringify(cityList));
                displaySavedCities();
            });
        }
    }
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