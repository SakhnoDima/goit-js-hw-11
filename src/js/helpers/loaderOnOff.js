import { refs } from "./refs.js";

export function showLoader() {
refs.loader.classList.remove("visually-hidden"); // показал лоадер
}
export function hideLoader() {
refs.loader.classList.add("visually-hidden"); // спрятал лоадер
}