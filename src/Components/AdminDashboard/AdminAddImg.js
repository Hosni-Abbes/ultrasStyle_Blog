import React, { useState } from 'react';

function AdminAddImg() {
  const [inputValues, setInputValues] = useState({
    title:'',
    country:'',
    desc:'',
    files:[]
  })
  const [d_noneErrMsg, setD_noneErrMsg] = useState(true) //to disply error msg div
  const [errorMsgMsg, setErrorMsgMsg] = useState('') //to disply error msg msg

  //function to send files and data to server
  function addImg(e){
    e.preventDefault();
    const form = document.querySelector('.adminImgForm');
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost/ultras/admin_images/admin_images.php', true)
    xhr.onload=()=>{
      if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
          let data = xhr.response;
          if(data === "successUpload"){
            setInputValues({...inputValues, title:'', country:'', desc:'',files:[]});
            setD_noneErrMsg(true)
            document.querySelector('.comments_errors').style.color = '#4caf50';
            setErrorMsgMsg('New Album of Images added Successfully')
            setD_noneErrMsg(false)
          }else{
            setD_noneErrMsg(true)
            document.querySelector('.comments_errors').style.color = '#f44336';
            setErrorMsgMsg(data)
            setD_noneErrMsg(false)
          }
        }
      }
    }
    const formdata = new FormData(form);
    formdata.append('uploadedFiles', inputValues.files)
    formdata.append('place', inputValues.country)
    xhr.send(formdata);
  }

  // function to get all files selected
  function getAllFiles(){
    var allFiles = []
    const inputElement = document.querySelector('.imgs').files;
    for(let i=0;i<inputElement.length;i++){
      allFiles.push(inputElement[i].name + ', ')
    }
    setInputValues({...inputValues, files:allFiles})
    }

  return (
    <div className="adminAddArtDiv adminAddImgDiv">
      <h3>You choose to add new Album of Images</h3>
      <form className="adminImgForm" method="POST" encType="multipart/form-data" onSubmit={e=>addImg(e)}>
        {/* errors when admin add smthng */}
        <div className={d_noneErrMsg ? "d-none" : "comments_errors_cont d-flex mb-10"}>
          <span onClick={()=>{setD_noneErrMsg(true)}}>x</span>
          <div className="comments_errors">{errorMsgMsg}</div>
        </div>
        {/* errors when admin add smthng */}
        <input type="text" name="img_title" placeholder="Title" value={inputValues.title} onChange={e =>{setInputValues({...inputValues, title:e.target.value})}}/>
        <select value={inputValues.country} onChange={e =>{setInputValues({...inputValues, country:e.target.value})}}>
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
        <textarea name="img_desc" rows="5" cols="5" placeholder="Create Description" value={inputValues.desc} onChange={e =>{setInputValues({...inputValues, desc:e.target.value})}}></textarea>
        {/* display the selected files */}
        <div className={inputValues.files.length === 0 ? 'd-none' : 'uploadedFiles'}>
          {inputValues.files}
        </div>
        <div className="admin_add_files">
          <label htmlFor="imgs">
            <i className="fa fa-image"></i>
            <p>Add Images</p>
            <input id="imgs" className="imgs" name="the_img[]" type="file" multiple placeholder="Add Images" 
                onChange={()=>getAllFiles()} />
          </label>
        </div>
        <div><button className="admin_createBtn" type="submit">Create</button></div>
      </form>
    </div>
  );
}

export default AdminAddImg;