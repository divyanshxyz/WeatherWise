import { getWeatherIcon } from "./iconRegistry";

function celsiusToFahrenheit(celsius) {
    return (celsius * (9 / 5)) + 32;
}

function formatTemperature(tempInCelsius, unit) {
    if (unit == '°F') {
        const fahrenheit = celsiusToFahrenheit(tempInCelsius)
        return `${fahrenheit.toFixed(1)}°F`
    }
    return `${tempInCelsius.toFixed(1)}°C`
}

function renderWeather(appState) {
    const displayContainer = document.querySelector("#display-container")
    const { currentWeather, forecast, currentUnit } = appState
    const iconSvg = getWeatherIcon(currentWeather.icon);

    if (!currentWeather) return;

    const currentTempDisplay = formatTemperature(currentWeather.currentTemp, currentUnit)
    const maxTempDisplay = formatTemperature(currentWeather.maxTemp, currentUnit)
    const minTempDisplay = formatTemperature(currentWeather.minTemp, currentUnit)
    const feelsLikeDisplay = formatTemperature(currentWeather.feelsLike, currentUnit)

    const currentHtml = `
<div class="current-weather-card">
    <div class="card-layout-split">
        <div class="card-left-info">
            <h2>${currentWeather.resolvedAddress}</h2>
            <p class="main-temp">${currentTempDisplay}</p>
            <p>High: ${maxTempDisplay} / Low: ${minTempDisplay}</p>
            <p>Feels Like: ${feelsLikeDisplay}</p>
            <p>Humidity: ${currentWeather.humidity}%</p>
            <p>Condition: ${currentWeather.conditions}</p>
        </div>
        <div class="card-right-visual">
            ${iconSvg}
        </div>
    </div>
</div>`

    const forecastHtml = forecast.map(day => {
        const dayMax = formatTemperature(day.maxTemp, currentUnit)
        const dayMin = formatTemperature(day.minTemp, currentUnit)
        const dayAvg = formatTemperature(day.avgTemp, currentUnit)
        const iconSvg = getWeatherIcon(day.icon);
        return `
            <div class="forecast-day-row">
                <span>${day.date}</span>
                <span> ${dayAvg}</span>
                <span>${dayMax} / ${dayMin}</span>
                <span>${day.condition} </span>
                <span>${iconSvg}</span>
            </div>
        `
    }).join('')
    displayContainer.innerHTML = `
            <div id="loading-anchor" class="loading-hidden"></div>
            ${currentHtml}
            <span>Desription: ${currentWeather.description}</span>

            <div class="forecast-container">
            <div class="forecast-day-row forecast-day-row-head">
                <span>Date</span>
                <span>Average Temperature</span>
                <span>Max/Min</span>
                <span>Condition</span>
                 <span></span>
            </div>
            ${forecastHtml}
            </div>
        `;
}


function renderError(message) {
    const displayContainer = document.querySelector("#display-container")

    displayContainer.innerHTML = `
        <div class="error-badge">
            <p>Error: ${message}</p>
            <p>Please check your location entry query and try again.</p>
        </div>
    `
}


export { renderWeather, renderError };