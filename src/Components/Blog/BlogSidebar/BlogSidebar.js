import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './BlogSidebar.css';

function BlogSidebar() {
  const [statsArticles, setStatsArticles] = useState([]);
  const [statsMembers, setStatsMembers] = useState([]);
  const [numbrOfComments, setNumbrOfComments] = useState([]);
  const [numbrOfLikes, setNumbrOfLikes] = useState(0);

  //function to get statistics articles
  useEffect(()=>{
    let isMounted = true;
    axios("http://localhost/ultras/articles/fetchAllArticle.php")
    .then(response => { 
      if(isMounted){
        setStatsArticles(response.data)
      } 
    })
    .catch(error => console.log(error)) 
    return () => { isMounted = false; }
  }, [statsArticles])

    //function to get statistics members
    useEffect(()=>{
      let isMounted = true;
      axios.post("http://localhost/ultras/members/fetchMembers.php")
      .then(response => { 
        if(isMounted) setStatsMembers(response.data)
      })
      .catch(error => console.log(error))
      return () => { isMounted = false; }
    }, [statsMembers])
    //get members images to show in sidebaar
    const avatars = statsMembers.map((avatar,index) => {
      if(avatar.member_img !== ''){
      return  <React.Fragment key={index}>
                <img src={"http://localhost/ultras/avatar_uploads/"+avatar.member_img} alt='Avatar'/>
              </React.Fragment>
        }
    });

    // get # of comments
    useEffect(()=>{
      let isMounted = true;
      axios("http://localhost/ultras/articles/fetchAllBlogComments.php")
      .then(response => { 
        if(isMounted) setNumbrOfComments(response.data)
      })
      .catch(error => console.log(error))
      return () => { isMounted = false; }
    }, [numbrOfComments])
     // get # of Likes
    useEffect(()=>{
      let isMounted = true;
      axios("http://localhost/ultras/articles/fetchAllBlogLikes.php")
      .then(response => { 
        if(isMounted) setNumbrOfLikes(response.data)
      })
      .catch(error => console.log(error))
      return () => { isMounted = false; }
    }, [numbrOfLikes])

  return (
      <aside className="blog_sidebar">
        <section className="blog_stats">
          <h3 className="stats_title">Statistics</h3>
          <div className="stats_info stats_info_stat">
            <div className="infoblock">
              <i className="fa fa-clipboard"></i>
              <span>{statsArticles.length}</span>
            </div>
            <div className="infoblock">
              <i className="fa fa-heart"></i>
              <span>{numbrOfLikes.likes}</span>
            </div>
            <div className="infoblock">
              <i className="fa fa-comments"></i>
              <span>{numbrOfComments.length}</span>
            </div>
          </div>
        </section>
        <section className="blog_stats">
          <h3 className="stats_title">Members</h3>
          <div className="stats_info">
            <span><span>{statsMembers.length}</span> Member</span>
          </div>
          <div className="members_photos">
          {avatars}
          </div>
        </section>
        <section className="blog_stats">
          <h3 className="stats_title">Social Media</h3>
          <div className="stats_info_socialmedia">
            <a href="https://www.facebook.com"><i className="fa fa-facebook"></i></a>
            <a href="https://www.youtube.com"><i className="fa fa-youtube"></i></a>
            <a href="https://www.instagram.com"><i className="fa fa-instagram"></i></a>
            <a href="https://www.twitter.com"><i className="fa fa-twitter"></i></a>
          </div>
        </section>
      </aside>
  );
}

export default BlogSidebar;