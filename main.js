const API_KEY =`db9569ed04774c3fb9c5a4d68a5aa546`
let news=[]
const getLatestNews = async ()=>{
    const url = new URL(`https://fastidious-brioche-a7bfc5.netlify.app/top-headlines?`)
    const response = await fetch(url)
    const data = await response.json() //json을 파일형식
    news = data.articles;
    console.log('ddd',news)
}
getLatestNews()

