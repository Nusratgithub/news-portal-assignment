// get api data from url
let getData = () => {
  try {
    fetch("https://openapi.programming-hero.com/api/news/category/01")
      .then((res) => res.json())
      .then((data) => displayData(data.data));
  }
  catch (error) {
    console.log(error);
  }
};
getData();
// display data
let displayData = (displayRecivedData) => {
  let setHtmlHere = document.getElementById("setHtmlHere");
  setHtmlHere.innerHTML = ``;
  displayRecivedData.forEach((singleNewsData) => {
    // modal start
    let modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = ` 
     <div class="mdoal-info"> 
        <h5>Author Name: ${singleNewsData.author.name} </h5>
        <span>Publish date: ${singleNewsData.author.published_date}</span>
        <p class="modal-text">Total view:  ${singleNewsData.total_view} </p>
    </div>
    
   `;
    // modal end
    let createDiv = document.createElement("div");
    createDiv.classList.add("each-news-wrapper");
    createDiv.innerHTML = ` 
<div class="news-items-for-flex">
  <img src="${singleNewsData.thumbnail_url}" alt="" class="news-image " />
  <div class="news-info">
    <h2>${singleNewsData.title}</h2>
    <p>${singleNewsData.details.slice(0, 300)}</p>
    <div class="author-info">
      <div class="publish-date-and-author-name">
        <img src="${singleNewsData.author.img}" alt="" />
        <div>
          <h5>${singleNewsData.author.name}</h5>
          <span>${singleNewsData.author.published_date}</span>
        </div>
      </div>
      <div class="view">
        <i class="fa fa-eye"></i> <span>${singleNewsData.total_view}</span>
      </div>
      <div class="ratings">
        <i class="fa-regular fa-star-half-stroke"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
      </div>
      <button id="details-btn"  data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
    </div>
  </div>
</div>
    `;
    setHtmlHere.appendChild(createDiv);
  });
  let itemFound = document.getElementById("item-found");
  let wholeItemFouondMsg = document.getElementById('whole-items-messege');
  if (displayRecivedData.length === 0) {
    wholeItemFouondMsg.classList.add('d-none')
  }
  else {
    wholeItemFouondMsg.classList.remove('d-none')
    itemFound.innerText = displayRecivedData.length;
  }
};

// categorized item
let catagoryData = () => {
  let url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => getCategoryName(data.data));
};
// display category news list
let getCategoryName = (recivedCategory) => {
  // show 100 text in news description
  let newsCategory = recivedCategory.news_category;
  let setCategoryHtml = document.getElementById("category-item-will-set-here");

  for (singleNews of newsCategory) {
    let createNewsDiv = document.createElement("div");
    createNewsDiv.innerHTML = ` 
      <li class="fs-5"> <a onclick="showCategoryDetails('${singleNews.category_id}')"> ${singleNews.category_name} </a> </li>
    `;
    setCategoryHtml.appendChild(createNewsDiv);
  }
  spinner(false);
};
catagoryData();

// filtering category
let getNewsData = (categoryID) => {
  let url = `https://openapi.programming-hero.com/api/news/category/${categoryID}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showCategoryDetails(data));
};

// getNewsData();

let showCategoryDetails = (CategoryData) => {
  spinner(true);
  let url = `https://openapi.programming-hero.com/api/news/category/${CategoryData}`;
  try {
    fetch(url)
      .then((res) => res.json())
      .then((data) => showNewsInHml(data.data));

  }
  catch(error) {
    console.log(error)
  }
  setHtmlHere.innerHTML = '';
};
//  spiner start 
const spinner = isloading => {
  const loaderSection = document.getElementById('loader');
  if (isloading) {
    loaderSection.classList.remove('d-none');
  }
  else {
    loaderSection.classList.add('d-none');
  }
}


// show category all details by onclick category
let showNewsInHml = (getNewsCategorized) => {
  let setHtmlCategoryHere = document.getElementById("setCategoryHtmlHere");
  setHtmlCategoryHere.innerText = "";
  if (getNewsCategorized.length === 0) {
    setHtmlCategoryHere.innerHTML = `
       <h2 class="my-4 text-center">No data available. explore another category!</h2>
    `;
  }
  for (let singleNewsCategory of getNewsCategorized) {
    // modal start
    let modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = ` 
       <div class="mdoal-info">
        <h5>Author Name: ${singleNewsCategory.author.name} </h5>
        <span>Publish date: ${singleNewsCategory.author.published_date}</span>
        <p class="modal-text">Total view:  ${singleNewsCategory.total_view} </p>
    </div>
    `;
    // modal end

    let singleDataSetHTmlCreateElemnt = document.createElement("div");
    singleDataSetHTmlCreateElemnt.classList.add("each-news-wrapper");
    singleDataSetHTmlCreateElemnt.innerHTML = ` 
      
 <div class="news-items-for-flex">
  <img src="${singleNewsCategory.thumbnail_url}" alt="" class="news-image" />
  <div class="news-info">
    <h2>${singleNewsCategory.title}</h2>
    <p>${singleNewsCategory.details.slice(0, 300)}</p>
    <div class="author-info">
      <div class="publish-date-and-author-name">
        <img src="${singleNewsCategory.author.img}" alt="" />
        <div>
          <h5>${singleNewsCategory.author.name}</h5>
          <span>${singleNewsCategory.author.published_date}</span>
        </div>
      </div>
      <div class="view">
        <i class="fa fa-eye"></i> <span>${singleNewsCategory.total_view}</span>
      </div>
      <div class="ratings">
        <i class="fa-regular fa-star-half-stroke"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
      </div>
      <button id="details-btn"  data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
    </div>
  </div>
</div>
     `;
    setHtmlCategoryHere.appendChild(singleDataSetHTmlCreateElemnt);
  }
  // items found message
  let itemFound = document.getElementById("item-found");
  let wholeItemFouondMsg = document.getElementById('whole-items-messege');
  if (getNewsCategorized.length === 0) {
    wholeItemFouondMsg.classList.add('d-none')
  }
  else {
    wholeItemFouondMsg.classList.remove('d-none')
    itemFound.innerText = getNewsCategorized.length;
  }
};

