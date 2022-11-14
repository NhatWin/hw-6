const cityWeather = {};
const cityCoordinates = {};
const search = document.querySelector("#form");
const ul = document.querySelector("#search-history");
const todayCity = document.querySelector("#today-city");
const todayWeatherData = document.querySelector("#today-weather-info");
const history = document.querySelector("#history");
const displayWeather = document.querySelector("#weather-info");
const displayStart = document.querySelector("#start-info");

const day1 = document.querySelector("#day1");
const day2 = document.querySelector("#day2");
const day3 = document.querySelector("#day3");
const day4 = document.querySelector("#day4");
const day5 = document.querySelector("#day5");

const temp = document.querySelector("#temp");
const wind = document.querySelector("#wind");
const hum = document.querySelector("#hum");

// get lon and and lat
search.addEventListener("submit", function (event) {
  event.preventDefault();
  cityCoordinates.data = `http://api.openweathermap.org/geo/1.0/direct?q=${event.target.city.value}&limit=1&appid=1866bb0371e7ecff1990b7e071a75947`
  getWeather();
  openWeather();
});

// display weather
function openWeather() {
  displayStart.style.setProperty("display","none")
  displayWeather.style.setProperty("display", "block");
}

// click search history
document.addEventListener("click", function (event) {
  if(event.target && event.target.id== "history") {
    cityCoordinates.data = `http://api.openweathermap.org/geo/1.0/direct?q=${event.target.textContent}&limit=1&appid=1866bb0371e7ecff1990b7e071a75947`
    getWeather();
  }
});

// get city weather
function getWeather() {
  fetch(cityCoordinates.data)
    .then(function (coords) {
      return coords.json();
    })
    .then(function (data) {
      cityWeather.data = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=1866bb0371e7ecff1990b7e071a75947`
      fetch(cityWeather.data)
        .then(function (weather) {
          return weather.json();
        })
        .then(function (data) {
          localStorage.setItem("weather", JSON.stringify(data));
          displayInfo ();
        })
    })
}

function displayInfo () {
  const data = JSON.parse(localStorage.getItem("weather"))

  // history
  const li = document.createElement("li");
  li.setAttribute("id", "history")
  li.textContent = data.city.name
  ul.append(li);

  // city name and date
  let rawData = data.list[0].dt_txt
  const arrayData = rawData.split("-");
  const dateFix = arrayData[2].split(" ");
  const completeDate = `${arrayData[1]}/${dateFix[0]}/${arrayData[0]}`
  todayCity.textContent = `${data.city.name} ${completeDate}`;
  //image
  const img = document.createElement("img");
  img.src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`
  todayCity.append(img);
  // temp
  const celsius = Math.round(data.list[0].main.temp - 273.15);
  temp.textContent = `Temp: ${celsius}℃`;
  // wind
  wind.textContent = `Wind: ${data.list[0].wind.speed}m/s`;
  // humidity
  hum.textContent = `Humidity: ${data.list[0].main.humidity}%`;



  // 5days
  for (let i = 1; i < 5; i++) {

  }
}

// TODO: display weather information for upcoming 5 days below main
