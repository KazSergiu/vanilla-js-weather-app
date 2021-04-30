import {
  displayImgTemplate,
  weatherDetailsTemplate,
  weekDisplayImgTemplate,
  weekWeatherDetailsTemplate,
  weekDaysTemplate,
} from "../../templates/templates.js";
import { storeLatLon, dayNum, storeTimestampTimezone } from "./jsVariables.js";
import * as $el from "../utils/domElements.js";

// Functions
export function setLatLong(data) {
  storeLatLon.lat = data.coord.lat;
  storeLatLon.lon = data.coord.lon;
}

export function setTimestampTimezone(data) {
  storeTimestampTimezone.timestamp = data.dt;
  storeTimestampTimezone.timezone = data.timezone;
}

export function capitalize(input) {
  return input
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
}

export function reorderWeekDays() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekDays = days.slice(dayNum).concat(days.slice(0, dayNum));
  return weekDays;
}

// Display HTML Functions
export function weatherInfoDisplay(data) {
  $el.displayImgContainer.innerHTML = displayImgTemplate(data);
  $el.displayDetailsContainer.innerHTML = weatherDetailsTemplate(data);
  $el.nextDays.innerHTML = weekDaysTemplate();
}

export function weekWeatherInfoDisplay(data) {
  $el.displayImgContainer.innerHTML = weekDisplayImgTemplate(data);
  $el.displayDetailsContainer.innerHTML = weekWeatherDetailsTemplate(data);
}

// Animation Functions
export function setLoadingState(state) {
  if (state) {
    $el.loadState.classList.add("loadingState");
  } else {
    $el.loadState.classList.remove("loadingState");
  }
}

export function changeCover(cover) {
  $el.main.style.backgroundImage = `url("./src/img/${cover}.jpg")`;
  $el.body.style.backgroundImage = `url("./src/img/${cover}.jpg")`;
}

export function changeBtnColor(clas) {
  $el.btn.classList = `searchBtn ${clas}`;
}
