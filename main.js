//1. 버튼들에 클릭이벤트주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기

const API_KEY = `db9569ed04774c3fb9c5a4d68a5aa546`;
let searchInput = document.getElementById("search-input")
//let url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`); // 기존 API
let url = new URL(`https://fastidious-brioche-a7bfc5.netlify.app/top-headlines?&country=kr`); //누나 API

let inputArea = document.getElementById("input-area");
let searchIcon = document.getElementById("search-icon")
const menus = document.querySelectorAll(".menus button")
const sideMenus = document.querySelectorAll(".side-menu-list button")
let newsList = [];

let totalResults = 0
let page = 1
const pageSize = 10
const groupSize= 5



//메뉴 동작
menus.forEach(menu=>
  menu.addEventListener("click",(event)=>getNewsByCategory(event))
)

sideMenus.forEach(menu=>
  menu.addEventListener("click",(event)=>getNewsByCategory(event))
)

//엔터로 검색하기 기능
searchInput.addEventListener("keypress",(event)=>{
  if (window.event.keyCode == 13) {
    searchNews()
  }
})


const getNews = async ()=>{
  try{
    url.searchParams.set("page",page) // =>&page=page
    url.searchParams.set("pageSize",pageSize)

    const response = await fetch(url);
    const data = await response.json(); //json을 파일형식
    if(response.status===200){
      if(data.articles.length===0){
        throw new Error("No result for this search")
      }
      newsList = data.articles;
      totalResults = data.totalResults
      console.log("newsList",newsList)
      console.log(data)
      render()
      paginationRender()
    }
    else{
      throw new Error(data.message)
    }
  }catch(error){
    console.log("error",error.message)
    errorRender(error.message)
  }
 
}



const getLatestNews = async () => {
  //url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`) //기존 API
  url = new URL(`https://fastidious-brioche-a7bfc5.netlify.app/top-headlines?&country=kr`); //누나 API
  getNews()
};

getLatestNews();

//오류 이미지가 나왔을 때 해결방법
const imgError = (image) => {
	image.onerror = null; // 이미지 에러 핸들러를 중복 호출하지 않도록 이벤트 리스너를 제거합니다.
	image.src = "https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227724992-stock-illustration-image-available-icon-flat-vector.jpg";
};




const render = () => {
  
    const newsHTML = newsList.map(
      (news) => 
      `<div class="row news"> 
      <div class="col-lg-4">
          <img class="news-img-size"src="${news.urlToImage}"alt="뉴스 이미지" class="news-img-size" onerror="imgError(this)">
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
    searchInput.value='' //검색어 초기화
    inputArea.style.display = "";
    searchIcon.style.display = "flex";
};

const errorRender=(errorMessage)=>{
  const errorHTML = `<div class="alert alert-danger text-center" role="alert">
  ${errorMessage}
</div>`
document.getElementById("news-board").innerHTML = errorHTML;
searchInput.value='' //검색어 초기화
}


const getNewsByCategory= async (event)=>{
  page = 1;
  const category = event.target.textContent.toLowerCase();
  //url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`) //기존 API
  url = new URL(`https://fastidious-brioche-a7bfc5.netlify.app/top-headlines?&country=kr&category=${category}`); //누나 API
  getNews(); //코드 리펙토리
}

const searchNews = async ()=>{
  if(searchInput.value=="")
    {
        alert("검색어를 입력해주세요.");
        return;W
    }
  keyword = document.getElementById("search-input").value
  //url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`) //기존 API
  url = new URL(`https://fastidious-brioche-a7bfc5.netlify.app/top-headlines?&country=kr&q=${keyword}`); //누나 API
  getNews(); //코드 리펙토리
}

const paginationRender=()=>{
  // totalResult,
  // page
  // pageSize
  // groupSize
  //totalPages
  const totalPages = Math.ceil(totalResults/pageSize) //totalPages = 20
  // pageGroup
  let pageGroup = Math.ceil(page/groupSize);
  // lastPage
  let lastPage = pageGroup*groupSize;
// 마지막 페이지그룹이 그룹사이즈보다 작다? lastpage = totalpage
if(lastPage>totalPages){
  lastPage=totalPages
}
  console.log("lastPage",lastPage )

  // firstPage
  const firstPage = (lastPage-(groupSize-1))<=0?1:lastPage-(groupSize-1);

  let paginationHTML=''
  if(pageGroup!==1){ //첫번째 페이지
    paginationHTML+= `<li class="page-item" onclick="MoveToPrePage(${lastPage})"><a class="page-link"><</a></li>`
  }
  for(let i=firstPage;i<=lastPage;i++){
    paginationHTML+= `<li class="page-item ${i===page?"active":''}" onclick="MoveToPage(${i})"><a class="page-link">${i}</a></li>`
  }

  if(pageGroup!==Math.ceil(totalPages/groupSize))
    {paginationHTML+= `<li class="page-item" onclick="MoveToNextPage(${firstPage})"><a class="page-link">></a></li>`
  }

  document.querySelector(".pagination").innerHTML=paginationHTML
}

const MoveToPage=(pageNum)=>{
  console.log("movetopage",pageNum)
  page = pageNum;
  getNews()
}

const MoveToNextPage=(firstPage)=>{
  page = firstPage + groupSize
  console.log("page",page)
  getNews()
}

const MoveToPrePage=(lastPage)=>{
  page = lastPage - groupSize
  console.log("page",page)
  getNews()
}




const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
console.log(inputArea.style.display)
  if (inputArea.style.display === "") {
    inputArea.style.display = "flex";
    searchIcon.style.display = "none";
  }

};

// if (inputArea.style.display === "flex") {
//   inputArea.style.display = "none";
// } else {
//   inputArea.style.display = "flex";
// }

{/* <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav> */}