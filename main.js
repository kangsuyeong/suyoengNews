const API_KEY = `db9569ed04774c3fb9c5a4d68a5aa546`;

let tabs = document.querySelectorAll(".menus button")
let newsList = [];
let mode = ''

tabs.forEach(menu=>
  menu.addEventListener("click",(e)=>filter(e))
)

const getLatestNews = async () => {
  const url = new URL(`https://fastidious-brioche-a7bfc5.netlify.app/top-headlines?country=kr`); //누나 API
  // const url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=us&category=${mode}&apiKey=${API_KEY}`
  // );
  const response = await fetch(url);
  const data = await response.json(); //json을 파일형식
  newsList = data.articles;
  console.log("news",newsList)
  render()
};
getLatestNews();

const render = () => {
  const newsHTML = newsList.map(
    (news) => 
    `<div class="row news"> 
    <div class="col-lg-4">
        <img class="news-img-size"src="${news.urlToImage||"https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227724992-stock-illustration-image-available-icon-flat-vector.jpg"}">
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>
            ${news.description==null || news.description==""
            ?"내용없음"
            :news.description.length>200
            ?news.description.substring(0,200)+"...":news.description}
        </p>
        <div>
            ${news.source.name||"no source"} * ${moment(news.publishedAt).fromNow()}
        </div>
    </div>
</div>`
  ).join('');

  document.getElementById("news-board").innerHTML = newsHTML;
};

const filter = (e)=>{
  console.log("click",e.target.id)
  mode = e.target.id;
  getLatestNews();
}



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
