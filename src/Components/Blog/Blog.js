import React, { useState, useEffect } from 'react';
import BlogLogin from './BlogLogin/BlogLogin';
import BlogArticles from './BlogArticles/BlogArticles';
import BlogMovies from './BlogMovies/BlogMovies';
import BlogSidebar from './BlogSidebar/BlogSidebar';
import './Blog.css';

function Blog() {
  const [clickedCreateArt, setClickedCreateArt] = useState(false) //show and hide create article form
  const [articleTitle, setarticleTitle] = useState('') //article title
  const [theArticle, setTheArticle] = useState('')  //the article

  //scroll to top of page when component mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  //function empty fields when close article form or cancel
  function emptyFields(){
    setClickedCreateArt(false)
    setarticleTitle('');
    setTheArticle('');
  }

  //submit article when click publish btn in create new post form
  function submitArticleForm(e){
    e.preventDefault()
    const mmbr_create_art = sessionStorage.getItem('userData');
    const alertDiv = document.querySelector('.alert');
    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost/ultras/articles/article.php', true)
    xhr.onload = function(){
      if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
          let data = xhr.response;
          if(data === 'article_published'){
            alertDiv.innerHTML = 'Article Published';
            alertDiv.style.display = 'block';
            alertDiv.classList.remove('error');
            alertDiv.classList.add('success');
            //set the article title and article body to be empty
            setarticleTitle('');
            setTheArticle('');
          }else{
            alertDiv.innerHTML = data;
            alertDiv.style.display = 'block';
            alertDiv.classList.remove('success');
            alertDiv.classList.add('error');
          }
        }
      }
    }
    const articleForm = new FormData()
    articleForm.append('article_title', articleTitle);
    articleForm.append('the_article', theArticle);
    articleForm.append('mmbr_create_art', mmbr_create_art);
    xhr.send(articleForm);
  }

  // function render create new article
  function createArticle(){
    return(
        <form className="article_form form" onSubmit={e => {submitArticleForm(e)}}>
          <span className="close_form" onClick={()=>{emptyFields()}}>x</span>
          {/* submit article messages (erros and success msg) */}
          <div className="alert"></div>
          <input className="article_title" type="text" placeholder="Article Title" value={articleTitle} onChange={e => {setarticleTitle(e.target.value)}} />
          <textarea className="the_article" cols="10" rows="10" placeholder="Your Article" value={theArticle} onChange={e => {setTheArticle(e.target.value)}}></textarea>
          <div className="create_article_btns">
            <button type="submit">Publish</button>
            <button type="button" onClick={()=>{emptyFields()}}>Cancel</button>
          </div>
        </form>
    )
  }

  return (
    <div className="container blog_container">
      <div className="blog_main_content">
        <BlogLogin clickedCreateArt={clickedCreateArt} />
        {/* blog main container */}
        <div className="the_main_blog">
          {/* blog left side */}
          <div className="blog_sections">
            {/* Articless */}
            <div className="articles">
              <div className="sec_header">
              <h2>Ultras Articles</h2>
              <span className={sessionStorage.getItem('userData') === null ? "d-none" : "create_new create_article"}
                    onClick={()=>{setClickedCreateArt(true)}}>Create new Post</span>
              </div>
              <BlogArticles />
            </div>
            {/* Ultras Movies */}
            <BlogMovies />
          </div>  {/* end blog left side (blog sections) */}
          {/* Create Article */}
          {clickedCreateArt ? createArticle() : ''}
          {/* blog side bar */}
          <BlogSidebar />
        </div>
      </div>
    </div>
  );
}

export default Blog;