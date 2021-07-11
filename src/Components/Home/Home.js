import React, { useEffect } from 'react';
import HOME_HEADER_IMG from './Home_Header_Img/Home_Header_Img';
import HOMR_MAIN_CONTENT from './Home_Main_Content/Home_Main_Content';

function Home() {
  //scroll to top of page when component mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='container home_container'>
      {/* home header image */}
      <HOME_HEADER_IMG />
      {/* home main content */}
      <HOMR_MAIN_CONTENT />
    </div>
  );
}

export default Home;