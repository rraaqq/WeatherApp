const appKey = "f817cddb3ec2d6eaae7099c1bbdf4596";
const url = "https://api.openweathermap.org/data/2.5/weather?q=";

let searchTxt = document.getElementById("serch-txt");
let searchBtn = document.getElementById("serch-btn");
let city = document.getElementById("city");
let desc = document.getElementById("desc");
let temp = document.getElementById("temp");
let wind = document.getElementById("wind");

searchBtn.addEventListener("click", findWeatherDetails);
searchTxt.addEventListener("keyup", enterPressed);

function enterPressed(event) {
  if (event.key === "Enter") {
    findWeatherDetails();
  }
}

function findWeatherDetails() {
  if (searchInput.value === "") {
  
  }else {
   getWeather();
  }
}

function getWeather() {
  let quoteUrl = url + searchTxt.value + "&appid=" + appKey;
  fetch(quoteUrl, { cache: "no-store" })
    .then(function(resp) {
      return resp.json();
    })
    .then(showWeather);
};

function showWeather() {
  temp.innerHTML = resp.main.temp - 273 + "°";
};