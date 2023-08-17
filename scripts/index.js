import * as basic from "./basicFunctions.js";
import * as call from "./calls.js";
import * as specific from "./appSpecific.js";

const api = {
    key: "c836ad97ddf247c3bb9162714231907",
    base: "https://api.weatherapi.com/v1/"
}

// https://api.weatherapi.com/v1/forecast.json?key=c836ad97ddf247c3bb9162714231907&q=Veliko Turnovo&days=1&aqi=no&alerts=no
// `${api.base}forecast.json?key={$api.key}&q=${SearchBoxValue}&days=$7&aqi=no&alerts=no`

const mainEl = document.getElementById("main");
const searchEl = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

//calling get request wtih hardcoded value
call.getCity(api.key, api.base, "Veliko Turnovo");

searchBtn.addEventListener("click", function(){
    call.getCity(api.key, api.base, searchEl.value);
    searchEl.value = "";
})


export function currentWeather(data){
    //Removes all nodes in main
    basic.removeChildNodes(mainEl);
    //Creating container for all sections
    const containersContainer = basic.createNode("div");
    //Creating all elements for current weather container
    const currentWeatherCon = basic.createNode("div");
    const cityWeatherCon = basic.createNode("div"); 
    const cityNameEl = basic.createNode("h2");
    const degEl = basic.createNode("h1");
    const conditionEl = basic.createNode("h3");
    const feelsEl = basic.createNode("p");
    const dateEl = basic.createNode("p");
    const weatherIconCon = basic.createNode("div");
    const imgEl = basic.createNode("img");
    //Creating all elements for hourly weather slider
    const sliderCon = basic.createNode("div");
    const sliderInnerCon = basic.createNode("div");
    //Setting attribute to the main container
    basic.setIdAttribute(containersContainer, "containers");

    //Setting attributes to all current weather container elements
    basic.setIdAttribute(currentWeatherCon, "current-weather-container");
    basic.setIdAttribute(cityWeatherCon, "city-weather");
    basic.setIdAttribute(weatherIconCon, "weather-icon-holder");
    basic.setIdAttribute(imgEl, "weather-icon-holder");
    //Setting attributes to all hourly weather slider elements
    basic.setIdAttribute(sliderCon, "slider");
    basic.setClassAttribute(sliderCon, "ripple-hover");
    basic.setClassAttribute(sliderCon, "ripple-click");
    basic.setIdAttribute(sliderInnerCon, "slider-inner");
    //Setting the text inside current weather container elements
    basic.setInnerHTML(cityNameEl, data.location.name);
    basic.setInnerHTML(degEl, `${Math.floor(data.current["temp_c"])}°`);
    basic.setInnerHTML(conditionEl, data.current.condition.text);
    basic.setInnerHTML(feelsEl, `${Math.floor(data.forecast.forecastday[0].day["mintemp_c"])}° / 
    ${Math.floor(data.forecast.forecastday[0].day["maxtemp_c"])}° feels like 
    ${Math.floor(data.current["feelslike_c"])}°`);
    basic.setInnerHTML(dateEl, `${specific.getDay(data.location.localtime)}
    ${specific.getHours(data.location.localtime)}:${specific.getMinutes(data.location.localtime)}`);
    basic.setSrcAttribute(imgEl, specific.getIconLive(data));
    //Appending all current weather container elements
    basic.append(mainEl, currentWeatherCon);
    basic.append(currentWeatherCon, cityWeatherCon);
    basic.append(cityWeatherCon, cityNameEl);
    basic.append(cityWeatherCon, degEl);
    basic.append(cityWeatherCon, conditionEl);
    basic.append(cityWeatherCon, feelsEl);
    basic.append(cityWeatherCon, dateEl);
    basic.append(currentWeatherCon, weatherIconCon);
    basic.append(weatherIconCon, imgEl);
    //Appending the main container to main
    basic.append(mainEl, containersContainer);

    //Appending all hourly weather slider elements
    basic.append(containersContainer, sliderCon);
    basic.append(sliderCon, sliderInnerCon);
   
    //Cycle for the elements of hourly weather slider
    for(let i = 0; i < 24; i++){
        const hourSlide = basic.createNode("div");
        const time = basic.createNode("p");
        const icon = basic.createNode("img");
        const degrees = basic.createNode("p");
        const chance = basic.createNode("p");

        basic.setClassAttribute(hourSlide, "slide-info");
        basic.setClassAttribute(chance, "chance-icon");

        basic.setInnerHTML(time, `${specific.getHours(data.forecast.forecastday[0].hour[i].time)}:${specific.getMinutes(data.forecast.forecastday[0].hour[i].time)}`);
        basic.setSrcAttribute(icon, specific.getHourlyIcon(data, i));
        basic.setInnerHTML(degrees, `${Math.floor(data.forecast.forecastday[0].hour[i]["temp_c"])}°`);
        basic.setInnerHTML(chance, `<span><i class="fa-solid fa-droplet"></i> ${data.forecast.forecastday[0].hour[i]["chance_of_rain"]}%</span>`)

        basic.append(sliderInnerCon, hourSlide);
        basic.append(hourSlide, time);
        basic.append(hourSlide, icon);
        basic.append(hourSlide, degrees);
        basic.append(hourSlide, chance);
    }


   
    //Creating weakly weather forecast
    const daysCon = basic.createNode("div");

    basic.setIdAttribute(daysCon, "days-container");

    basic.append(containersContainer, daysCon);
    //Cycle for the elements on daily weather 
    for(let i = 0; i < 7; i++){
        
        const dayInfo = basic.createNode("div");
        const firstDayInfo = basic.createNode("div");
        const day = basic.createNode("p");
        const iconCon = basic.createNode("p");
        const imgCon = basic.createNode("div");
        const img = basic.createNode("img");
        const secondDayInfo = basic.createNode("div");
        const highDeg = basic.createNode("p");
        const lowDeg = basic.createNode("p");

       
        basic.setClassAttribute(daysCon, "ripple-hover ripple-click");
        basic.setClassAttribute(dayInfo, "day-info");
        basic.setClassAttribute(firstDayInfo, "first-info-day");
        basic.setClassAttribute(day, "day");
        basic.setClassAttribute(iconCon, "daily-chance-icon");
        basic.setClassAttribute(imgCon, "img-container");
        basic.setClassAttribute(secondDayInfo, "second-info-day");

        basic.setInnerHTML(day, specific.getDay(data.forecast.forecastday[i].date));
        //${data.forecast.forecastday[0].hour[i]["chance_of_rain"]}%</span>
        basic.setInnerHTML(iconCon, `<span><i class="fa-solid fa-droplet"></i> ${data.forecast.forecastday[i].day["daily_chance_of_rain"]}%</span>`)
        basic.setSrcAttribute(img, specific.getDailyIcon(data, i));
        basic.setInnerHTML(highDeg, `${Math.floor(data.forecast.forecastday[i].day["maxtemp_c"])}°`);
        basic.setInnerHTML(lowDeg, `${Math.floor(data.forecast.forecastday[i].day["mintemp_c"])}°`);

        
        basic.append(daysCon, dayInfo);
        basic.append(dayInfo, firstDayInfo);
        basic.append(firstDayInfo, day);
        basic.append(firstDayInfo, iconCon);
        basic.append(dayInfo, imgCon);
        basic.append(imgCon, img);
        basic.append(dayInfo, secondDayInfo);
        basic.append(secondDayInfo, highDeg);
        basic.append(secondDayInfo, lowDeg);

    }
    
    
}



