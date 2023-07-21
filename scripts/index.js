import * as basic from "./basicFunctions.js";
import * as call from "./calls.js"

const api = {
    key: "c836ad97ddf247c3bb9162714231907",
    base: "https://api.weatherapi.com/v1/"
}

const mainEl = document.getElementById("main");

// https://api.weatherapi.com/v1/forecast.json?key=c836ad97ddf247c3bb9162714231907&q=Veliko Turnovo&days=1&aqi=no&alerts=no
// `${api.base}forecast.json?key={$api.key}&q=${SearchBoxValue}&days=$7&aqi=no&alerts=no`
call.getCity(api.key, api.base, "Veliko Turnovo");
export function currentWeather(data){
    console.log(data);
    const currentWeatherCon = basic.createNode("div");
    const cityWeatherCon = basic.createNode("div"); 
    const cityNameEl = basic.createNode("h2");
    const degEl = basic.createNode("h1");
    const conditionEl = basic.createNode("h3");
    const feelsEl = basic.createNode("p");
    const dateEl = basic.createNode("p");
    const weatherIconCon = basic.createNode("div");
    const imgEl = basic.createNode("img");

    basic.setIdAttribute(currentWeatherCon, "current-weather-container");
    basic.setIdAttribute(cityWeatherCon, "city-weather");
    basic.setIdAttribute(weatherIconCon, "weather-icon-holder");
    basic.setIdAttribute(imgEl, "weather-icon-holder");
    basic.setSrcAttribute(imgEl, "icons/day/113.png")
    
    basic.setInnerHTML(cityNameEl, data.location.region);
    basic.setInnerHTML(degEl, `${data.current["temp_c"]}°`);
    basic.setInnerHTML(conditionEl, data.current.condition.text);
    basic.setInnerHTML(feelsEl, `${Math.floor(data.forecast.forecastday[0].day["mintemp_c"])}° / 
    ${Math.floor(data.forecast.forecastday[0].day["maxtemp_c"])}° feels like 
    ${Math.floor(data.current["feelslike_c"])}°`); //"33C / 22C Feels like 30C"
    basic.setInnerHTML(dateEl, "Friday 20:10");

    basic.append(mainEl, currentWeatherCon);
    basic.append(currentWeatherCon, cityWeatherCon);
    basic.append(cityWeatherCon, cityNameEl);
    basic.append(cityWeatherCon, degEl);
    basic.append(cityWeatherCon, conditionEl);
    basic.append(cityWeatherCon, feelsEl);
    basic.append(cityWeatherCon, dateEl);
    basic.append(currentWeatherCon, weatherIconCon);
    basic.append(weatherIconCon, imgEl);


    const date = data.location.localtime;
    console.log(date);
    //const day = Date.parse(date[0]);
    //console.log(day.getDay());
    //console.log(typeof date === typeof "");
    //console.log(date.getDate());
   
}

