import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import './AdminDashboard.css';

function AdminLogin() {
  const [fields, setFields] = useState({
    email:'',
    password:''
  });
  const [adminData, setAdminData] = useState(false)
  const [d_noneErrMsg, setD_noneErrMsg] = useState(true) //to disply error msg div
  const [errorMsgMsg, setErrorMsgMsg] = useState('') //to disply error msg msg

  //function login
  function login(e){
    e.preventDefault();
    const Form = new FormData();
    Form.append('email', fields.email);
    Form.append('password', fields.password);
    axios.post("http://localhost/ultras/login/AdminLogin.php", Form)
    .then(response => {
      if(response.data === 'successLogin'){
        sessionStorage.setItem('adminData', fields.email);
        setAdminData(true);
      }else{
        setErrorMsgMsg(response.data)
        setD_noneErrMsg(false)
      }
    })
    .catch(error => console.log(error))
  }

  return (
    sessionStorage.getItem("adminData") !== null ? <Redirect to="/dashboard"></Redirect>
    :
    <form className="admin_login" method='POST' onSubmit={e => login(e)}>
      {sessionStorage.getItem('adminData') !== null ? <Redirect to="/dashboard" /> : ''}
      <h3>Enter email and password to login</h3>
      <span className={d_noneErrMsg ? 'd-none' : "top_errors d-flex"}>{errorMsgMsg}</span>
      <input type="email" placeholder="Email" onChange={(e) => setFields({...fields, email:e.target.value})} />
      <input type="password" placeholder="Password" onChange={(e) => setFields({...fields, password:e.target.value})} />
      <div className="divbtn">
        <button className="admin_login_btn" type="submit">Login</button>
      </div>
      {adminData? <Redirect to="/dashboard" /> : '' }
    </form>
  );
}

export default AdminLogin;