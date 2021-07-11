import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogComments from './BlogComments';
import './BlogArticles.css';

function BlogArticles(props) {
  const [fetchArticle, setFetchArticle] = useState([])
  const [queryNum, setQueryNum] = useState(0) //to loaad more articles when click on btn

  //function fetch aricles from server
  useEffect(()=>{
    const mmbr_create_art = sessionStorage.getItem('userData');
    const theQuery = {
      queryNum: queryNum,
      mmbr_create_art: mmbr_create_art
    }
    let isMounted = true; // note mutable flag
      axios.post('http://localhost/ultras/articles/fetchArticle.php', theQuery)
      .then(response => {
        if(isMounted) setFetchArticle(response.data); // add conditional check
      })
      .catch(error => console.log(error))
    return () => {isMounted = false}; // use cleanup to toggle value, if unmounted
  },[fetchArticle, queryNum]);

  //function to create articles
  const outputArticles = fetchArticle.length ? fetchArticle.map((article, index)=>{
    return(
        <div className="article_insection" key={index}>
          <div className="comment_member_data">
            {article.member_img !== '' ? 
            <img src={"http://localhost/ultras/avatar_uploads/"+article.member_img} alt="avatar"/>
            :
            <i className="fa fa-user"></i>
          }
          <span>{article.member_name}</span>
          </div>
          <div className="article_desc">
            <span><small>{article.article_date_add}</small></span>
            <span className="articleTitle">{article.article_title}</span>
          </div>
          <div className="article_overview">
            <p>{article.the_article}</p>
          </div>
          <BlogComments articleID={article.article_unique_id} artLikes={article.likes} />
        </div>
    )
  }) : '' ;

  return (
    <React.Fragment>
      {outputArticles}
      <div className="loadMoreDiv">
        <span className={fetchArticle.length < 5 ? 'd-none' : "loadMoreBtn"} onClick={()=>{setQueryNum(queryNum+5)}}>Load More..</span>
        <span className={queryNum === 0 ? "d-none" : "loadMoreBtn"} onClick={()=>{setQueryNum(0)}}>Show Less..</span>
      </div>
    </React.Fragment>
  );
}

export default BlogArticles;