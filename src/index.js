import { renderWeather } from './UIController.js';
import { getRawWeatherData, processWeatherData } from './weatherAPI.js';

const weatherForm = document.querySelector('#input-form');
const locationInput = document.querySelector('#search');
const loadingAnchor = document.querySelector("#loading-anchor")
const unitChangeBtn = document.querySelector("#unit-change-btn")

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


unitChangeBtn.addEventListener("click", (event) => {
    if(appState.currentUnit === 'C') {
        appState.currentUnit = 'F'
        unitChangeBtn.innerHTML = 'F'
    }
    else {
        appState.currentUnit = 'C'
        unitChangeBtn.innerHTML = 'C'
    }

    renderWeather(appState)
});
