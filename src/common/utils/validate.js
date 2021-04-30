import { err } from "./domElements.js";

// Validate Function
export default function validateInput(text) {
  const regex = /[^a-z|^A-Z|^\s]/;
  if (text === "") {
    err.textContent = "Fill the input!";
    return false;
  } else if (text.match(regex)) {
    err.textContent = "Only letters are allowed!";
    return false;
  } else {
    err.textContent = "";
  }
  return true;
}
