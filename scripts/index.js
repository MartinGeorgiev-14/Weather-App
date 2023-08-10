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


call.getCity(api.key, api.base, "Veliko Turnovo");

searchBtn.addEventListener("click", function(){
    call.getCity(api.key, api.base, searchEl.value);
    searchEl.value = "";
})


export function currentWeather(data){
    //Removes all nodes in main
    basic.removeChildNodes(mainEl);

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
    //Appending all hourly weather slider elements
    basic.append(mainEl, sliderCon);
    basic.append(sliderCon, sliderInnerCon);
   


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
    
}



