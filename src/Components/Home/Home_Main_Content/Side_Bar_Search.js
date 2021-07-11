import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function SIDE_BAR_SEARCH(props) {
  const [searchData, setSearchData] = useState([]);

  //function to get data from database when search on something
  useEffect(()=>{
    // let isMounted = 
    const searchWord = {searchWord: props.searchWord}
    axios.post('http://localhost/ultras/searchForArt/fetchArticlesWhenSearch.php', searchWord)
    .then(response => setSearchData(response.data))
    .catch(error => console.log(error))
  },[props.searchWord])
  const searchRes = (searchData.length && props.searchWord !== '') ? searchData.map((searchDT, index) => {
    return  <React.Fragment key={index}>
              <NavLink to={"/article?id="+searchDT.article_unique_id} className="searchRes">{searchDT.article_title}</NavLink>
            </React.Fragment>
  })  : <span className={props.searchWord === ''? 'd-none' : 'noSearchResMsg'}>No result available for your search.</span>

  return (
    <div className="searchForArtc">
      {searchRes}
    </div>
  );
}

export default SIDE_BAR_SEARCH;