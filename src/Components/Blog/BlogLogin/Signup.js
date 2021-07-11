import React, { useState } from 'react';

function Signup(props) {
  const [signupForm, setSignupForm] = useState({
    username:'',
    email: '',
    password:'',
    avatar:''
  });

  // function submit form
  function submitForm(e){
    e.preventDefault();
    const alertDiv = document.querySelector('.alert');
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost/ultras/signup/signup.php', true)
    xhr.onload=function(){
      if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
          let data = xhr.response;
          if(data === 'success_signup'){
            alertDiv.innerHTML = 'Success SignUp';
            alertDiv.style.display = 'block';
            alertDiv.classList.remove('error');
            alertDiv.classList.add('success');
            //set sessionStorage
            sessionStorage.setItem('userData', signupForm.username);
            setTimeout(function(){window.location.reload()},1500);
          }else{
            alertDiv.innerHTML = data;
            alertDiv.style.display = 'block';
            alertDiv.classList.remove('success');
            alertDiv.classList.add('error');
          }
        }
      }
    }
    const form = document.querySelector('.login_form');
    const signupFormData = new FormData(form);
    xhr.send(signupFormData);
  }

  return (
    // signupform
    <form className="login_form form" method='POST' onSubmit={e => submitForm(e)}>
      <h2 className="form_heading">SignUp</h2>
      <span className="close_form" onClick={()=>{props.setClickedBtn('')}}>x</span>
      {/* submit article messages (erros and success msg) */}
      <div className="alert"></div>
      <input type="text" placeholder="Username" name="username" value={signupForm.username} onChange={e => setSignupForm({...signupForm, username: e.target.value})} />
      <input type="text" placeholder="Email" name="email" value={signupForm.email} onChange={e => setSignupForm({...signupForm, email: e.target.value})} />
      <input type="password" placeholder="Password" name="password" value={signupForm.password} onChange={e => setSignupForm({...signupForm, password: e.target.value})} />
      <input id ="avatar_file" className="avatar_file" type="file" name="avatar" value={signupForm.avatar} onChange={e => setSignupForm({...signupForm, avatar: e.target.value})} />
      <label className="login_avatar" htmlFor="avatar_file">
        <span>{signupForm.avatar ? signupForm.avatar : "Add Profile Avatar"}</span>
        <i className="fa fa-upload"></i>
      </label>
      <div className="form_btns">
        <button type="submit">Sign Up</button>
        <span className="swich_login">Already have an account? <span className="click_tosignup" onClick={()=>{props.setClickedBtn('LOGIN')}}><u>LogIn Now</u></span></span>
      </div>
    </form>
  );
}

export default Signup;