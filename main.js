const API_KEY =`db9569ed04774c3fb9c5a4d68a5aa546`
let news=[]
const getLatestNews = async ()=>{
    const url = new URL(`https://fastidious-brioche-a7bfc5.netlify.app/v2/top-headlines?q=아이유`)
    
    const response = await fetch(url)
    const data = await response.json() //json을 파일형식
    news = data.articles
    console.log('ddd',news)
}
getLatestNews()

const callAPI = async()=>{
    let url = new URL(`url 주소`)
    let header = new Headers({헤더내용}) // 필요한 경우에만
    let response = await fetch(url,{headers:header})
    let data = await response.json()
}

