const cityWeather = {};
const cityCoordinates = {};
const search = document.querySelector("#form");
const ul = document.querySelector("#search-history");

search.addEventListener("submit", function (event) {
  event.preventDefault();
  cityCoordinates.data = `http://api.openweathermap.org/geo/1.0/direct?q=${event.target.city.value}&limit=1&appid=1866bb0371e7ecff1990b7e071a75947`
  getWeather();
  const li = document.createElement("li");
  li.textContent = event.target.city.value
  ul.append(li);
});

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
          console.log(data);
          // city name
          console.log(data.city.name);
          // date
          console.log(data.list[0].dt_txt);
          //image
          console.log(data.list[0].weather[0].icon);
          // temp
          console.log(data.list[0].main.temp);
          // wind
          console.log(data.list[0].wind.speed);
        })
    })
}

function addHistory() {
  const li = document.createElement("li");
  li.textContent = event.target.city.value
}

// TODO: display weather information on main screen

// TODO: display weather information for upcoming 5 days below main

//TODO: display previous searches below search bar