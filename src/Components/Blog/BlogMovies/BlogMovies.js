import React, { useState } from 'react';
import FetchMovies from './FetchMovies';
import './BlogMovies.css';

function BlogMovies(props) {
  const [clickAddVideo, setClickAddVideo] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');   //set the title of video
  const [videoDesc, setVideoDesc] = useState('');   //describe your video
  const [videoFile, setVideoFile] = useState('');   //add your video file
  
  //function to empty form inputs when close form or cancel
  function emptyFields(){
    setClickAddVideo(false)
    setVideoTitle('');
    setVideoDesc('');
    setVideoFile('');
  }

  //function handle submit form to db
  function handleSubmitVideo(e){
    e.preventDefault()
    const alertDiv = document.querySelector('.alert');
    //make xhtml request
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost/ultras/videos/video.php', true)
    xhr.onload = function(){
      if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
          let data = xhr.response
          console.log(data)
          if(data === 'video_uploaded'){
            alertDiv.innerHTML = 'Video Published';
            alertDiv.style.display = 'block';
            alertDiv.classList.remove('error');
            alertDiv.classList.add('success');
            setVideoTitle('');
            setVideoDesc('');
            setVideoFile('');
          }else{
            alertDiv.innerHTML = data;
            alertDiv.style.display = 'block';
            alertDiv.classList.remove('success');
            alertDiv.classList.add('error');
          }
        }
      }
    }
    const form = document.querySelector('.add_video_form');
    const videoForm = new FormData(form)
    xhr.send(videoForm);
  }

  //function render form add videos
  function addVideos(){
    return <form className="form add_video_form" method="POST" encType="multipart/form-data" onSubmit={(e)=>{handleSubmitVideo(e)}}>
        <span className="close_form" onClick={()=>{emptyFields()}}>x</span>
        {/* submit article messages (erros and success msg) */}
        <div className="alert"></div>
        <input type="text" placeholder="Video Title" name="video_title" value={videoTitle} onChange={e => {setVideoTitle(e.target.value)}} />
        <textarea type="text" cols="10" rows="10" name="video_desc" value={videoDesc} placeholder="Video Description" onChange={e => {setVideoDesc(e.target.value)}}></textarea>
        <label className="the_file" htmlFor="video">
          <input type="file" id="video" className="video" name="video_file" onChange={e => {setVideoFile(e.target.value)}} />
          <span className="add_video_file">
            {videoFile ? videoFile : "Add Video"}
          </span><i className="fa fa-upload"></i>
        </label>
        <div className="article_form">
          <button type="submit">Publish</button>
          <button type="button" onClick={()=>{emptyFields()}}>Cancel</button>
        </div>
    </form>
  }

  return (
    <div className="utras_movies">
      <div className="sec_header">
      <h2>Ultras Best Videos</h2>
      <span className={sessionStorage.getItem('userData') === null ? "d-none" : "create_new"} 
            onClick={()=>{setClickAddVideo(true)}}>Add Videos</span>
      </div>
      {/* add video form */}
      {clickAddVideo ? addVideos() : ''}
      {/* Fetch Movies */}
      < FetchMovies/>
    </div>
  );
}

export default BlogMovies;