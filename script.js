const input = document.getElementById("cityInput");
const btn = document.getElementById("btn");
const icon = document.querySelector(".icon");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");

const apikey = 'aa6ca5fc6a96782ef1295c218fb2f0ba';

btn.addEventListener("click", () => {
  const city = input.value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

function getWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        alert("City not found! Please enter a valid city.");
        return;
      }

      const iconCode = data.weather[0].icon;
      icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon" class="fade-in"/>`;

      const weatherCity = data.name;
      const weatherCountry = data.sys.country;
      weather.textContent = `${weatherCity}, ${weatherCountry}`;

      let weatherTemp = data.main.temp - 273.15;
      temperature.textContent = `${weatherTemp.toFixed(1)}°C`;

      description.textContent = data.weather[0].description;
    })
    .catch(err => {
      alert("Error fetching weather data.");
      console.error(err);
    });
}
