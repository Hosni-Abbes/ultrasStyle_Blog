import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import SIDE_BAR_SEARCH from './Side_Bar_Search';
import './Home_Main_Content.css';

function HOME_MAIN_CONTENT() {
  const [datas, setDatas] = useState([]);
  const [query, setQuery] = useState(0)
  const[allArticles, setAllArticles] = useState([])
  const [pages, setPages] = useState(0)
  const [bullets, setBullets] = useState([])
  const [searchWord, setSearchWord] = useState('')  //to set search input value in home sidebar 

  //scroll to top of page when component mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  //function get all articles from db
  useEffect(()=>{
    let isMounted = true;
    axios('http://localhost/ultras/admin_articles/fetchAllAdminArticles.php')
    .then(response => {
      if(isMounted) {
        setAllArticles(response.data)
        setPages(Math.ceil(response.data.length/10))
      }
    })
    return () => { isMounted = false; }
  },[allArticles])

  // function to fetch data from database
  useEffect(()=>{
    let isMounted = true;
    let queryData = {query: query}
    axios.post('http://localhost/ultras/admin_articles/fetchAdminArticles.php', queryData)
    .then(response => {
      if(isMounted) setDatas(response.data
    )})
    .catch(error => console.log(error))
    return () => { isMounted = false; }
  },[datas, query]);
  let theOutpus = datas.map((data,index)=>{
    return  <section className="home_section" key={index}>
              <div className="sec_img">
              {data.article_imgs.split(',')[0].slice(data.article_imgs.split(',')[0].indexOf('.')+1) === 'jpg' ? 
                  <img src={"http://localhost/ultras/uploaded_art/"+data.article_imgs.split(',')[0]} alt="Album" />
                  : data.article_imgs.split(',')[0].slice(data.article_imgs.split(',')[0].indexOf('.')+1) === 'jpeg' ?
                  <img src={"http://localhost/ultras/uploaded_art/"+data.article_imgs.split(',')[0]} alt="Album" />
                  : data.article_imgs.split(',')[0].slice(data.article_imgs.split(',')[0].indexOf('.')+1) === 'png' ?
                  <img src={"http://localhost/ultras/uploaded_art/"+data.article_imgs.split(',')[0]} alt="Album" />
                  : <video controls> <source src={"http://localhost/ultras/uploaded_art/"+data.article_imgs.split(',')[0]}/> </video>
              }
              </div>
              <div className="sec_description">
                <h2 className="desc_title">{data.article_title}</h2>
                <small className="desc_date">{data.date}</small>
                <span className="desc_town">{data.place_town}</span>
              </div>
              <div className="sec_readmore">
                <small className="sec_likes" onClick={(e)=>{addLikes(e)}}><i className="fa fa-heart"></i> {data.likes}</small>
                <NavLink to={"article?id="+data.article_unique_id} className="sec_btn">Read more</NavLink>
              </div>
            </section>
  })

  //add likes to databese when click on like btn
  function addLikes(e){
    const clicked = e.target.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.firstElementChild.textContent
    const clickLike = {isClicked: clicked};
    axios.post('http://localhost/ultras/addLikes/addLikes.php', clickLike)
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
  }

  // function to create bullets
  useEffect(()=>{
    let ar=[]
    for(let i=0;i<pages*10;i+=10){
      ar.push(i)
    }
    setBullets(ar)
  },[pages])
  let bull = bullets.map((bullet,index)=>{
  return  <React.Fragment key={index}>
            <span onClick={()=>{setQuery(bullet); window.scrollTo(0, 0)}}>{index+1}</span>
          </React.Fragment>
  })

  return (
    <div> {/* the cntnt*/}
      {/* Home new */}
      <div className="news">
          {allArticles.length ? 
          <div className="news_titles">
            <NavLink to={"article?id="+allArticles[0]['article_unique_id']}>{allArticles[0]['article_title']}</NavLink>
            <NavLink to={"article?id="+allArticles[1]['article_unique_id']}>{allArticles[1]['article_title']}</NavLink>
            <NavLink to={"article?id="+allArticles[2]['article_unique_id']}>{allArticles[2]['article_title']}</NavLink>
            <NavLink to={"article?id="+allArticles[3]['article_unique_id']}>{allArticles[3]['article_title']}</NavLink>
          </div>
          : null } 
      </div>
      <div className="home_main_content">
        <div className="home_content">
          <div className="home_content_sections">
          {/* the data maped */}
          {theOutpus}
          </div>
          {/* bullets aand controls */}
          <div className="gallery_controls">
            <span className={query === 0 ? 'displayCursor' : null} onClick={()=>setQuery(query-10)}>Prev</span>
            {bull}
            <span className={allArticles.length >=  (query+10) ? null : 'displayCursor'} onClick={()=>setQuery(query+10)}>Next</span>
          </div>
        </div>
        <aside>
          <div className="search_form">
            <input type="search" placeholder="Search" value={searchWord} onChange={(e)=>{setSearchWord(e.target.value)}} />
            <SIDE_BAR_SEARCH searchWord={searchWord} />
          </div>
        
          <div className="movies_block videos_country">
            <p>Filter by countries..</p>
            <NavLink to="country?cn=africa">AFRICA</NavLink>
            <NavLink to="country?cn=albania">ALBANIA</NavLink>
            <NavLink to="country?cn=asia">ASIA</NavLink>
            <NavLink to="country?cn=austria">AUSTRIA</NavLink>
            <NavLink to="country?cn=baltic-countries">BALTIC COUNTRIES</NavLink>
            <NavLink to="country?cn=belgium">BELGIUM</NavLink>
            <NavLink to="country?cn=bosnia-herzegovina">BOSNIA & HERZEGOVINA</NavLink>
            <NavLink to="country?cn=bulgaria">BULGARIA</NavLink>
            <NavLink to="country?cn=croatia">CROATIA</NavLink>
            <NavLink to="country?cn=cyprus">CYPRUS</NavLink>
            <NavLink to="country?cn=czech">CZECH</NavLink>
            <NavLink to="country?cn=france">FRANCE</NavLink>
            <NavLink to="country?cn=germany">GERMANY</NavLink>
            <NavLink to="country?cn=great-britain">GREAT BRITAIN</NavLink>
            <NavLink to="country?cn=greece">GREECE</NavLink>
            <NavLink to="country?cn=holland">HOLLAND</NavLink>
            <NavLink to="country?cn=hungary">HUNGARY</NavLink>
            <NavLink to="country?cn=italy">ITALY</NavLink>
            <NavLink to="country?cn=ireland">IRELAND</NavLink>
            <NavLink to="country?cn=montenegro">MONTENEGRO</NavLink>
            <NavLink to="country?cn=north-macedonia">NORTH MACEDONIA</NavLink>
            <NavLink to="country?cn=oceania">OCEANIA</NavLink>
            <NavLink to="country?cn=other-countries">OTHER COUNTRIES</NavLink>
            <NavLink to="country?cn=poland">POLAND</NavLink>
            <NavLink to="country?cn=portugal">PORTUGAL</NavLink>
            <NavLink to="country?cn=romania">ROMANIA</NavLink>
            <NavLink to="country?cn=russia">RUSSIA</NavLink>
            <NavLink to="country?cn=belarus">BELARUS</NavLink>
            <NavLink to="country?cn=scandinavia">SCANDINAVIA</NavLink>
            <NavLink to="country?cn=serbia">SERBIA</NavLink>
            <NavLink to="country?cn=slovakia">SLOVAKIA</NavLink>
            <NavLink to="country?cn=spain">SPAIN</NavLink>
            <NavLink to="country?cn=south-america">SOUTH AMERICA</NavLink>
            <NavLink to="country?cn=switzerland">SWITZERLAND</NavLink>
            <NavLink to="country?cn=turkey">TURKEY</NavLink>
            <NavLink to="country?cn=ukraine">UKRAINE</NavLink>
          </div>
        </aside>
      </div>
    </div> 
    // the cntnt 
  );
}

export default HOME_MAIN_CONTENT;