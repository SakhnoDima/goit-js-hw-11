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
import { showSelector, hideSelector } from "./helpers/showHideBySelector";
// ===========================================================
refs.formEl.addEventListener("submit", onFormSubmit)
refs.buttonPagination.addEventListener("click", onButtonPagination)
//============================================================
//const observer = new IntersectionObserver(onObserver); // создал observer

const fetchCardPixabay = new FetchCardPixabay;  //создал новый экземпляр

//=============================================================

async function onFormSubmit (event){
   
event.preventDefault()
showSelector(refs.loader)                      // показал лоадер

refs.galleryBox.innerHTML = ""                 //очищаем галерею

const query = event.target.elements.searchQuery.value.trim();  //запомниз значение поиска

if ( (!query.trim()) ){                       // проверка на пустой лоадер
    hideSelector(refs.loader)  
    hideSelector(refs.buttonPagination)                            //спрятал лоадер
    return Notify.failure("Sorry, You need write somesing")
}
fetchCardPixabay.query = query;

fetchCardPixabay.page = 1;                    //вернул первую страницу
try {
const data = await fetchCardPixabay.findCard()//рендер по сабмиту
const totalRez = data.total;
const totalHits = data.totalHits;

if(totalRez === 0){ 
    event.target.reset();
    hideSelector(refs.loader)                               // спрятал лоадер
    return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
}
else {

Notify.success(`Hooray! We found ${totalHits} images.`)

if(totalRez > 40) {
    showSelector(refs.buttonPagination)       //кнопка стает активной
}
else if (totalRez < 40) { 
hideSelector(refs.buttonPagination)                          //кнопка скривается
}  

renderCards(data.hits, refs.galleryBox); // отрисовка запроса

const scroll = new OnlyScroll(window, {   // додав плавний скролл
    damping: 0.5,
    eventContainer: refs.galleryBox,
});

modalLightboxGallery.refresh();          //обновить картинки

}}
catch(error){ console.log(error.code);
Notify.failure(`Sorry, you need try again`)
}
finally{
    event.target.reset();                    //очищаю форму
    hideSelector(refs.loader)                // спрятал лоадер
}
}  

//================================================================

async function onButtonPagination() {  
    try{ 
showSelector(refs.loader)                            // показал лоадер
fetchCardPixabay.page += 1

const data = await fetchCardPixabay.findCard()
const totalHits = data.totalHits;
         
//проверяю на последнюю страницу
setButtonDisable(fetchCardPixabay.page, Math.ceil(totalHits/ fetchCardPixabay.requestLimit ))

renderCards(data.hits, refs.galleryBox)

modalLightboxGallery.refresh();                        //обновить картинки
}
catch(error){  console.log(error);
    Notify.failure(`Sorry, you need try again`)
    event.target.reset();    
}
finally{
hideSelector(refs.loader)                              // спрятал лоадер
}
}

