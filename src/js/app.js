import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
    timeout: 3000,   
    position: 'left-top',
})
import { renderCards } from "./render_card";
import { FetchCardPixabay,} from "./api_Pixabay";
import { refs } from "./helpers/refs";
import { setButtonDisable } from "./helpers/disableButton.js";

refs.formEl.addEventListener("submit", onFormSubmit)
refs.buttonPagination.addEventListener("click", onButtonPagination)
//создал новый экземпляр
const fetchCardPixabay = new FetchCardPixabay;  


function onFormSubmit (event){
event.preventDefault()
//очищаем галерею
refs.galleryBox.innerHTML = ""
//запомниз значение поиска
const query = event.target.elements.searchQuery.value;
//проверяем на пустой инпут
if (!query){ refs.buttonPagination.disabled = true
return Notify.failure("Sorry, You need write somesing")}
fetchCardPixabay.query = query;
//вернул первую страницу
fetchCardPixabay.page = 1;
//рендер по сабмиту
fetchCardPixabay.findCard().then(data =>{
    if(data.total === 0){
    Notify.failure("Sorry, there are no images matching your search query. Please try again.")}
else return data}).catch(error => Notify.failure(`${error}`))
.then(data=> { 
    Notify.success(`Hooray! We found ${data.total} images.`)
    //проверяю на последнюю страницу
    setButtonDisable(fetchCardPixabay.page, Math.ceil(data.total / fetchCardPixabay.requestLimit ))
    //кнопка стает активной
    refs.buttonPagination.disabled = false
    renderCards(data.hits, refs.galleryBox)
fetchCardPixabay.page += 1})
//очищаю форму
event.target.reset()


}  

function onButtonPagination() {
    fetchCardPixabay.findCard().then(data =>{
        if(data.total === 0){
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")}
    else return data}).catch(error => Notify.failure(`${error}`))
    .then(data=> {
         //кнопка стает активной
        refs.buttonPagination.disabled = false
        //проверяю на последнюю страницу
        setButtonDisable(fetchCardPixabay.page, Math.ceil(data.total / fetchCardPixabay.requestLimit ))
        renderCards(data.hits, refs.galleryBox)
    fetchCardPixabay.page += 1})
    
}