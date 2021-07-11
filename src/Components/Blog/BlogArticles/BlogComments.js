import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BlogComments(props) {
  const [fetchedCommnts, setFetchedCommnts] = useState([]);
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false) //to show aaand hide blog comments
  const [d_noneComnts, setD_noneComnts] = useState(true) //to disply error msg div
  const [errorMsgComnts, setErrorMsgComnts] = useState('') //to disply error msg msg
    
  //function to fetch blog comments from db
  useEffect(()=>{
    const articleID = {articleID: props.articleID}
    let isMounted = true;
    axios.post("http://localhost/ultras/blog_comments/fetchBlogComments.php", articleID)
    .then(response => {
      if(isMounted){
        setFetchedCommnts(response.data)
      }
    })
    .catch(error => console.log(error))
    return () => { isMounted = false; }
  },[fetchedCommnts, props.articleID])
  const commentsOutput = fetchedCommnts.length ? fetchedCommnts.map((comment,index) => {
    return  <div key={index} className="showAllArtComments">
              <div>
                <div className="comment_member_data">
                  {comment.member_img !=='' ?
                  <img src={"http://localhost/ultras/avatar_uploads/"+comment.member_img} alt="Avatar" />
                  : <i className="fa fa-user"></i>}
                  <span>{comment.member_name}</span>
                </div>
                <small className="comntBlogDate">{comment.comment_date}</small>
                <p className="theCommentBlogArt">{comment.the_comment}</p>
              </div>
            </div>
  }) : <span className="NoComments m-auto">No Comments For this Article..</span>

  // function aadd comments to db
  function sendCommentsToDB(e){
    e.preventDefault()
    const memberCommented = sessionStorage.getItem('userData');
    const formdata = new FormData()
    formdata.append('comment', comment)
    formdata.append('articleID', props.articleID)
    formdata.append('memberCommented', memberCommented)
    axios.post("http://localhost/ultras/blog_comments/addBlogComments.php", formdata )
    .then(response => {
      if(response.data === 'comment_added'){
        setComment('');
        setD_noneComnts(true);
        setErrorMsgComnts('');
      }else{
        setErrorMsgComnts(response.data);
        setD_noneComnts(false);
      }
    })
    .catch(error => console.log(error))
  }

  //function to add likes to db
  function addLikes(){
    const artIDToLike = {artIDToLike: props.articleID};
    axios.post('http://localhost/ultras/articles/addLikes.php', artIDToLike)
    .then(response => null)
    .catch(error => console.log(error))
  }

  return (
    <React.Fragment>
      <div className="article_info">
        <div className="artInfo_spns">
          <span onClick={()=>{addLikes()}}><i className="fa fa-heart"></i> {props.artLikes}</span>
          <span><i className="fa fa-comment" onClick={()=>{setShowComments(!showComments)}}></i> {fetchedCommnts.length}</span>
        </div>
        <span className="showBlogComBtn" onClick={()=>{setShowComments(!showComments)}}>Comments</span>
      </div>
      <div className={showComments ? '' : 'd-none'}>
        {commentsOutput}
        <form className="comments_art_form" method='POST' onSubmit={e=>sendCommentsToDB(e)}>
          {/* errors when add comment */}
          <div className={d_noneComnts ? "d-none" : "comments_errors_cont d-flex"}>
            <span onClick={()=>{setD_noneComnts(true)}}>x</span>
            <div className="comments_errors">{errorMsgComnts}</div>
          </div>
          {/* errors when add comment */}
          <textarea type="text" rows="5" cols="5" placeholder="Your Comment.." value={comment} onChange={e =>{setComment(e.target.value)}}></textarea>
          <div>
            <button type="submit">Comment</button>
            <span className="closeBlogCmnts" onClick={()=>{setShowComments(false)}}>Close Comments</span>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default BlogComments;