import React, {useState} from 'react';

function Login(props) {
  const [loginForm, setLoginForm] = useState({
    username:'',
    password: ''
  });

  // function submit form
  function submitForm(e){
    e.preventDefault();
    const alertDiv = document.querySelector('.alert');
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost/ultras/login/login.php', true)
    xhr.onload=function(){
      if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
          let data = xhr.response;
          if(data === 'success_login'){
            alertDiv.innerHTML = 'Success Login';
            alertDiv.style.display = 'block';
            alertDiv.classList.remove('error');
            alertDiv.classList.add('success');
            //set sessionStorage
            sessionStorage.setItem('userData', loginForm.username);
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
    const loginFormData = new FormData();
    loginFormData.append('username', loginForm.username);
    loginFormData.append('password', loginForm.password);
    xhr.send(loginFormData);
  }

  return (
    // loginform
    <form className="login_form form" action='POST' onSubmit={e => submitForm(e)}>
      <h2 className="form_heading">LogIn</h2>
      <span className="close_form" onClick={()=>{props.setClickedBtn('')}}>x</span>
      {/* submit article messages (erros and success msg) */}
      <div className="alert"></div>
      <input type="text" placeholder="Username" onChange={e => {setLoginForm({...loginForm, username:e.target.value})}} />
      <input type="password" placeholder="Password" onChange={e => {setLoginForm({...loginForm, password:e.target.value})}} />
      <div className="form_btns">
        <button type="submit">LogIn</button>
        <span className="swich_login">Dont have an account? 
          <span className="click_tosignup" onClick={()=>{props.setClickedBtn('SIGNUP')}}> <u>Sign Up Now</u></span>
        </span>
      </div>
    </form>
  );
}

export default Login;