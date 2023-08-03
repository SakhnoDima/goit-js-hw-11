
import { hideButton } from "./buttonOnOff";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
    timeout: 3000,   
    position: 'left-top',
})

export function setButtonDisable  (currentPage, totalPage){
 if (currentPage >= totalPage) {
    hideButton();
    Notify.failure("Sorry, it was last page")
 }}
