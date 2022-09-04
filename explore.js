
// categorized item
let catagoryData = () => {
  let url = `https://openapi.programming-hero.com/api/news/categories`
  fetch(url)
      .then((res) => res.json())
    .then((data) => getCategoryName(data.data));
  
};
// display category news list
let getCategoryName = (recivedCategory) => {
  let newsCategory = recivedCategory.news_category;
  let setCategoryHtml = document.getElementById("category-list");
  newsCategory.forEach(news_category => {
    let createNewsDiv = document.createElement("div");
    createNewsDiv.innerHTML = ` 
      <li class="nav-item p-4 fs-5" id="navbarTogglerDemo02"> <a onclick="showCategoryDetails('${news_category.category_id}')"> ${news_category.category_name} </a> </li>
    `;
    setCategoryHtml.appendChild(createNewsDiv);
  });
};
catagoryData();

