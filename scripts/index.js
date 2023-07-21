import * as basic from "./basicFunctions.js";
import * as call from "./calls.js"

const api = {
    key: "c836ad97ddf247c3bb9162714231907",
    base: "https://api.weatherapi.com/v1/"
}

// https://api.weatherapi.com/v1/forecast.json?key=c836ad97ddf247c3bb9162714231907&q=Veliko Turnovo&days=1&aqi=no&alerts=no
// `${api.base}`forecast.json?key={$api.key}&q=${SearchBoxValue}&days=$7&aqi=no&alerts=no