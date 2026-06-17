function celsiusToFahrenheit(celsius) {
    return (celsius * (9 / 5)) + 32;
}

function formatTemperature(tempInCelsius, unit) {
    if (unit == 'F') {
        const fahrenheit = celsiusToFahrenheit(tempInCelsius)
        return `${Math.round(fahrenheit)}°F`
    }
    return `${Math.round(tempInCelsius)}°C`
}

function renderWeather(appState) {
    const displayContainer = document.querySelector("#display-container")
    const { currentWeather, forecast, currentUnit } = appState

    if (!currentWeather) return;

    const currentTempDisplay = formatTemperature(currentWeather.currentTemp, currentUnit)
    const maxTempDisplay = formatTemperature(currentWeather.maxTemp, currentUnit)
    const minTempDisplay = formatTemperature(currentWeather.minTemp, currentUnit)

    const currentHtml = `
    <div class="current-weather-card">
            <h2>${currentWeather.resolvedAddress}</h2>
            <p class="main-temp">${currentTempDisplay}</p>
            <p>High: ${maxTempDisplay} / Low: ${minTempDisplay}</p>
            <p>Feels Like: ${currentWeather.feelsLike}</p>
            <p>Humidity: ${currentWeather.humidity}</p>
            <p>Condition: ${currentWeather.conditions}</p>
    </div>`

    const forecastHtml = forecast.map(day => {
        const dayMax = formatTemperature(day.maxTemp, currentUnit)
        const dayMin = formatTemperature(day.minTemp, currentUnit)
        return `
            <div class="forecast-day-row">
                <span>${day.date}</span>
                <span>${day.condition}</span>
                <span>${dayMax} / ${dayMin}</span>
            </div>
        `
    }).join('')
    displayContainer.innerHTML = `
            <div id="loading-anchor" class="loading-hidden"></div>
            ${currentHtml}
            <div class="forecast-container">${forecastHtml}</div>
        `;
}



export {renderWeather};