import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
    timeout: 3000,   
    position: 'left-top',
})

const axios = require('axios').default;
const BASE_URL = "https://pixabay.com/api/?";
const MY_KEY = "key=38565810-29740f5778639307be3f3659c"
const SEARCH_OPTIONS = "image_type=photo&orientation=horizontal&safesearch=true&per_page=40"


export class FetchCardPixabay {
params = new URLSearchParams({
        image_type : "photo",
        orientation : "horizontal",
        safesearch : true,
        per_page : 40,
      });
search_value = "";
page = 1; 

findCard(){
    return axios({
        method: 'get',
        url : `${BASE_URL}${MY_KEY}&${this.params}&q=${this.search_value}`,
      })
        .then(response => response.data)}
 
fotoPagin(){
    return axios({
        method: 'get',
        url : `${BASE_URL}${MY_KEY}&q=${this.search_value}&${SEARCH_OPTIONS}&page=${this.page}`,
      })
        .then(response => response.data)
    }
get query (){
    return this.search_value;
}
set query(newQuery){
    this.search_value = newQuery;
}
}



// export function fetchPhoto(serch_valie){
//     return axios({
//         method: 'get',
//         url : `${BASE_URL}${MY_KEY}&q=${serch_valie}&${SEARCH_OPTIONS}`,
//       })
//         .then(response => response.data)
//     }

// export function fetchPhotoPagin (serch_valie, page,){
//     return axios({
//         method: 'get',
//         url : `${BASE_URL}${MY_KEY}&q=${serch_valie}&${SEARCH_OPTIONS}&page=${page}`,
//       })
//         .then(response =>  response.data)
//     }
