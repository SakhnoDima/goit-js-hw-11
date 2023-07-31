import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
    timeout: 3000,   
    position: 'left-top',
})

export function fetchPhoto(serch_valie){
    const BASE_URL = "https://pixabay.com/api/";
    const MY_KEY = "?key=38565810-29740f5778639307be3f3659"
    const url = `${BASE_URL}${MY_KEY}&q=${serch_valie}&image_type=photo&orientation=horizontal&safesearch=true`;
    
    return fetch(url).then(res=>{
        if (!res.ok) throw new Error(res.status)
       return res.json()})
    }