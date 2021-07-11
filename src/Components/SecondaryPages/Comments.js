import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Comments() {
  const [fetchedCommnts, setFetchedCommnts] = useState([]);

    //function to fetch comments from db
    useEffect(()=>{
      const href = window.location.href;
      const id = href.slice(href.indexOf('=')+1);
      const queryID = {query: id}
      let isMounted = true;
      axios.post("http://localhost/ultras/comments/fetchComments.php", queryID)
      .then(response => {
        if(isMounted){
          setFetchedCommnts(response.data)
        }
      })
      .catch(error => console.log(error))
      return () => { isMounted = false; }
    },[fetchedCommnts])
    const commentsOutput = fetchedCommnts.length ? fetchedCommnts.map((comment,index) => {
      return  <div key={index} className="showAAllComments">
                <div className="comment_data">
                  <div className="comment_member_data">
                    {comment.member_img !=='' ?
                    <img src={"http://localhost/ultras/avatar_uploads/"+comment.member_img} alt="Avatar" />
                    : <i className="fa fa-user"></i>}
                    <span>{comment.member_name}</span>
                  </div>
                  <small>{comment.comment_date}</small>
                  <p className="theCommentParag">{comment.the_comment}</p>
                </div>
              </div>
    }) : <span className="NoComments">No Comments For this Post..</span>

  return (
    <React.Fragment>
      {commentsOutput}
    </React.Fragment>
  );
}

export default Comments;