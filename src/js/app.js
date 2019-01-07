require("babel-polyfill");
require('./../scss/main.scss');

const searchTxt = document.getElementById("search-txt");
const searchBtn = document.getElementById("search-btn");
const cityName = document.getElementById("weather-name");
const weatherBox = document.getElementById("weather-box");
const weatherDesc = document.getElementById("weather-description");
const weatherTemp = document.getElementById("weather-temp");
const weatherWind = document.getElementById("weather-wind");
const weatherHumidity = document.getElementById("weather-humidity");
const weatherPressure = document.getElementById("weather-pressure");
const weatherIcon = document.getElementById("icon");

searchBtn.addEventListener("click", findWeatherDetails);
searchTxt.addEventListener("keypress", enterPressed);

function enterPressed(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    findWeatherDetails();
  }
}

function findWeatherDetails() {
  if (searchTxt.value === "") {
  
  } else {
    getWeather();
  }
}

function getWeather() {
  const appKey = "f817cddb3ec2d6eaae7099c1bbdf4596";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=";
  const enteredValue = (searchTxt.value == "") ? "Lodz" : searchTxt.value;
  const quoteUrl = url + enteredValue + "&units=metric&appid=" + appKey;
  fetch(quoteUrl, { cache: "no-store" })
    .then(response => { 
      return response.json();
    })
    .then((response) => {
      showWeather(response),
      getImages(response),
      console.log(response)
    })
};
getWeather();

function getImages(response) {
  if (response.weather[0].icon.includes("n")) {
    weatherBox.classList.add('night');
    document.body.classList.add("night-baskgroud");
  } else {
    weatherBox.classList.remove('night');
    document.body.classList.remove("night-baskgroud");
  }
};


function showWeather(response) {
  weatherTemp.innerHTML = response.main.temp + '°';
  cityName.innerHTML = `${response.name}, ${response.sys.country}`;
  weatherDesc.innerHTML = response.weather[0].description;
  weatherIcon.setAttribute("src", `./src/images/${response.weather[0].icon}.png`)
  weatherWind.innerText = response.wind.speed + ' m/s';
  weatherPressure.innerText = response.main.pressure + ' hpa';
  weatherHumidity.innerText = response.main.humidity + '%';
};