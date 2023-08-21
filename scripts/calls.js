import * as index from "./index.js";

export async function getCity(key, base, value)
    {
        let isValid = false;
        const response = await fetch(`${base}forecast.json?key=${key}&q=${value}&days=7&aqi=no&alerts=no`);
        const responseData = await response.json();

        isValid = checkValue(value);
        
        if(isValid){
            return; 
        }

        try {
            if(response.ok)
            {   
                return index.currentWeather(responseData);
            }
            else if(response.status === 400)
            {
                alert(responseData.error.message);
            }
            else
            {
                throw new Error(response.statusText);    
            }
        } 
        catch (error) 
        {   
            alert(error);
        }
    }
    //Checks if there the input is empty or it has numbers
    function checkValue(inputValue){
        const digits = /\d/;
        const splited = inputValue.split("");

        if(!inputValue){
            return displayError("Please enter a city");
         }
         else{
 
             for(let i = 0; i < splited.length; i++){
                 if(digits.test(splited[i])){
                     return displayError("Please enter only letters");
                 }
             }
         }
    }

    function displayError(message){
        alert(message);
        return true;
    }