import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import AdminDashFormsLogoutChangeData from './AdminDashFormsLogoutChangeData';
import AdminDashCreateArt from './AdminDashCreateArt';
import AdminAddImg from './AdminAddImg';
import AdminAddVid from './AdminAddVid';
import './AdminDashboard.css';

function AdminDashboard() {
  const [choosedAction, setChoosedAction] = useState('createArt');
  const [members, setMembers] = useState([]);
  const [theMemberTodelete, setTheMemberTodelete] = useState('');
  const [deletinMemberMsg, setDeletingMemberMsg] = useState(false)

  //function to get members data from db
  useEffect(()=>{
    let isMounted = true
    axios("http://localhost/ultras/members/fetchMembers.php")
    .then(response =>{
      if(isMounted) setMembers(response.data);
    })
    .catch(error=>{console.log(error)});
    return () => { isMounted = false; }
  },[members])
  const allMembers = members.map((member, index)=>{
    if(member.member_img !==''){
      return <div key={index}>
        <div><img src={"http://localhost/ultras/avatar_uploads/"+member.member_img} alt="avatar" /><span>{member.member_name}</span></div>
        <button onClick={(e)=>{deleteMember(e)}}>Delete</button></div>
    }else{
      return <div key={index}>
        <div><i className="fa fa-user"></i><span>{member.member_name}</span></div>
        <button onClick={(e)=>{deleteMember(e)}}>Delete</button></div>
    }
  })

  //function delete members
  function deleteMember(e){
    const targetMember = e.target.previousElementSibling.lastChild.textContent;
    setTheMemberTodelete(targetMember);
    setDeletingMemberMsg(true);
    document.body.style.overflow = 'hidden';
  }
  function confirmDeleteMember(){
    const formdata = new FormData();
    formdata.append('deleteMember', theMemberTodelete);
    axios.post('http://localhost/ultras/members/deleteMembers.php', formdata)
    .then(response=>{console.log(response.data)})
    .catch(error=>{console.log(error)})
    setDeletingMemberMsg(false);
    setTheMemberTodelete('');
    document.body.style.overflow = 'scroll';
  }


  return (
    sessionStorage.getItem("adminData") === null ? <Redirect to="/admin-login"></Redirect>
    :
    <div className="container adminDash">
      <div className="adminInfo">
        <div className="adminInfoBtn" onMouseOver={()=>{document.querySelector('.adminChanges').style.display = 'flex'}}
                                      onMouseLeave={()=>{document.querySelector('.adminChanges').style.display = 'none'}}>
          <div><i className="fa fa-sort-down"></i></div>
          <span>{sessionStorage.getItem('adminData')}</span>
        </div>
        <AdminDashFormsLogoutChangeData />
      </div>
      {/* the dashboard (add articles, images and videos) */}
      <div className="theDash">
        <span className={choosedAction === "createArt" ? "adminAddArt clickedA" : "adminAddArt" } onClick={()=>{setChoosedAction('createArt')}}>Create Article</span>
        <span className={choosedAction === "addVid"    ? "adminAddVid clickedA" : "adminAddVid" } onClick={()=>{setChoosedAction('addVid')}}>Add Videos</span>
        <span className={choosedAction === "addImg"    ? "adminAddImg clickedA" : "adminAddImg" } onClick={()=>{setChoosedAction('addImg')}}>Add Images</span>
      </div>
      <div className="theChoosenActionEdit">
        {choosedAction === 'createArt' ? <AdminDashCreateArt /> : choosedAction === 'addVid' ? <AdminAddVid /> : choosedAction === 'addImg' ? <AdminAddImg /> : ''}
      </div>
      {/* admin dashboard page (show the list of members and controle it) */}
      <div className="adminDash_MembersList">
        {/* message shown when click on delete members. */}
        <div className={deletinMemberMsg? "confirm_deleting" : "d-none" }>
          <p>Are you sure you want to delete <span>{theMemberTodelete}</span> ?</p>
          <div>
            <button onClick={()=>{confirmDeleteMember()}}>Yes</button>
            <button onClick={()=>{setDeletingMemberMsg(false);
                            document.body.style.overflow = 'scroll';}}>No</button>
          </div>
        </div>
        <div className="memberList_Click">
          <p>All members: {members.length}</p>
          <i className="fa fa-sort-down clickToshowMembers"></i>
        </div>
        <div className="memberList_Show">
          {allMembers}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;