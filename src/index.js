//Challenge 1 - add day and time
let now = new Date();

let dateStamp = document.querySelector("#date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let day = days[now.getDay()];

if (hours < 10) {
  hours = `0${hours}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

dateStamp.innerHTML = `${day}, ${hours}:${minutes}`;

//Challenge 1 - Show real time details of city searched
function showWeather(response) {
  //console.log(response.data);
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let weatherDescription = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  city.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
  weatherDescription.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
}

function citySearch(city) {
  let apiKey = "f6e27edd666fe2993c6dd52e5b82732e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  //h1 = document.querySelector("h1");
  //h1.innerHTML = city.value;
  citySearch(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitCity);

//Show weather at current location

function showWeatherAtLocation(response) {
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let weatherDescription = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  city.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
  weatherDescription.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f6e27edd666fe2993c6dd52e5b82732e";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeatherAtLocation);
}

function findLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#location-search-button");
locationButton.addEventListener("click", findLocation);
