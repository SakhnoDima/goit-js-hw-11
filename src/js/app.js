import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
    timeout: 3000,   
    position: 'left-top',
})
import { renderCards } from "./render_card";
import { FetchCardPixabay, fetchPhoto, fetchPhotoPagin } from "./api_Pixabay";
import { refs } from "./helpers/refs";

refs.formEl.addEventListener("submit", onFormSubmit)
refs.buttonPagination.addEventListener("click", onButtonPagination)
//создал новый экземпляр
const fetchCardPixabay = new FetchCardPixabay;  


function onFormSubmit (event){
event.preventDefault()
refs.galleryBox.innerHTML = ""
//запомниз значение поиска
fetchCardPixabay.query = event.target.elements.searchQuery.value;
//вкрнул первую страницу
fetchCardPixabay.page = 1;
//рендер по сабмиту
fetchCardPixabay.findCard().then(data =>{
    if(data.total === 0){
    Notify.failure("Sorry, there are no images matching your search query. Please try again.")}
else return data}).catch(error => Notify.failure(`${error}`))
.then(data=> {renderCards(data.hits, refs.galleryBox)
fetchCardPixabay.page += 1})

}  

function onButtonPagination() {
fetchCardPixabay.fotoPagin().then(data =>{
    //!============
    console.log(fetchCardPixabay.page);
    const elementPerPage = Math.ceil(data.total / fetchCardPixabay.params.per_page)
   
    if(data.total <= 0){
    Notify.failure("Sorry, there are no images matching your search query. Please try again.")}
else return data}).catch(error => Notify.failure(`${error}`))
.then(data=> renderCards(data.hits, refs.galleryBox))



    
}