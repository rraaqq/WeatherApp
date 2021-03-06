require("babel-polyfill");
require('./../scss/main.scss');

// Variables

const imperialUnits = "&units=imperial";

// Handles

const searchTxt = document.getElementById("search-txt");
const searchBtn = document.getElementById("search-btn");
const switchCheckbox = document.getElementById("switch-checkbox");
const cityName = document.getElementById("weather-name");
const weatherDesc = document.getElementById("weather-description");
const weatherTemp = document.getElementById("weather-temp");
const weatherWind = document.getElementById("weather-wind");
const weatherHumidity = document.getElementById("weather-humidity");
const weatherPressure = document.getElementById("weather-pressure");
const weatherIcon = document.getElementById("icon");

searchBtn.addEventListener("click", findWeatherDetails);
searchTxt.addEventListener("keypress", enterPressed);
switchCheckbox.addEventListener("click", changeUnits);

function enterPressed(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    findWeatherDetails();
  }
};

function findWeatherDetails() {
  if (searchTxt.value === "") {
  } else {
    getWeather();
    switchCheckbox.checked = false;
  }
};


/* if (textBox.value.match(/^TEST$/) == null) {
  e.preventDefault;
  textBox.setCustomValidity('Powinieneś napisać TEST!');
} else {
  textBox.setCustomValidity('');
} */


function getWeather(units = "&units=metric") {
  const appKey = "f817cddb3ec2d6eaae7099c1bbdf4596";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=";
  const enteredValue = (searchTxt.value == "") ? "Lodz" : searchTxt.value;
  const quoteUrl = url + enteredValue + units + "&appid=" + appKey;
  fetch(quoteUrl, { cache: "no-store" })
    .then(response => { 
      if (response.ok) {
        return response.json()
      } else {
        return Promise.reject(response)
      }
    })
    .then((response) => {
      showWeather(response),
      getBackground(response),
      console.log(response)
    })
    .catch(error => {
      if (error.status === 404) {
        console.log('blad');
      }
    })
};
getWeather();

function getBackground(response) {
  const weatherBox = document.getElementById("weather-box");

  if (response.weather[0].icon.includes("n")) {
    weatherBox.classList.add('night');
    document.body.classList.add('night-baskgroud');
  } else {
    weatherBox.classList.remove('night');
    document.body.classList.remove('night-baskgroud');
  }
};

function showWeather(response) {
  weatherTemp.innerHTML = Math.round(response.main.temp) + '°';
  cityName.innerHTML = `${response.name}, ${response.sys.country}`;
  weatherDesc.innerHTML = response.weather[0].description;
  weatherIcon.setAttribute("src", `./src/images/${response.weather[0].icon}.png`)
  weatherWind.innerText = response.wind.speed + ' m/s';
  weatherPressure.innerText = response.main.pressure + ' hpa';
  weatherHumidity.innerText = response.main.humidity + '%';
};

function changeUnits() {  
  (switchCheckbox.checked) ? getWeather(imperialUnits) : getWeather();
};
