import { getRawWeatherData, processWeatherData } from './weatherAPI.js';

const weatherForm = document.querySelector('#input-form');
const locationInput = document.querySelector('#search');
const loadingAnchor = document.querySelector("#loading-anchor")

let appState = {
    currentWeather: null,
    forecast: null,
    currentUnit: 'C'
};

weatherForm.addEventListener('submit', async (event) => {

    event.preventDefault();

    const location = locationInput.value.trim()

    if (!location) {
        console.log("Location undefined!")
        return
    }
    try {
        // Toggle on a loading indicator display in your loading-anchor
        loadingAnchor.classList.remove("loading-hidden")
        loadingAnchor.classList.add("loading-active")

        const rawData = await getRawWeatherData(location)
        const processedData = processWeatherData(rawData)
        appState.currentWeather = processedData.currentData
        appState.forecast = processedData.forecastSummary
        console.log("Success! Cleaned app state data:", appState);

    } catch (error) {
        // UI render will display error message
        // UIController.HandleError(error.message)
        console.error(error.message);
    } finally {
        loadingAnchor.classList.remove("loading-active")
        loadingAnchor.classList.add("loading-hidden")
    }
});