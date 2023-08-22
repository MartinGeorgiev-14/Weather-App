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
const colorButton = document.getElementById("color-mode");
const root = document.querySelector(":root");
let colorMode = false; //true for light / false for dark

//Calling the function for saved color mode
colorSave();
//calling get request wtih hardcoded value
call.getCity(api.key, api.base, "Veliko Turnovo");

searchBtn.addEventListener("click", function(){
    call.getCity(api.key, api.base, searchEl.value);
    searchEl.value = "";
});

searchEl.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        call.getCity(api.key, api.base, searchEl.value);
        searchEl.value = "";
    }
});
//Event listener for color mode (light/dark)
colorButton.addEventListener("click", function(){
    
    const colors = [
        {   //Light colors
            bodyBackground: "#7CB3F4",
            fontColor: "#F2FBF8",
            containerBackground: "#5B9BE3",
            icon: "fa-regular fa-sun",
            mode: false
        },
        {   //Dark colors
            bodyBackground: "#010101",
            fontColor: "#F8F8F8",
            containerBackground: "#161616",
            icon: "fa-regular fa-moon",
            mode: true
        }
    ]

    if(colorMode){
        basic.setClassAttribute(colorButton, colors[0].icon);
        root.style.setProperty("--bodyBackground", colors[0].bodyBackground);
        root.style.setProperty("--fontColor", colors[0].fontColor);
        root.style.setProperty("--containerBackground", colors[0].containerBackground);
        localStorage.setItem("colors", JSON.stringify(colors[0]));
        colorMode = false;
    }
    else{
        basic.setClassAttribute(colorButton, colors[1].icon);
        root.style.setProperty("--bodyBackground", colors[1].bodyBackground);
        root.style.setProperty("--fontColor", colors[1].fontColor);
        root.style.setProperty("--containerBackground", colors[1].containerBackground);
        localStorage.setItem("colors", JSON.stringify(colors[1]));
        colorMode = true;
    }
});
//Main function
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
    basic.setInnerHTML(degEl, `${Math.round(data.current["temp_c"])}°`);
    basic.setInnerHTML(conditionEl, data.current.condition.text);
    basic.setInnerHTML(feelsEl, `${Math.round(data.forecast.forecastday[0].day["mintemp_c"])}° / 
    ${Math.round(data.forecast.forecastday[0].day["maxtemp_c"])}° feels like 
    ${Math.round(data.current["feelslike_c"])}°`);
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
        basic.setInnerHTML(degrees, `${Math.round(data.forecast.forecastday[0].hour[i]["temp_c"])}°`);
        basic.setInnerHTML(chance, `<span><i class="fa-solid fa-droplet"></i> ${data.forecast.forecastday[0].hour[i]["chance_of_rain"]}%</span>`)

        basic.append(sliderInnerCon, hourSlide);
        basic.append(hourSlide, time);
        basic.append(hourSlide, icon);
        basic.append(hourSlide, degrees);
        basic.append(hourSlide, chance);
    }


    
    //Creating weekly weather forecast container
    const daysCon = basic.createNode("div");

    basic.setIdAttribute(daysCon, "days-container");

    basic.append(containersContainer, daysCon);
    //Cycle for the elements on daily weather 
    for(let i = 0; i < 3; i++){
        //The Api has bugged and shows only the forecast for only 3 days
        //Have to wait to be fixed
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

        basic.setInnerHTML(day, specific.getWeeklyDays(data.forecast.forecastday[i].date));
        basic.setInnerHTML(iconCon, `<span><i class="fa-solid fa-droplet"></i> ${data.forecast.forecastday[i].day["daily_chance_of_rain"]}%</span>`)
        basic.setSrcAttribute(img, specific.getDailyIcon(data, i));
        basic.setInnerHTML(highDeg, `${Math.round(data.forecast.forecastday[i].day["maxtemp_c"])}°`);
        basic.setInnerHTML(lowDeg, `${Math.round(data.forecast.forecastday[i].day["mintemp_c"])}°`);

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
    
    //Array that contains object with info about each element
    const infoArr = [{
        title: "UV index",
        stat: specific.getUvCondition(data),
        icon: "fa-solid fa-sun"
    },
    {
        title: "Humidity",
        stat: data.current.humidity + " %",
        icon: "fa-solid fa-droplet droplet"
    },
    {
        title: "Wind",
        stat: Math.round(data.current["wind_kph"]) + " km/h",
        icon: "fa-solid fa-wind"
    },
    {
        icon: "fa-regular fa-sun",
        riseTitle: "Sunrise",
        riseStat: specific.convertTime12to24(data.forecast.forecastday[0].astro.sunrise),
        setTitle: "Sunset",
        setStat: specific.convertTime12to24(data.forecast.forecastday[0].astro.sunset)
    }];

    const additionalInfoCon = basic.createNode("div");

    basic.setIdAttribute(additionalInfoCon, "additional-info-container");
  
    //Recursion that loops through all elements in infoArr
    addInfoConRecur(0);
    function addInfoConRecur(elemNum){

        if(elemNum > 3){
            return;
        }
        
        else if(infoArr[elemNum].riseTitle){
            const mainDiv = basic.createNode("div");
            const icon = basic.createNode("i");
            const secDiv = basic.createNode("div");
            const riseDiv = basic.createNode("div");
            const riseTitle = basic.createNode("p");
            const riseStat = basic.createNode("p");
            const setDownDiv = basic.createNode("div");
            const setDownTitle = basic.createNode("p");
            const setDownStat = basic.createNode("p");

            basic.setClassAttribute(mainDiv, "info-container");
            basic.setIdAttribute(secDiv, "stats-container");
            basic.setClassAttribute(riseDiv, "sunrise-set");
            basic.setClassAttribute(riseTitle, "info-title");
            basic.setClassAttribute(setDownDiv, "sunrise-set");
            basic.setClassAttribute(setDownTitle, "info-title");

            basic.setClassAttribute(icon, "fa-regular fa-sun");
            basic.setInnerHTML(riseTitle, "Sunrise");
            basic.setInnerHTML(riseStat, infoArr[elemNum].riseStat);
            basic.setInnerHTML(setDownTitle, "Sunset");
            basic.setInnerHTML(setDownStat, infoArr[elemNum].setStat);

            basic.append(additionalInfoCon, mainDiv);
            basic.append(mainDiv, icon);
            basic.append(mainDiv,secDiv);
            basic.append(secDiv, riseDiv);
            basic.append(riseDiv, riseTitle);
            basic.append(riseDiv, riseStat);
            basic.append(secDiv, setDownDiv);
            basic.append(setDownDiv, setDownTitle);
            basic.append(setDownDiv, setDownStat);

            return addInfoConRecur(elemNum + 1);
        }

        const div = basic.createNode("div");
        const icon = basic.createNode("i");
        const title = basic.createNode("p");
        const stat = basic.createNode("p");

        basic.setClassAttribute(div, "info-container");
        basic.setClassAttribute(title, "info-title");

        basic.setClassAttribute(icon, infoArr[elemNum].icon);
        basic.setInnerHTML(title, infoArr[elemNum].title);
        basic.setInnerHTML(stat, infoArr[elemNum].stat);

        basic.append(additionalInfoCon, div);
        basic.append(div, icon);
        basic.append(div, title);
        basic.append(div, stat);

        return addInfoConRecur(elemNum + 1);
    };
   
    basic.append(containersContainer, additionalInfoCon);

    const updatedAt = document.getElementById("updated-at");
    basic.setInnerHTML(updatedAt, data.current["last_updated"]);

}

//Loads the saved mode/colors for the site
function colorSave(){
    const colors = JSON.parse(localStorage.getItem("colors"));

    if(colors){
        root.style.setProperty("--bodyBackground", colors.bodyBackground);
        root.style.setProperty("--fontColor", colors.fontColor);
        root.style.setProperty("--containerBackground", colors.containerBackground);
        basic.setClassAttribute(colorButton, colors.icon);
        colorMode = colors.mode;
    }
    else {
        return;
    }
}


