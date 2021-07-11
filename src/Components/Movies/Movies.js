import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AddMovies from './AddMovies/AddMovies';
import './Movies.css';

function Movies() {
  const [allVideos, setAllVideos] = useState([]);
  const [topTenVideos, setTopTenVideos] = useState([]);

  //scroll to top of page when component mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  //func get topten movies from database
  useEffect(()=>{
    let isMounted = true;
    axios.get('http://localhost/ultras/admin_video/fetchAdminToptenVideo.php')
    .then(response => {
      if(isMounted){ setTopTenVideos(response.data) }
    })
    .catch(error => console.log(error))
    return () => {isMounted = false;}
  }, [topTenVideos])
  const topTenVid = topTenVideos.map((vid,index) => {
    return   <div key={index} className="movie">
              <video controls>
                <source src={"http://localhost/ultras/uploaded_vid/" + vid.video_src} type="video/mp4" />
              </video>
              <div className="video_info">
                <h2>{vid.video_title}</h2>
                <p>{vid.video_desc}</p>
              </div>
            </div>
  })

  //func get all movies from database
  useEffect(()=>{
    let isMounted = true;
    axios.get('http://localhost/ultras/admin_video/fetchAdminVideo.php')
    .then(response => {
      if(isMounted){ setAllVideos(response.data) }
    })
    .catch(error => console.log(error))
    return () => {isMounted = false;}
  }, [allVideos])
  const allVids = allVideos.map((vid,index) => {
    return   <div key={index} className="movie">
              <video controls>
                <source src={"http://localhost/ultras/uploaded_vid/" + vid.video_src} type="video/mp4" />
              </video>
              <div className="video_info">
                <h2>{vid.video_title}</h2>
                <p>{vid.video_desc}</p>
              </div>
            </div>
  })

  return (
    <div className="container movies_container">
      <div className="top_ten_movies">
        <div className="movie_heading">
          <h2>Top 10 Ultras Movies</h2>
        </div>
        <div className="movies_block">
        {topTenVid}
        </div> {/* movie block */}
      </div>  {/* Top ten movies */}
      {/* All movies */}
      <div className="all_movies">
        <div className="movie_heading">
          <h2>All Movies</h2>
        </div>
        <div className="movies_block">
        {allVids}
        </div> {/* movie block */}
      </div>  {/* all movies */}
      {/* Add movies */}
      <AddMovies />
    {/* movie container */}
    </div>  
  );
}

export default Movies;