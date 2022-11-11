// const cityWeather = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1866bb0371e7ecff1990b7e071a75947`
const cityCoordinates = {};
const search = document.querySelector("#form");

search.addEventListener("submit", function (event) {
  event.preventDefault();
  cityCoordinates.city = `http://api.openweathermap.org/geo/1.0/direct?q=${event.target.city.value}&limit=1&appid=1866bb0371e7ecff1990b7e071a75947`
  getCoordinates()
});

function getCoordinates() {
  fetch(cityCoordinates.city)
    .then(function (weather) {
      return weather.json();
    })
    .then(function (data) {
      const cityWeather = `api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=1866bb0371e7ecff1990b7e071a75947`
      console.log(cityWeather)
    })
}

// TODO: use lat and lon to get weather infromation on a specific place

// TODO: display weather information on main screen

// TODO: display weather information for upcoming 5 days below main

//TODO: display previous searches below search bar