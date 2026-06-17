// Module: iconRegistry.js

const ICON_MAP = {
    "clear-day": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`,
    "clear-night": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
    "rain": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 18a5 5 0 0 0-10 0M12 19v3M8 20v2M16 20v2"/></svg>`,
    "partly-cloudy-day": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M17.66 17.66l1.41 1.41M2 12h2M6.34 17.66l-1.41 1.41"/></svg>`,
    "cloudy": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21a5 5 0 0 0 4.6-7.3a5 5 0 1 0-9.2 0A5 5 0 0 0 12 21z"/></svg>`
};

function getWeatherIcon(iconId) {
    return ICON_MAP[iconId] || ICON_MAP["cloudy"];
}

export {getWeatherIcon};