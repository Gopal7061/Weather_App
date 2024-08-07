const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "0c5815c6bd547e988dee66cbf8249888";

weatherForm.addEventListener("submit", async (e) => {
    e.preventDefault();  // Changed 'event' to 'e' to match the parameter name
    const city = cityInput.value;
    if (city) {
        try {
            const WeatherData = await getWeatherData(city);
            displayWeatherInfo(WeatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    card.textContent = "";
    card.style.display = "flex";
    
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const WeatherEmoji = document.createElement("p");
    
    cityDisplay.textContent = city;
    cityDisplay.classList.add("cityDisplay");
    card.appendChild(cityDisplay);

    tempDisplay.textContent = `${temp.toFixed(1)}°C`;  // Removed unnecessary conversion
    tempDisplay.classList.add("tempDisplay");
    card.appendChild(tempDisplay);

    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidityDisplay");
    card.appendChild(humidityDisplay);

    descDisplay.textContent = description;
    descDisplay.classList.add("descDisplay");
    card.appendChild(descDisplay);

    WeatherEmoji.textContent = getWeatherEmoji(id);
    WeatherEmoji.classList.add("weatherEmoji");
    card.appendChild(WeatherEmoji);
}

function getWeatherEmoji(weatherID) {
    switch (true) {
        case (weatherID >= 200 && weatherID < 300):
            return "⚡";
        case (weatherID >= 300 && weatherID < 400):
            return "🌦️";
        case (weatherID >= 500 && weatherID < 600):
            return "🌧️";
        case (weatherID >= 600 && weatherID < 700):
            return "❄️";
        case (weatherID >= 700 && weatherID < 800):
            return "🌫️";
        case (weatherID === 800):
            return "☀️";
        case (weatherID >= 801 && weatherID < 900):
            return "☁️";
        default:
            return "❓";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
