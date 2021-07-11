import React from 'react';
import { NavLink } from 'react-router-dom';

function AddMovies() {
  return (
    <div className="add_movies">
      <h2 className="movie_heading">Videos Added by our Members</h2>
      <div className="add_video_text">
        <p>Share your videos here and let people know about your favorite Ultras.</p>
        <p><NavLink to='/blog'>Click here</NavLink> to upload your video.</p>
      </div>
      <div className="movies_block videos_country">
        <NavLink to="country?cn=africa">AFRICA</NavLink>
        <NavLink to="country?cn=albania">ALBANIA</NavLink>
        <NavLink to="country?cn=asia">ASIA</NavLink>
        <NavLink to="country?cn=austria">AUSTRIA</NavLink>
        <NavLink to="country?cn=baltic-countries">BALTIC COUNTRIES</NavLink>
        <NavLink to="country?cn=belgium">BELGIUM</NavLink>
        <NavLink to="country?cn=bosnia-herzegovina">BOSNIA & HERZEGOVINA</NavLink>
        <NavLink to="country?cn=bulgaria">BULGARIA</NavLink>
        <NavLink to="country?cn=croatia">CROATIA</NavLink>
        <NavLink to="country?cn=cyprus">CYPRUS</NavLink>
        <NavLink to="country?cn=czech">CZECH</NavLink>
        <NavLink to="country?cn=france">FRANCE</NavLink>
        <NavLink to="country?cn=germany">GERMANY</NavLink>
        <NavLink to="country?cn=great-britain">GREAT BRITAIN</NavLink>
        <NavLink to="country?cn=greece">GREECE</NavLink>
        <NavLink to="country?cn=holland">HOLLAND</NavLink>
        <NavLink to="country?cn=hungary">HUNGARY</NavLink>
        <NavLink to="country?cn=italy">ITALY</NavLink>
        <NavLink to="country?cn=ireland">IRELAND</NavLink>
        <NavLink to="country?cn=montenegro">MONTENEGRO</NavLink>
        <NavLink to="country?cn=north-macedonia">NORTH MACEDONIA</NavLink>
        <NavLink to="country?cn=oceania">OCEANIA</NavLink>
        <NavLink to="country?cn=other-countries">OTHER COUNTRIES</NavLink>
        <NavLink to="country?cn=poland">POLAND</NavLink>
        <NavLink to="country?cn=portugal">PORTUGAL</NavLink>
        <NavLink to="country?cn=romania">ROMANIA</NavLink>
        <NavLink to="country?cn=russia">RUSSIA</NavLink>
        <NavLink to="country?cn=belarus">BELARUS</NavLink>
        <NavLink to="country?cn=scandinavia">SCANDINAVIA</NavLink>
        <NavLink to="country?cn=serbia">SERBIA</NavLink>
        <NavLink to="country?cn=slovakia">SLOVAKIA</NavLink>
        <NavLink to="country?cn=spain">SPAIN</NavLink>
        <NavLink to="country?cn=south-america">SOUTH AMERICA</NavLink>
        <NavLink to="country?cn=switzerland">SWITZERLAND</NavLink>
        <NavLink to="country?cn=turkey">TURKEY</NavLink>
        <NavLink to="country?cn=ukraine">UKRAINE</NavLink>
      </div>
    </div>
  );
}

export default AddMovies;