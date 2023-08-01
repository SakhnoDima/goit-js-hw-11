import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const modalLightboxGallery = new SimpleLightbox('.gallery a');
 //============================================================ 
import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
    timeout: 3000,   
    position: 'left-top',
})
//============================================================
import { renderCards } from "./render_card";
import { FetchCardPixabay,} from "./api_Pixabay";
import { refs } from "./helpers/refs";
import { setButtonDisable } from "./helpers/disableButton.js";

refs.formEl.addEventListener("submit", onFormSubmit)
refs.buttonPagination.addEventListener("click", onButtonPagination)

const fetchCardPixabay = new FetchCardPixabay;  //создал новый экземпляр


async function onFormSubmit (event){
    try {
event.preventDefault()
refs.galleryBox.innerHTML = ""   //очищаем галерею
const query = event.target.elements.searchQuery.value;  //запомниз значение поиска
if (!query){ refs.buttonPagination.disabled = true   //проверяем на пустой инпут
return Notify.failure("Sorry, You need write somesing")}

fetchCardPixabay.query = query;

fetchCardPixabay.page = 1;  //вернул первую страницу

//рендер по сабмиту
const data = await fetchCardPixabay.findCard()
    if(data.total === 0){Notify.failure("Sorry, there are no images matching your search query. Please try again.")}
else Notify.success(`Hooray! We found ${data.total} images.`)
setButtonDisable(fetchCardPixabay.page, Math.ceil(data.total / fetchCardPixabay.requestLimit )) //проверяю на последнюю страницу
refs.buttonPagination.disabled = false;  //кнопка стает активной
renderCards(data.hits, refs.galleryBox); // отрисовка запроса
fetchCardPixabay.page += 1;
event.target.reset(); //очищаю форму
modalLightboxGallery.refresh();  //! библиотека SimpleLightbox
}
catch(error){ Notify.failure(`${error}`)
event.target.reset(); //очищаю форму
}
}  

async function onButtonPagination() {
    try{
const data = await fetchCardPixabay.findCard()
        if(data.total === 0){
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")}
    else refs.buttonPagination.disabled = false  //кнопка стает активной
//проверяю на последнюю страницу
setButtonDisable(fetchCardPixabay.page, Math.ceil(data.total / fetchCardPixabay.requestLimit ))
renderCards(data.hits, refs.galleryBox)
fetchCardPixabay.page += 1
}
catch(error){ Notify.failure(`${error}`)}
}
