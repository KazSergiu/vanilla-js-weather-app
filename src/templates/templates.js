import { currentDate } from "../common/utils/jsVariables.js";
import { reorderWeekDays } from "../common/utils/functions.js";

export function displayImgTemplate(data) {
  return `<div class="textContainer">
  <p class="temperature">${Math.round(data.main.temp)} &deg</p>
  <div class="blockDisplay">
    <p class="city">${data.name}</p>
    <p class="date">${currentDate}</p>
  </div>
  <div class="blockDisplay">
    <img
      class="icon"
      src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
      alt="icon"
    />
    <p class="sky">${data.weather[0].main}</p>
  </div>
  </div>`;
}

export function weatherDetailsTemplate(data) {
  return `<h4>Weather Details</h4>
  <p>Cloudy<span class="cloudy">${data.clouds.all}%</span></p>
  <p>Humidity<span class="humidity">${data.main.humidity}%</span></p>
  <p>Wind<span class="wind">${Math.round(data.wind.speed)} m/s</span></p>`;
}

export function weekDisplayImgTemplate(data) {
  const weekDate = new Date(data.dt * 1000).toDateString();
  const cityName = document.querySelector(".city");
  return `<div class="textContainer">
    <p class="temperature">${Math.round(data.temp.day)} &deg</p>
    <div class="blockDisplay">
      <p class="city">${cityName.textContent}</p>
      <p class="date">${weekDate}</p>
    </div>
    <div class="blockDisplay">
      <img
        class="icon"
        src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
        alt="icon"
      />
      <p class="sky">${data.weather[0].main}</p>
    </div>
    </div>`;
}

export function weekWeatherDetailsTemplate(data) {
  return `<h4>Weather Details</h4>
    <p>Cloudy<span class="cloudy">${data.clouds}%</span></p>
    <p>Humidity<span class="humidity">${data.humidity}%</span></p>
    <p>Wind<span class="wind">${Math.round(data.wind_speed)} m/s</span></p>`;
}

export function weekDaysTemplate() {
  return `<h4>Next Days</h4>
    <p>${reorderWeekDays()[0]}</p>
    <p>${reorderWeekDays()[1]}</p>
    <p>${reorderWeekDays()[2]}</p>
    <p>${reorderWeekDays()[3]}</p>
    <p>${reorderWeekDays()[4]}</p>
    <p>${reorderWeekDays()[5]}</p>
    <p>${reorderWeekDays()[6]}</p>`;
}
