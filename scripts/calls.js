import * as index from "./index.js";

export async function getCity(key, base, value)
    {
        
        const response = await fetch(`${base}forecast.json?key=${key}&q=${value}&days=$7&aqi=no&alerts=no`);
        const responseData = await response.json();

        try 
        {
            if(response.ok)
            {   console.log(responseData);
                return index.currentWeather(responseData);
            }
            else
            {
                throw new Error(response.statusText);    
            }
        } 
        catch (error) 
        {   
            alert(error);
            console.log(error)
        }
    }