import React, {useEffect, useState} from 'react';
import header1 from './header1.jpg';
import header2 from './header2.jpg';
import './Home_Header_Img.css';

function HOME_HEADER_IMG() {
  const [headerImg, setHeaderImg] = useState(header1)

  useEffect(()=>{
    let isMounted= true;
    // set interval to change header img every 30s
    const headerImages = [header1, header2];
    setInterval(function(){
      let random = Math.floor(Math.random()*2)
      if(isMounted) setHeaderImg(headerImages[random])
    },30000)
    return ()=>{isMounted = false}
  }, [headerImg])

  return (
    <div className="header_img">
        <img className="the_img" src={headerImg} alt="header" />
      </div>
  );
}

export default HOME_HEADER_IMG;