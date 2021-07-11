import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Comments from './Comments';
import './SecondaryPages.css';

function FromHome() {
  const [datas, setDatas] = useState([]);
  const [latestArt, setLatestArt] = useState([]); // toget latest articles
  const [comment, setComment] = useState('')  //to send comments to db
  const [d_noneErrMsg, setD_noneErrMsg] = useState(true) //to disply error msg div
  const [errorMsgMsg, setErrorMsgMsg] = useState('') //to disply error msg msg
  const href = window.location.href;
  const id = href.slice(href.indexOf('=')+1);
  
  //scroll to top of page when component mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  //function to get data from db using adressbar query
  useEffect(()=>{
    const queryID = {query:id}
    let isMounted = true;
    axios.post('http://localhost/ultras/supPages/fetchAdminArtSupPG.php', queryID)
    .then(response => {
      if(isMounted){
        setDatas(response.data)
      }
    })
    .catch(error => console.log(error))
    return () => { isMounted = false; }
  },[datas,id])

  const theOutputFromDB = datas.length ? datas.map((data,index) => {
    return    <div key={index} className="the_1main_cont">
                <p className="the_sup_title">{data.article_title}</p>
                <small>Published: {data.date}</small>
                <p className="the_sup_desc">{data.article_desc}</p>
                <div className="the_sup_images">
                  {data.article_imgs.split(',').map((image,index)=>{
                    return <div key={index} className="art_sup_media">
                      {image.slice(image.indexOf('.')+1) === 'jpg' ? <img src={"http://localhost/ultras/uploaded_art/"+image} alt="Album" />
                        : image.slice(image.indexOf('.')+1) === 'jpeg' ? <img src={"http://localhost/ultras/uploaded_art/"+image} alt="Album" />
                        : image.slice(image.indexOf('.')+1) === 'png' ? <img src={"http://localhost/ultras/uploaded_art/"+image} alt="Album" />
                        : <video controls> <source src={"http://localhost/ultras/uploaded_art/"+image}/> </video>
                      }
                    </div>
                  })}
                </div>
              </div>
  }) :  <div className="page_not_Exist">
          <p>This Page IS Not Exist!</p>
          <p>Article Not Found.</p>
        </div>

  //function get latest articles from db
  useEffect(()=>{
    let isMounted = true;
    axios('http://localhost/ultras/admin_articles/fetchAllAdminArticles.php')
    .then(response => {
      if(isMounted){
        setLatestArt(response.data)
      }
    })
    .catch(error => console.log(error))
    return () => { isMounted = false; }
  },[latestArt])

  let latestArticles = latestArt.slice(latestArt.length-5, latestArt.length-1).map((image,index) => {
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

  // function aadd comments to db
  function sendCommentsToDB(e){
    e.preventDefault()
    const memberCommented = sessionStorage.getItem('userData');
    const formdata = new FormData()
    formdata.append('comment', comment)
    formdata.append('pageID', id)
    formdata.append('memberCommented', memberCommented)
    axios.post("http://localhost/ultras/comments/addComments.php", formdata )
    .then(response => {
      if(response.data === 'comment_added'){
        setComment('');
        setD_noneErrMsg(true);
        setErrorMsgMsg('');
      }else{
        document.querySelector('.comments_errors').innerHTML = response.data;
        setD_noneErrMsg(false);
      }
    })
    .catch(error => console.log(error))
  }

  return (
    <div className="container supPageArt">
      <div className="first_up">
        {theOutputFromDB}
        <aside>
          <p>Folllow US</p>
          <div>
            <a href="https://www.facebook.com"><i className="fa fa-facebook"></i></a>
            <a href="https://www.youtube.com"><i className="fa fa-youtube"></i></a>
            <a href="https://www.instagram.com"><i className="fa fa-instagram"></i></a>
          </div>
        </aside>
      </div>
      {/* comments */}
      <div className="the_comments">
        <p className="comments_allP">All Comments</p>
        <div className="comment_scroll"><Comments /></div>
        {/* errors when add comment */}
        <div className={d_noneErrMsg ? "d-none" : "comments_errors_cont d-flex"}>
          <span onClick={()=>{setD_noneErrMsg(true)}}>x</span>
          <div className="comments_errors">{errorMsgMsg}</div>
        </div>
        {/* errors when add comment */}
        <form method='POST' onSubmit={e=>sendCommentsToDB(e)}>
          <textarea type="text" cols="5" rows="5" placeholder="Add Your Comment" value={comment} onChange={e =>{setComment(e.target.value)}}></textarea>
          <div><button type="submit">Comment</button></div>
        </form>
      </div> 
      {/* end comments */}
      {/* Newest articles */}
      <div className="newest_photos">
        {latestArticles}
      </div> {/* Newest articles */}
    </div>
  );
}

export default FromHome;