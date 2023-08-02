import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const modalLightboxGallery = new SimpleLightbox('.gallery a');
//============================================================
import OnlyScroll from 'only-scrollbar';
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
import { setButtonDisable} from "./helpers/disableButton.js";
// ===========================================================
refs.formEl.addEventListener("submit", onFormSubmit)
refs.buttonPagination.addEventListener("click", onButtonPagination)
//============================================================
const observer = new IntersectionObserver(onObserver); // создал observer

const fetchCardPixabay = new FetchCardPixabay;  //создал новый экземпляр

//=============================================================
async function onFormSubmit (event){
    try {
event.preventDefault()
refs.galleryBox.innerHTML = ""   //очищаем галерею
const query = event.target.elements.searchQuery.value;  //запомниз значение поиска
if (!query){ refs.buttonPagination.disabled = true   //проверяем на пустой инпут
observer.unobserve(refs.buttonPagination) //снял
return Notify.failure("Sorry, You need write somesing")}
observer.observe(refs.buttonPagination); // повесил observer
fetchCardPixabay.query = query;

fetchCardPixabay.page = 1;  //вернул первую страницу

//рендер по сабмиту
const data = await fetchCardPixabay.findCard()
    if(data.total === 0){Notify.failure("Sorry, there are no images matching your search query. Please try again.")}
else Notify.success(`Hooray! We found ${data.total} images.`)
setButtonDisable(fetchCardPixabay.page, Math.ceil(data.total / fetchCardPixabay.requestLimit )) //проверяю на последнюю страницу
refs.buttonPagination.disabled = false;  //кнопка стает активной
renderCards(data.hits, refs.galleryBox); // отрисовка запроса
const scroll = new OnlyScroll(window, {   // додав плавний скролл
    damping: 0.5,
    eventContainer: refs.galleryBox,
});
event.target.reset(); //очищаю форму
modalLightboxGallery.refresh();
}
catch(error){ Notify.failure(`${error}`)
event.target.reset(); //очищаю форму
}
}  

async function onButtonPagination() {
    try{
fetchCardPixabay.page += 1
const data = await fetchCardPixabay.findCard()
refs.buttonPagination.disabled = false  //кнопка стает активной
//проверяю на последнюю страницу
setButtonDisable(fetchCardPixabay.page, Math.ceil(data.total / fetchCardPixabay.requestLimit ))
renderCards(data.hits, refs.galleryBox)
modalLightboxGallery.refresh();
}
catch(error){ Notify.failure(`${error}`)}
}

function onObserver(entries){
    entries.forEach(entry => {
    if (entry.isIntersecting){onButtonPagination()} 
    })
}