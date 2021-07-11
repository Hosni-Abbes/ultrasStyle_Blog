import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FetchMovies() {
  const [fetchVideo, setFetchVideo] = useState([])

  //function fetch videos from database
  useEffect(()=>{
    let isMounted = true;
      axios.get('http://localhost/ultras/videos/fetchVideo.php')
      .then(response => {
        if(isMounted) setFetchVideo(response.data);
      })
      .catch(error => { console.log(error)})
    return () => {isMounted = false;};
  },[fetchVideo])

  //function output data 
  const outputVideos = fetchVideo.length ? fetchVideo.map((video, index)=>{
    return (
      <div key={index} className="movie">
      <video controls>
        <source src={"http://localhost/ultras/uploaded/" + video.the_media} type="video/mp4" />
        <source src={"http://localhost/ultras/uploaded/" + video.the_media} type="video/x-flv" />
        <source src={"http://localhost/ultras/uploaded/" + video.the_media} type="video/MP2T" />
        <source src={"http://localhost/ultras/uploaded/" + video.the_media} type="video/3gpp" />
        <source src={"http://localhost/ultras/uploaded/" + video.the_media} type="video/quicktime" />
        <source src={"http://localhost/ultras/uploaded/" + video.the_media} type="video/x-msvideo" />
        <source src={"http://localhost/ultras/uploaded/" + video.the_media} type="video/x-ms-wmv" />
        Your Browser Does not Support Videos.
      </video>
      <div className="video_info">
        <h2>{video.media_title}</h2>
        <small>{video.media_date_aded}</small>
        <p>{video.media_description}</p>
      </div>
    </div>
    )
  }) : <span className="blogVid_noVid">No Videos Yet. Login and Share Your First Video.</span> ;

  return (
    <div className="blog_videos_cont">
      {/* Output the result */}
      {outputVideos}
    </div>
  );
}

export default FetchMovies;