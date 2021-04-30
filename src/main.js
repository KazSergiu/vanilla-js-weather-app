import { CACHE, cacheGet, cacheSet } from "./common/cache.js";
import {
  currentTimestamp,
  storeLatLon,
  storeTimestampTimezone,
  oneHour,
} from "./common/utils/jsVariables.js";
import * as $el from "./common/utils/domElements.js";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./env.js";
import validateInput from "./common/utils/validate.js";
import { apiClient } from "./api/api-client/index.js";
import * as fn from "./common/utils/functions.js";

function displayCitiesWeather(e) {
  $el.err.textContent = "";
  if (
    !CACHE.has(
      `key${e.target.closest("p").textContent}` ||
        currentTimestamp - storeTimestampTimezone.timestamp > oneHour
    )
  ) {
    apiClient(
      {
        method: "GET",
        url: `${WEATHER_API_URL}weather?q=${
          e.target.closest("p").textContent
        }&units=metric&appid=${WEATHER_API_KEY}`,
      },
      fn.setLoadingState,
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          cacheSet(data.name, data);
          fn.setLatLong(data);
          fn.setTimestampTimezone(data);
          fn.weatherInfoDisplay(data);
          fn.changeCover(data.weather[0].main);
          fn.changeBtnColor(data.weather[0].main);
        }
      }
    );
  } else {
    const cacheData = cacheGet(`key${e.target.closest("p").textContent}`);
    fn.setLatLong(cacheData);
    fn.setTimestampTimezone(cacheData);
    fn.weatherInfoDisplay(cacheData);
    fn.changeCover(cacheData.weather[0].main);
    fn.changeBtnColor(cacheData.weather[0].main);
  }
}

function displayCurrentWeather(e) {
  e.preventDefault();
  const capitalizeInput = fn.capitalize($el.input.value);
  if (!validateInput($el.input.value)) {
    $el.input.value = "";
  } else if (
    !CACHE.has(
      `key${capitalizeInput}` ||
        currentTimestamp - storeTimestampTimezone.timestamp > oneHour
    )
  ) {
    apiClient(
      {
        method: "GET",
        url: `${WEATHER_API_URL}weather?q=${$el.input.value}&units=metric&appid=${WEATHER_API_KEY}`,
      },
      fn.setLoadingState,
      (err, data) => {
        if (err) {
          $el.err.textContent = "Fill valid city Name!";
          console.log(err);
        } else {
          $el.err.textContent = "";
          cacheSet(data.name, data);
          fn.setLatLong(data);
          fn.setTimestampTimezone(data);
          fn.weatherInfoDisplay(data);
          fn.changeCover(data.weather[0].main);
          fn.changeBtnColor(data.weather[0].main);
        }
      }
    );
  } else {
    const cacheData = cacheGet(`key${capitalizeInput}`);
    fn.setLatLong(cacheData);
    fn.setTimestampTimezone(cacheData);
    fn.weatherInfoDisplay(cacheData);
    fn.changeCover(cacheData.weather[0].main);
    fn.changeBtnColor(cacheData.weather[0].main);
  }
  $el.input.value = "";
}

function pageLoad() {
  apiClient(
    {
      method: "GET",
      url: `${WEATHER_API_URL}weather?q=London&units=metric&appid=${WEATHER_API_KEY}`,
    },
    fn.setLoadingState,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        cacheSet(data.name, data);
        fn.setLatLong(data);
        fn.setTimestampTimezone(data);
        fn.weatherInfoDisplay(data);
        fn.changeCover(data.weather[0].main);
        fn.changeBtnColor(data.weather[0].main);
      }
    }
  );
}

function displayWeekWeather(e) {
  const weekDays = document.querySelectorAll(".nextDays p");
  let weekData = {};
  $el.err.textContent = "";
  if (!CACHE.has(`key${storeLatLon.timezone}`)) {
    apiClient(
      {
        method: "GET",
        url: `${WEATHER_API_URL}onecall?lat=${storeLatLon.lat}&lon=${storeLatLon.lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${WEATHER_API_KEY}`,
      },
      fn.setLoadingState,
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          switch (e.target.closest("p")) {
            case weekDays[0]:
              weekData = data.daily[0];
              break;
            case weekDays[1]:
              weekData = data.daily[1];
              break;
            case weekDays[2]:
              weekData = data.daily[2];
              break;
            case weekDays[3]:
              weekData = data.daily[3];
              break;
            case weekDays[4]:
              weekData = data.daily[4];
              break;
            case weekDays[5]:
              weekData = data.daily[5];
              break;
            case weekDays[6]:
              weekData = data.daily[6];
          }
          cacheSet(data.timezone_offset, data);
          fn.weekWeatherInfoDisplay(weekData);
          fn.changeCover(weekData.weather[0].main);
          fn.changeBtnColor(weekData.weather[0].main);
        }
      }
    );
  } else {
    const cacheData = cacheGet(`key${storeLatLon.timezone}`);
    switch (e.target.closest("p")) {
      case weekDays[0]:
        weekData = cacheData.daily[0];
        break;
      case weekDays[1]:
        weekData = cacheData.daily[1];
        break;
      case weekDays[2]:
        weekData = cacheData.daily[2];
        break;
      case weekDays[3]:
        weekData = cacheData.daily[3];
        break;
      case weekDays[4]:
        weekData = cacheData.daily[4];
        break;
      case weekDays[5]:
        weekData = cacheData.daily[5];
        break;
      case weekDays[6]:
        weekData = cacheData.daily[6];
    }
    fn.weekWeatherInfoDisplay(weekData);
    fn.changeCover(weekData.weather[0].main);
    fn.changeBtnColor(weekData.weather[0].main);
  }
}

window.addEventListener("load", pageLoad);

$el.btn.addEventListener("click", displayCurrentWeather);

$el.cities.addEventListener("click", displayCitiesWeather);

$el.nextDays.addEventListener("click", displayWeekWeather);
