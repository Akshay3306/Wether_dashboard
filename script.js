const apiKey = "YOUR_API_KEY";

async function getWeather() {
    const city = document.getElementById("cityInput").value;

    // Current Weather API
    const weatherURL = 
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // Forecast API
    const forecastURL = 
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    const weatherRes = await fetch(weatherURL);
    const weatherData = await weatherRes.json();

    const forecastRes = await fetch(forecastURL);
    const forecastData = await forecastRes.json();

    displayWeather(weatherData);
    displayForecast(forecastData);
}

function displayWeather(data) {
    const box = document.getElementById("weatherBox");
    const icon = data.weather[0].icon;

    box.innerHTML = `
        <h2>${data.name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayForecast(data) {
    const box = document.getElementById("forecastBox");
    box.innerHTML = "<h3>5-Day Forecast</h3>";

    // Show one forecast per day (every 24 hours → index 0, 8, 16, 24, 32)
    for (let i = 0; i < data.list.length; i += 8) {
        const item = data.list[i];
        const icon = item.weather[0].icon;

        box.innerHTML += `
            <div class="day">
                <p>${item.dt_txt.split(" ")[0]}</p>
                <img src="https://openweathermap.org/img/wn/${icon}.png">
                <p>${item.main.temp}°C</p>
            </div>
        `;
    }
}
