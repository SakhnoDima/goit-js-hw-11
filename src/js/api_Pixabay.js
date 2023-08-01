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
    searchValue = "";
    page = 1; 
    requestLimit = 40;

findCard(){
const params = new URLSearchParams({
    q : this.searchValue,
    page : this.page, 
    image_type : "photo",
    orientation : "horizontal",
    safesearch : true,
    per_page : this.requestLimit,
  });

    return axios({
        method: 'get',
        url : `${BASE_URL}${MY_KEY}&${params}`,
      })
        .then(response => response.data)}
 
// fotoPagin(){
//     return axios({
//         method: 'get',
//         url : `${BASE_URL}${MY_KEY}&${this.params}`,
//       })
//         .then(response => response.data)
//     }
get query (){
    return this.searchValue;
}
set query(newQuery){
    this.searchValue = newQuery;
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
