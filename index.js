const appKey = "f817cddb3ec2d6eaae7099c1bbdf4596";
const url = "https://api.openweathermap.org/data/2.5/weather?q=";

let searchTxt = document.getElementById("search-txt");
let searchBtn = document.getElementById("search-btn");
let city = document.getElementById("city");
let desc = document.getElementById("desc");
let temp = document.getElementById("temp");
let wind = document.getElementById("wind");

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
  let quoteUrl = url + searchTxt.value + "&units=metric&appid=" + appKey;
  fetch(quoteUrl, { cache: "no-store" })
    .then(response => { 
      return response.json();
    })
    .then((response) => {
      showWeather(response)
      console.log(response)
    })
};

function showWeather(response) {
  temp.innerHTML = response.main.temp + '°';
};