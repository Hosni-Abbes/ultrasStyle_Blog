import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Gallery.css';

function Photos() {
  const [imagesFromDB, setImagesFromDB] = useState([]);
  const [latestArt, setLatestArt] = useState([]);
  const [query, setQuery] = useState(0)
  const[allImg, setAllImg] = useState(0)
  const [pages, setPages] = useState(0)
  const [bullets, setBullets] = useState([])

  //scroll to top of page when component mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  //function get all images from db
  useEffect(()=>{
    let isMounted = true;
    axios('http://localhost/ultras/admin_images/AllAdminImg.php')
    .then(response => {
      if(isMounted) {
        setAllImg(response.data.length)
        setPages(Math.ceil(response.data.length/10))
      }
    })
    return () => { isMounted = false; }
  },[allImg])

  //function get images from db
  useEffect(()=>{
    let isMounted = true;
    let queryData = {query: query}
    axios.post('http://localhost/ultras/admin_images/fetchAdminImages.php', queryData)
    .then(response => {
      if(isMounted) setImagesFromDB(response.data)
    })
    .catch(error => console.log(error))
    return () => { isMounted = false; }
  },[imagesFromDB,query])
  let allImages = imagesFromDB.map((image,index) => {
    return  <div key={index} className="gallery">
              <h2 className="gallery_title">{image.image_title}</h2>
              <div className="gallery_img">
                <img src={"http://localhost/ultras/uploaded_img/" + image.image_src.split(',')[0]} alt="Album" />
              </div>
              <div className="gallery_info">
                <span><small>Published: {image.date}</small></span>
                <NavLink to={"album?id="+image.image_unique_id} className="gallery_btn">Read More..</NavLink>
              </div>
            </div>
  })

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

  //function get latest articles from db
  useEffect(()=>{
    let isMounted = true;
    axios.get('http://localhost/ultras/admin_articles/fetchAllAdminArticles.php')
    .then(response => {
      if(isMounted){
        setLatestArt(response.data)
      }
    })
    return () => { isMounted = false; }
  },[latestArt])
  let latestArticles = latestArt.slice(latestArt.length - 5, latestArt.length-1).map((image,index) => {
    return  <div key={index} className="new_gallery">
              <NavLink to={"article?id="+image.article_unique_id}>
              <div>
              {image.article_imgs.split(',')[0].slice(image.article_imgs.split(',')[0].indexOf('.')+1) === 'jpg' ? 
                  <img src={"http://localhost/ultras/uploaded_art/"+image.article_imgs.split(',')[0]} alt="Album" />
                  : image.article_imgs.split(',')[0].slice(image.article_imgs.split(',')[0].indexOf('.')+1) === 'jpeg' ?
                  <img src={"http://localhost/ultras/uploaded_art/"+image.article_imgs.split(',')[0]} alt="Album" />
                  : image.article_imgs.split(',')[0].slice(image.article_imgs.split(',')[0].indexOf('.')+1) === 'png' ?
                  <img src={"http://localhost/ultras/uploaded_art/"+image.article_imgs.split(',')[0]} alt="Album" />
                  : <video controls> <source src={"http://localhost/ultras/uploaded_art/"+image.article_imgs.split(',')[0]}/> </video>
              }
              </div>
              
              <h2>{image.article_title}</h2>
              </NavLink>
            </div>
  })

  return (
    <div className="container gallery_container">
      {/* galery main content */}
      <div className="gallery_main_content">
      {allImages}
      </div>
        {/* bullets aand controls */}
        <div className="gallery_controls">
          <span className={query === 0 ? 'displayCursor' : null} onClick={()=>setQuery(query-10)}>Prev</span>
          {bull}
          <span className={allImg >=  (query+10) ? null : 'displayCursor'} onClick={()=>setQuery(query+10)}>Next</span>
        </div>
      {/* Newest photos */}
      <div className="newest_photos">
        {latestArticles}
      </div> {/* Newest photos */}
    </div>
  );
}

export default Photos;