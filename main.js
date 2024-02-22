//1. 버튼들에 클릭이벤트주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기

const API_KEY = `db9569ed04774c3fb9c5a4d68a5aa546`;
const menus = document.querySelectorAll(".menus button")


let tabs = document.querySelectorAll(".menus button")
let newsList = [];
let category = ''
let keyword = ''

menus.forEach(menu=>
  menu.addEventListener("click",(event)=>getNewsByCategory(event))
)

const getLatestNews = async () => {
  const url = new URL(`https://fastidious-brioche-a7bfc5.netlify.app/top-headlines?q=${keyword}&country=kr&category=${category}`); //누나 API
  // const url = new URL(
  //   `https://newsapi.org/v2/top-headlines?q=${keyword}&country=kr&category=${category}&apiKey=${API_KEY}`
  // );
  const response = await fetch(url);
  const data = await response.json(); //json을 파일형식
  newsList = data.articles;
  console.log("news",newsList)
  console.log(("category",category))
  console.log("keyword",keyword)
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

// const filter = (e)=>{
//   console.log("click",e.target.id)
//   mode = e.target.id;
//   getLatestNews();
// }

// 기존코드
// const getNewsByCategory= async (event)=>{
//   const category = event.target.textContent.toLowerCase();
//   console.log("category",category)
//   const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`)
//   const response = await fetch(url);
//   const data = await response.json(); //json을 파일형식
//   console.log("Ddd",data)

//   newsList = data.articles;
//   render()
// }

const getNewsByCategory= async (event)=>{
    keyword =''
    category = event.target.textContent.toLowerCase();
    console.log("category",category)
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`)
    // const response = await fetch(url);
    // const data = await response.json(); //json을 파일형식
    // console.log("Ddd",data)
  
    // newsList = data.articles;
    // render()
    getLatestNews()
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

const searchNews = async ()=>{
  category = '' //어디서 초기화해야할까?
  keyword = document.getElementById("search-input").value
  // console.log("keyword",keyword)
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`)
  // const response = await fetch(url);
  // const data = await response.json(); //json을 파일형식
  // console.log("Ddd",data)

  // newsList = data.articles;
  // render()
  getLatestNews()
}

