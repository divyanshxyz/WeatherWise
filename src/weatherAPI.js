async function getRawWeatherData(location) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=ZUGHRUKCASEW4D8SN3UZBHWQ7&contentType=json`
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error("Unable to retrieve data..")
    }
    const parsedResponse = await response.json()
    return parsedResponse;
}

function processWeatherData(rawJsonData) {
    const currentData = {
        "resolvedAddress": rawJsonData.resolvedAddress,
        "currentTemp": rawJsonData.days[0].temp,
        "minTemp": rawJsonData.days[0].tempmin,
        "maxTemp": rawJsonData.days[0].tempmax,
        "feelsLike": rawJsonData.days[0].feelslike,
        "humidity": rawJsonData.days[0].humidity,
        "conditions": rawJsonData.days[0].conditions,
        "icon": rawJsonData.days[0].icon,
        "description": rawJsonData.description
    }

    // const { resolvedAddress, days } = rawApiData;
    // const {temp,tempmin, tempmax, feelslike, humidity, conditions, icon } = days[0];
    // const cleanForecast = days.map(singleDay => {
    //     return {
    //         // Return your curated properties here
    //     };
    // });
    const forecastSummary = rawJsonData.days.map((day) => {
        return {
            "date": day.datetime,
            "avgTemp": day.temp,
            "maxTemp": day.tempmax,
            "minTemp": day.tempmin,
            "condition": day.conditions,
            "icon": day.icon,
        }
    })
    // for (let day of rawJsonData.days) {
    //     const dayObj = {
    //         "date": day.datetime,
    //         "maxTemp": day.tempmax,
    //         "minTemp": day.tempmin,
    //         "condition": day.conditions,
    //         "iconId": day.icon
    //     }
    //     forecastSummary.push(dayObj)
    // }
    return { currentData, forecastSummary };
}

export { getRawWeatherData, processWeatherData };