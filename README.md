# Weather Vision

A JavaScript project for weather cast app. Showing the daily/hourly weather conditions for a chosen city

## Table of content

- [Set default city](#set-default-city)
- [Header navigation](#header-navigation)
- [Current weather container](#current-weather-container)
- [Hourly weather container](#hourly-weather-container)
- [Daily weather container](#daily-weather-container)
- [Additional information container](additional-information-container)
- [Project requirements](#project-requirements)
- [Project setup](#project-setup)

## Set default city

A starting screen that asks the user to enter a default city. The setted city is saved in the local stoarage as "defaultCity" and displayed that city's weather every time the app is opened.

## Header navigation

The header navigation contains these elements
  - [Color mode button](#color-mode-button)
  - [Default city button](#default-city-button)
  - [Search bar](#search-bar)
  - [Set new default city dropdown](set-new-default-city-dropdown)
  - [Saved cities dropdown](saved-cities-dropdown)

  ### Color mode button

  A button that changes the theme of the site upon on click. There are two themes light and dark. The current theme is saved as "colors" in the local storage in order to load the proper theme on re-opening the app.
