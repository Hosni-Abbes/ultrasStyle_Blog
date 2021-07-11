import React, { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

function FromCountry() {
const [datas, setDatas] = useState([]);

  //scroll to top of page when component mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  //function to get data from db using adressbar query
  useEffect(()=>{
    let isMounted = true;
    const href = window.location.href;
    const id = href.slice(href.indexOf('=')+1);
    const queryID = {query:id}
    axios.post('http://localhost/ultras/supPages/fetchAdminDataByCountry.php', queryID)
    .then(response => {
      if(isMounted){
        setDatas(response.data)
      }
    })
    .catch(error => console.log(error))
    return () => { isMounted = false; }
  },[datas])
  const theOutputFromDBIMG = datas.length ?  datas.map((data,index) => {
    return data.image_id.length ? <div key={index} className="gallery">
              <h2 className="gallery_title">{data.image_title}</h2>
              <div className="gallery_img">
                <img src={"http://localhost/ultras/uploaded_img/" + data.image_src.split(',')[0]} alt="Album" />
              </div>
              <div className="gallery_info">
                <span><small>Published: {data.date}</small></span>
                <NavLink to={"album?id="+data.image_unique_id} className="gallery_btn">Read More..</NavLink>
              </div>
            </div>
            : ''
  }) 
    :  <div className="page_not_Exist">
          <p>No Photos Yet For This Country.</p>
        </div>

const theOutputFromDBART = datas.length ?  datas.map((data,index) => {
  return  data.article_id ? <section className="home_section" key={index}>
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
              <small className="sec_likes"><i className="fa fa-heart"></i> {data.likes}</small>
              <NavLink to={"article?id="+data.article_unique_id} className="sec_btn">Read more</NavLink>
            </div>
          </section>
            : ''
}) 
  :  <div className="page_not_Exist">
        <p>No Articles Yet For This Country.</p>
      </div>

const theOutputFromDBVID = datas.length ?  datas.map((data,index) => {
  return  data.video_id.length ? <div key={index} className="movie supMovie">
            <video controls>
              <source src={"http://localhost/ultras/uploaded_vid/" + data.video_src} type="video/mp4" />
            </video>
            <div className="video_info">
              <h2>{data.video_title}</h2>
              <p>{data.video_desc}</p>
            </div>
          </div>
            : ''
}) 
  :  <div className="page_not_Exist">
        <p>No Videos Yet For This Country.</p>
      </div>

  return (
    <div className="container supPageArt">
      <div className="first_up_supPage">
        <span className="supSpan">Articles</span>
        <div className="first_up_supArt">
          {theOutputFromDBART}
        </div>
        <span className="supSpan">Images</span>
        <div className="first_up_supImg">
          {theOutputFromDBIMG}
        </div>
        <span className="supSpan">Videos</span>
        <div className="first_up_supVid">
          {theOutputFromDBVID}
        </div>
      </div>
    </div>
  );
}

export default FromCountry;