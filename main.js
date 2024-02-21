const API_KEY = `db9569ed04774c3fb9c5a4d68a5aa546`;

let newsList = [];

const getLatestNews = async () => {
  // const url = new URL(`https://fastidious-brioche-a7bfc5.netlify.app/top-headlines?country=kr`) 누나 API
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&apiKey=db9569ed04774c3fb9c5a4d68a5aa546`
  );
  const response = await fetch(url);
  const data = await response.json(); //json을 파일형식
  newsList = data.articles;
  console.log("news",newsList)
  render()
};
getLatestNews();

const render = () => {
  console.log(newsList[0].title)
  const newsHTML = newsList.map(
    (news) => `<div class="row news"> 
    <div class="col-lg-4">
        <img class="news-img-size"src="${news.urlToImage}">
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>
            ${news.description}
        </p>
        <div>
            ${news.source.name} * ${news.publishedAt}
        </div>
    </div>
</div>`
  ).join('');

  document.getElementById("news-board").innerHTML = newsHTML;
};



const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};
