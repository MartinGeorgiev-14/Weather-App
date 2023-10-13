# Weather Vision
The project is made to be used mainly on mobile.

A JavaScript project for weather cast app. Showing the live hourly and daily weather conditions for a chosen city.
The project can be seen online on this link: https://weather-vision.netlify.app/

## Table of content

- [Set default city](#set-default-city)
- [Header navigation](#header-navigation)
- [Current weather container](#current-weather-container)
- [Hourly weather container](#hourly-weather-container)
- [Daily weather container](#daily-weather-container)
- [Additional information container](#additional-information-container)
- [Project requirements](#project-requirements)
- [Project setup](#project-setup)

## Set default city

A starting screen that asks the user to enter a default city. The setted city is saved in the local stoarage as "defaultCity" then the starting screen is removed and default city displayed weather every time the app is opened.

## Header navigation

The header navigation contains these elements
  - [Color mode button](#color-mode-button)
  - [Default city button](#default-city-button)
  - [Search bar](#search-bar)
  - [Set new default city dropdown](#set-new-default-city-dropdown)
  - [Saved cities dropdown](#saved-cities-dropdown)
  
  ### Color mode button

  A button that changes the theme of the site upon on click. There are two themes light and dark. The current theme is saved as "colors" in the local storage in order to load the proper theme on re-opening the app.

  ### Default city button

  A button that upon on click gets the setted default city from the local storage "defaultCity" and displays it. 

  ### Search bar

  Search bar that displays the entered city. 
  Can be searched only letters ex.("Sofia", "London")

  ### Set new default city dropdown
  A dropdown with search bar that overrides "defaultCity" in localStorage with new city and redisplays the new default city.
  Can be searched only letters ex.("Sofia", "London")

  ### Saved cities dropdown 
  A dropdown with search bar that adds new cities to "savedCities" in local storage. All cities are displayed below the search bar with X button to the right that upon on click removes the city form "savedCities" in     
  localStorage and redisplay all saved cities.

## Current weather container

The current wheather container displays live weahter data for certain city. It displays the name of the city, current temperature, condition of the weather(sunny, rain, etc.), the highes and lowest temperature for the day and how the weather feels, the day and hour, icon that shows the condition of the weather and button that displays the live weather of the current displayed city.

  ### Weather icon
  
  The icon is defined by the condition of the weather and the sunrise and sunset in order to show sun or moon.

  ### Current weather button 

  The button on click shows the live weather information on the current city.

## Hourly weather container

Container with 24 section for each hour of the day showing hour, weather icon, temperature and possibility of rain in percents. When clicked on certain section it displays more information about that hour.  
  
## Daily weather container

Container with 3 sections(should be 7 but the api is bugged) for next 3 days including the current. In the containers are shown the day, possibility of rain, weather icon and highest and lowest temperature of the day.

## Additional information container 

Container with 4 sections showing different parameters for the day. Uv level, humidity in percents, wind in km/h and sunrise and sunset.

## Project requirements

The only thing required to run this project is Live Server extension from Visual Studio's marketplace/extensions.
  Marketplace: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
  Id: ritwickdey.LiveServer

## Project setup

1. Install Live Server
2. Click Go Live in the bottom right corner or right click on the index then click Open with Live Server
