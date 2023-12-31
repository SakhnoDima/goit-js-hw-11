export function renderCards(obj, rootSelector ) {

const markup = obj.map(renderCard).join("")
return rootSelector.insertAdjacentHTML("beforeend", markup)    
}


function renderCard({previewURL,tags,likes,views,comments,downloads,largeImageURL}) {
  return ` <a class="links" href="${largeImageURL}" ><div class="photo-card">
  <img class="small_img" src="${previewURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes -- ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views --  ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments -- ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads -- ${downloads}</b>
    </p>
  </div>
  </div></a> `
}
