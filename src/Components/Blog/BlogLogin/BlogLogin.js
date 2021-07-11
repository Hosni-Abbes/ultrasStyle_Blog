import React, {useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import './BlogLogin.css';

function BlogLogin(props) {
  const [clickedBtn, setClickedBtn] = useState('');

  // disable scroll when writing new article
  // disable scroll when login or signup
  if(clickedBtn !== '' || props.clickedCreateArt === true){
    document.body.style.overflow = 'hidden';
  }else{
    document.body.style.overflow = 'scroll';
  }
  
  function loginBlog(){
    //render login form
    if(clickedBtn === 'LOGIN'){
      return (
      // loginform
      <Login setClickedBtn={setClickedBtn} />
      )
    }else if(clickedBtn === 'SIGNUP'){
      return (
      // signupform
      <Signup setClickedBtn={setClickedBtn} />
      )
    }else{
      return null;
    }
  }

  return (
    <div className={sessionStorage.getItem('userData') === null ? "join_section" : "d-none"}>
      <h2 className="login_heading">LogIn or Join Us</h2>
      <div className="login_text">
        <p>Welcome to our blog, Comment and share your best photos, videos, articles with our members</p>
        <p>Login or Join us if you are not yet.</p>
      </div>
      <div className="login_btns">
        <button onClick={()=>{setClickedBtn('LOGIN')}}>Login</button>
        <button onClick={()=>{setClickedBtn('SIGNUP')}}>Sign up</button>
      </div>     
      {/* loginform */}
      {loginBlog()}
    </div>
  );
}

export default BlogLogin;