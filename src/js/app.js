import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
    timeout: 3000,   
    position: 'left-top',
})

import { fetchPhoto } from "./api_Pixabay.js";

fetchPhoto("sky")
.then(data =>{
    console.log(data);
    if(data.total === 0){
    Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }else return data}).catch(error => Notify.failure(`${error}`))