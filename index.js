const loadNews = async () => {
  const url = `https://openapi.programming-hero.com/api/news/category/02`
  try {
    const res = await fetch(url);
    const data = await res.json();
    showCategoryDetails(data.data);
  }
  catch (error) {
    console.log(error);
  }
}
const showCategoryDetails = data => {
  console.log(data);
  const newsCatagory = document.getElementById('news-category');
  data.forEach(data => {
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
    <div class="col rounded-5 h-100">
          <div class="card h-100">
            <img src="${data.image_url}"class="card-img-top img-fluid" alt="...">
            <div class="card-body">
              <h5 class="card-title">${data.title}</h5>
              <p class="card-text">${data.details.slice(0,80)}</p>
            </div>
            <div class="d-flex justify-content-">
            <div class="mx-3 d-flex justify-content-between">
              <img class="author-img rounded-circle mt-1" src="${data.author.img}">
              <div class="mx-3">
                <h6>${data.author.name}</h6>
                <p>${data.author.published_date}</p>
              </div>
              </div>
              <a class="ms-auto m-4 text-black"> <i class="text-right fa-regular fa-eye"> ${data.total_view}</i></a>
            </div>
            <div class="card-footer text-center">
             <button onclick="loadAuthorDetail('${data}')" class="btn text-muted" data-bs-toggle="modal" data-bs-target="#exampleModal">Show-details</button>
            </div>
          </div>
        </div>
    `;
    newsCatagory.appendChild(phoneDiv);
  });
}


const loadAuthorDetail = () => {
  fetch(`https://openapi.programming-hero.com/api/news/category/01`)
    .then((res) => res.json())
    .then((data) => displayAuthorDetail(data.data));
};

const displayAuthorDetail = (data) => {
  console.log(data);
  const detailContainer = document.getElementById("author-details");
  detailContainer.innerHTML = `
     <div>
        <h6 class="card-title">Author Name: ${data[0].author.name}</h6>
        <h6 class="card-text">Publis date: ${data[0].author.published_date} </h6>
        <h6 class="card-text">Total view: ${data[0].total_view}</h6>
     </div>
     
     `;
}
loadNews();