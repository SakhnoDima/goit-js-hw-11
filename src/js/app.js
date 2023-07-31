import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
    timeout: 3000,   
    position: 'left-top',
})
import { renderCard } from "./render_card";
import { fetchPhoto } from "./api_Pixabay";
import { refs } from "./helpers/refs";

refs.formEl.addEventListener("submit", onFormSubmit)

function onFormSubmit (event){
event.preventDefault()
const searchItem = event.target.elements.searchQuery.value

fetchPhoto(searchItem)
.then(data =>{
    if(data.total === 0){
    Notify.failure("Sorry, there are no images matching your search query. Please try again.")}
else return data}).catch(error => Notify.failure(`${error}`))
.then(data=> renderCard(data.hits, refs.galleryBox))
}  

