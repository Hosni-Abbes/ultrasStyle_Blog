import React, {useState} from 'react';
import axios from 'axios';

function AdminAddVid() {
  const [inputValues, setInputValues] = useState({
    title:'',
    desc:'',
    video_name:'',
    topten:'',
    place:''
  });
  const [d_noneErrMsg, setD_noneErrMsg] = useState(true) //to disply error msg div
  const [errorMsgMsg, setErrorMsgMsg] = useState('') //to disply error msg msg

  
  //function to add video to database
  function submitAdminVideo(e){
    const formdata = new FormData()
    formdata.append('title', inputValues.title);
    formdata.append('desc', inputValues.desc);
    formdata.append('topten', inputValues.topten);
    formdata.append('place', inputValues.place);
    formdata.append('video', document.querySelector('.vids').files[0]);
    e.preventDefault();
    axios.post('http://localhost/ultras/admin_video/admin_video.php', formdata)
    .then(response => {
      if(response.data === 'video_uploaded'){
        setInputValues({...inputValues, title:'', desc:'', video_name:'', topten:'', place:''});
        setD_noneErrMsg(true)
        document.querySelector('.comments_errors').style.color = '#4caf50';
        setErrorMsgMsg('New Video added Successfully.')
        setD_noneErrMsg(false)
      }else{
        setD_noneErrMsg(true)
        document.querySelector('.comments_errors').style.color = '#f44336';
        setErrorMsgMsg(response.data)
        setD_noneErrMsg(false)
      }
    })
    .catch(error => console.log(error));
  }

  return (
    <div className="adminAddArtDiv adminAddVidsDiv">
      <h3>You choose to add new Videos</h3>
      <form method="POST" encType="multipart/form-data" onSubmit={e=>{submitAdminVideo(e)}}>
        {/* errors when admin add smthng */}
        <div className={d_noneErrMsg ? "d-none" : "comments_errors_cont d-flex mb-10"}>
          <span onClick={()=>{setD_noneErrMsg(true)}}>x</span>
          <div className="comments_errors">{errorMsgMsg}</div>
        </div>
        {/* errors when admin add smthng */}
        <input type="text" placeholder="Title"  value={inputValues.title} onChange={e =>{setInputValues({...inputValues, title:e.target.value})}} />
        <select value={inputValues.place} onChange={e =>{setInputValues({...inputValues, place:e.target.value})}}>
          <option value="">Choose Country</option>
          <option value="africa">AFRICA</option>
          <option value="albania">ALBANIA</option>
          <option value="asia">ASIA</option>
          <option value="austria">AUSTRIA</option>
          <option value="baltic-countries">BALTIC COUNTRIES</option>
          <option value="belgium">BELGIUM</option>
          <option value="bosnia-herzegovina">BOSNIA & HERZEGOVINA</option>
          <option value="bulgaria">BULGARIA</option>
          <option value="croatia">CROATIA</option>
          <option value="cyprus">CYPRUS</option>
          <option value="czech">CZECH</option>
          <option value="france">FRANCE</option>
          <option value="germany">GERMANY</option>
          <option value="great-britain">GREAT BRITAIN</option>
          <option value="greece">GREECE</option>
          <option value="holland">HOLLAND</option>
          <option value="hungary">HUNGARY</option>
          <option value="italy">ITALY</option>
          <option value="ireland">IRELAND</option>
          <option value="montenegro">MONTENEGRO</option>
          <option value="north-macedonia">NORTH MACEDONIA</option>
          <option value="oceania">OCEANIA</option>
          <option value="other-countries">OTHER COUNTRIES</option>
          <option value="poland">POLAND</option>
          <option value="portugal">PORTUGAL</option>
          <option value="romania">ROMANIA</option>
          <option value="russia">RUSSIA</option>
          <option value="belarus">BELARUS</option>
          <option value="scandinavia">SCANDINAVIA</option>
          <option value="serbia">SERBIA</option>
          <option value="slovakia">SLOVAKIA</option>
          <option value="spain">SPAIN</option>
          <option value="south-america">SOUTH AMERICA</option>
          <option value="switzerland">SWITZERLAND</option>
          <option value="turkey">TURKEY</option>
          <option value="ukraine">UKRAINE</option>
        </select>
        <textarea rows="5" cols="5" placeholder="Create Description"  value={inputValues.desc} onChange={e =>{setInputValues({...inputValues, desc:e.target.value})}}></textarea>
        {/* display the selected video file */}
        <div className={inputValues.video_name === '' ? 'd-none' : 'uploadedFiles'}>
          <span>{inputValues.video_name}</span>
        </div>
        <div className="admin_add_files">
          <label htmlFor="vids">
            <i className="fa fa-film"></i>
            <p>Add Videos</p>
            <input id="vids" className="vids" type="file" placeholder="Add Videos"
                  onChange={e => {setInputValues({...inputValues, video_name:e.target.value})}} />
          </label>
          <input type="text" placeholder="Top Ten? (Create YES/NO)" value={inputValues.topten} onChange={e =>{setInputValues({...inputValues, topten:e.target.value})}} />
        </div>
        <div><button className="admin_createBtn" type="submit">Create</button></div>
      </form>
    </div>
  );
}

export default AdminAddVid;