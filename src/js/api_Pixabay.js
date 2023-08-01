const axios = require('axios').default;
const BASE_URL = "https://pixabay.com/api/?";
const MY_KEY = "key=38565810-29740f5778639307be3f3659c"

export class FetchCardPixabay {
    searchValue = "";
    page = 1; 
    requestLimit = 40;

async findCard(){
const params = new URLSearchParams({
    q : this.searchValue,
    page : this.page, 
    image_type : "photo",
    orientation : "horizontal",
    safesearch : true,
    per_page : this.requestLimit,
  });

    const response = await axios({
        method: 'get',
        url : `${BASE_URL}${MY_KEY}&${params}`,
      })
    const data = await response.data;
    return data
}
 

get query (){
    return this.searchValue;
}
set query(newQuery){
    this.searchValue = newQuery;
}
}
