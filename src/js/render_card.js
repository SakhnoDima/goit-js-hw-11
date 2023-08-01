export function renderCards(obj, rootSelector ) {

const markup = obj.map(({previewURL,tags,likes,views,comments,downloads}) =>
 (`<div class="photo-card">
<img src="${previewURL}" alt="${tags}" loading="lazy" />
<div class="info">
  <p class="info-item">
    <b>Likes ${likes}</b>
  </p>
  <p class="info-item">
    <b>Views ${views}</b>
  </p>
  <p class="info-item">
    <b>Comments ${comments}</b>
  </p>
  <p class="info-item">
    <b>Downloads ${downloads}</b>
  </p>
</div>
</div> `)).join("")
return rootSelector.insertAdjacentHTML("beforeend", markup)    
}


