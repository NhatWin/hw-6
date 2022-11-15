const cityWeather = {};
const cityCoordinates = {};
const search = document.querySelector("#form");
const ul = document.querySelector("#search-history");
const todayCity = document.querySelector("#today-city");
const todayWeatherData = document.querySelector("#today-weather-info");
const history = document.querySelector("#history");
const displayWeather = document.querySelector("#weather-info");
const displayStart = document.querySelector("#start-info");
const days = document.querySelector("#days");

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
          console.log(data)
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
  for (let i = 0; i > ul.children.length; i++) {
    if (li.textContent != data.city.name) {
      li.textContent = data.city.name
      ul.append(li);
    }
  }


  // city name and date
  todayCity.textContent = `${data.city.name} ${dayjs.unix(data.list[0].dt).format('DD/MM/YYYY')}`;
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
  days.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const section = document.createElement("section");
    const h3 = document.createElement("h3");
    const ul = document.createElement("ul");
    const img = document.createElement("img");
    const temp = document.createElement("li");
    const wind = document.createElement("li");
    const hum = document.createElement("li");
    const hr = document.createElement("hr");
    let index = i*8-1;

    section.classList.add("days");
    h3.textContent = dayjs.unix(data.list[index].dt).format('DD/MM/YYYY');
    img.src = `http://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`
    h3.append(img);
    temp.textContent = `Temp: ${Math.round(data.list[index].main.temp - 273.15)}`
    wind.textContent = `Wind: ${data.list[index].wind.speed}`
    hum.textContent = `Humidity: ${data.list[index].main.humidity}%`
    ul.append(temp, wind, hum)
    section.append(h3, hr, ul);
    days.append(section);

  }
}

// click search history
document.addEventListener("click", function (event) {
  if(event.target && event.target.id == "history") {
    cityCoordinates.data = `http://api.openweathermap.org/geo/1.0/direct?q=${event.target.textContent}&limit=1&appid=1866bb0371e7ecff1990b7e071a75947`
    getWeather();
  }
});

// TODO: display weather information for upcoming 5 days below main
