import React, { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom';
import {Logout} from '../Blog/BlogLogout/Logout';
import './Header.css';

function Header() {
  const [menuBtn, setMenuBtn] = useState(false)
  const [docTitle, setDocTitle] = useState('')
  const [connexion, setConnexion] = useState(sessionStorage.getItem('userData'));

  useEffect(()=>{
    document.title = docTitle;
    let a = document.querySelectorAll('.header_links a');
    window.onload=function(){
      a.forEach(element => {
        if(element.classList.value === 'active'){
          document.title = element.innerHTML;
        }
      });
    }
  }, [docTitle])

  //function toggle nav menu
  useEffect(()=>{
    menuBtn ? document.querySelector('.header_links').classList.add('d-flex') :
      document.querySelector('.header_links').classList.remove('d-flex')
  }, [menuBtn])

  return (
    <header>
      <NavLink to='/' activeClassName='logo_link' onClick={()=>{setDocTitle('Home')}}>Ultras<span>Style</span></NavLink>
      <div className="menu_btn" onClick={()=>{setMenuBtn(!menuBtn)}}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={sessionStorage.getItem('userData') === null ? "header_links" : "header_links flex_basis"}>
        <NavLink exact to='/' activeClassName='active' onClick={()=>{setDocTitle('Home'); setMenuBtn(!menuBtn)}}>Home</NavLink>
        <NavLink to='/blog' onClick={()=>{setDocTitle('Blog'); setMenuBtn(!menuBtn)}}>Blog</NavLink>
        <NavLink to='/movies' onClick={()=>{setDocTitle('Movies'); setMenuBtn(!menuBtn)}}>Movies</NavLink>
        <NavLink to='/gallery' onClick={()=>{setDocTitle('Gallery'); setMenuBtn(!menuBtn)}}>Gallery</NavLink>
        {connexion !== null ? <div className="userLogin">
          <span className="the_username">{sessionStorage.getItem('userData')}</span>
          <span className="user_logout" onClick={() =>{Logout(); setConnexion('')}}>LogOut?</span>
        </div> : ''}
      </div>
    </header>
  );
}

export default Header;