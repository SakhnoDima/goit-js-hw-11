import { refs } from "./refs.js";

export function showButton() {
refs.buttonPagination.classList.remove("visually-hidden"); // показал лоадер
}
export function hideButton() {
refs.buttonPagination.classList.add("visually-hidden"); // спрятал лоадер
}

