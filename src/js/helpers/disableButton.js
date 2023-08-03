
import { hideSelector } from "./showHideBySelector";
import { refs } from "./refs";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
    timeout: 3000,   
    position: 'left-top',
})

export function setButtonDisable  (currentPage, totalPage){
 if (currentPage >= totalPage) {
    hideSelector(refs.buttonPagination);
    Notify.failure("Sorry, it was last page")
 }}
