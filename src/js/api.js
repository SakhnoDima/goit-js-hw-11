import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
    timeout: 3000,   
    position: 'left-top',
})

export function fetchPhoto(serch_valie){
    const MY_KAY = "?key=38565810-29740f5778639307be3f3659c"
    const BASE_URL = "https://pixabay.com/api/";
    const url = `${BASE_URL}${MY_KAY}&q=${serch_valie}&image_type=photo&orientation=horizontal&safesearch=true`;
    
    
    return fetch(url).then(res=>res.json()).then(data =>{
        if(data.total === 0){ 
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        }else return data;
     })
    
    }