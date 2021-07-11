import React, {useState} from 'react';
import axios from 'axios';

function AdminDashFormsLogoutChangeData() {

  const [renderedForm, setRenderedForm] = useState('')  //to render forms
  const [changeEmail, setChangeEmail] = useState({
    oldEmail: '',
    newEmail: '',
    password: ''
  })  //to collect data to change email
  const [changePass, setChangePass] = useState({
    myemail: '',
    mypassword: '',
    newPassword: ''
  })  //to collect data to change password


  //render form : change email / password 
  function renderForm() {
    if (renderedForm === 'Email') {
      return <form className="change_data_form" method="POST" onSubmit={e => submitChangeEmail(e)}>
        <span>Change your Email</span>
        <span className="top_errors"></span>
        <input type="email" placeholder="Your old email" onChange={(e) => setChangeEmail({ ...changeEmail, oldEmail: e.target.value })} />
        <input type="email" placeholder="The new email" onChange={(e) => setChangeEmail({ ...changeEmail, newEmail: e.target.value })} />
        <input type="password" placeholder="Your password" onChange={(e) => setChangeEmail({ ...changeEmail, password: e.target.value })} />
        <div className="div_changeBtn">
          <button type="submit">Change</button>
          <button type="button" onClick={() => { setRenderedForm('') }}>Cancel</button>
        </div>
      </form>
    } else if (renderedForm === 'Password') {
      return <form className="change_data_form" method="POST" onSubmit={e => submitChangePass(e)}>
        <span>Change your Password</span>
        <span className="top_errors"></span>
        <input type="email" placeholder="Your email" onChange={e => setChangePass({ ...changePass, myemail: e.target.value })} />
        <input type="password" placeholder="Your password" onChange={e => setChangePass({ ...changePass, mypassword: e.target.value })} />
        <input type="password" placeholder="The new password" onChange={e => setChangePass({ ...changePass, newPassword: e.target.value })} />
        <div className="div_changeBtn">
          <button type="submit">Change</button>
          <button type="button" onClick={() => { setRenderedForm('') }}>Cancel</button>
        </div>
      </form>
    } else {
      return null;
    }
  }

  //logout function
  function logOut() {
    sessionStorage.removeItem('adminData');
    sessionStorage.clear();
  }
  //submit ChangeEmail function
  function submitChangeEmail(e) {
    e.preventDefault();
    const ChEmailForm = new FormData();
    ChEmailForm.append('old_email', changeEmail.oldEmail);
    ChEmailForm.append('new_email', changeEmail.newEmail);
    ChEmailForm.append('password', changeEmail.password);
    axios.post('http://localhost/ultras/admin_data/ChangeEmail.php', ChEmailForm)
      .then(response => {
        if (response.data === 'emailChanged') {
          document.querySelector('.top_errors').textContent = "Email Changed Successfully";
          document.querySelector('.top_errors').style.background = "#a5d6a7";
          document.querySelector('.top_errors').style.color = "#1b5e20";
          document.querySelector('.top_errors').style.display = 'block';
          setTimeout(function () { window.location.reload() }, 2000);
          sessionStorage.setItem('adminData', changeEmail.newEmail);
        } else {
          document.querySelector('.top_errors').textContent = response.data;
          document.querySelector('.top_errors').style.display = 'block';
        }
      })
      .catch(error => console.log(error))
  }
  //submit ChangePass function
  function submitChangePass(e) {
    e.preventDefault();
    const ChPassForm = new FormData();
    ChPassForm.append('myemail', changePass.myemail);
    ChPassForm.append('mypassword', changePass.mypassword);
    ChPassForm.append('newPassword', changePass.newPassword);
    axios.post('http://localhost/ultras/admin_data/ChangePass.php', ChPassForm)
      .then(response => {
        if (response.data === 'passwordChanged') {
          document.querySelector('.top_errors').textContent = "Password Changed Successfully";
          document.querySelector('.top_errors').style.background = "#a5d6a7";
          document.querySelector('.top_errors').style.color = "#1b5e20";
          document.querySelector('.top_errors').style.display = 'block';
          setTimeout(function () { window.location.reload() }, 2000);
        } else {
          document.querySelector('.top_errors').textContent = response.data;
          document.querySelector('.top_errors').style.display = 'block';
        }
      })
      .catch(error => console.log(error))
  }

  return (
    <React.Fragment>
      <div className="adminChanges" onMouseOver={()=>{document.querySelector('.adminChanges').style.display = 'flex'}}
                                    onMouseLeave={()=>{document.querySelector('.adminChanges').style.display = 'none'}}>
        <div><span className="change_email" onClick={() => { setRenderedForm('Email')}}>Change Email</span></div>
        <div><span className="change_pass"  onClick={() => { setRenderedForm('Password')}}>Change Password</span></div>
        <div><span className="adminlogout"  onClick={() => { logOut() }}>Logout <i className="fa fa-sign-out"></i></span></div>
        
      </div>
      {renderForm()}
    </React.Fragment>
  );
}

export default AdminDashFormsLogoutChangeData;