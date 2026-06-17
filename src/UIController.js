function celsiusToFahrenheit(celsius) {
    return (celsius * (9 / 5)) + 32;
}

function formatTemperature(tempInCelsius, unit) {
    if (unit == 'F') {
        const fahrenheit = celsiusToFahrenheit(tempInCelsius)
        return `${fahrenheit}°F`
    }
    return `${tempInCelsius}°C`
}

function renderWeather(appState) {
    const displayContainer = document.querySelector("#display-container")
    const { currentWeather, forecast, currentUnit } = appState

    if (!currentWeather) return;

    const currentTempDisplay = formatTemperature(currentWeather.currentTemp, currentUnit)
    const maxTempDisplay = formatTemperature(currentWeather.maxTemp, currentUnit)
    const minTempDisplay = formatTemperature(currentWeather.minTemp, currentUnit)
    const feelsLikeDisplay = formatTemperature(currentWeather.feelsLike, currentUnit)

    const currentHtml = `
    <div class="current-weather-card">
            <h2>${currentWeather.resolvedAddress}</h2>
            <p class="main-temp">${currentTempDisplay}</p>
            <p>High: ${maxTempDisplay} / Low: ${minTempDisplay}</p>
            <p>Feels Like: ${feelsLikeDisplay}</p>
            <p>Humidity: ${currentWeather.humidity}%</p>
            <p>Condition: ${currentWeather.conditions}</p>
    </div>`

    const forecastHtml = forecast.map(day => {
        const dayMax = formatTemperature(day.maxTemp, currentUnit)
        const dayMin = formatTemperature(day.minTemp, currentUnit)
        const dayAvg = formatTemperature(day.avgTemp, currentUnit)
        return `
            <div class="forecast-day-row">
                <span>${day.date}</span>
                <span>Average Temperature: ${dayAvg}</span>
                <span>${day.condition}</span>
                <span>${dayMax} / ${dayMin}</span>
            </div>
        `
    }).join('')
    displayContainer.innerHTML = `
            <div id="loading-anchor" class="loading-hidden"></div>
            ${currentHtml}
            <span>Desription: ${currentWeather.description}</span>
            <div class="forecast-container">${forecastHtml}</div>
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


export {renderWeather, renderError};