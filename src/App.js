import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Blog from './Components/Blog/Blog';
import Movies from './Components/Movies/Movies';
import Gallery from './Components/Gallery/Gallery';
import AdminLogin from './Components/AdminDashboard/AdminLogin';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
//secondaarypages
import FromHome from './Components/SecondaryPages/FromHome';
import FromGalery from './Components/SecondaryPages/FromGalery';
import FromCountry from './Components/SecondaryPages/FromCountry';
import Footer from './Components/Footer/Footer';
import './App.css';

function App(){
  return(
    <BrowserRouter className="App">
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/movies" component={Movies} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/dashboard" component={AdminDashboard} />
      <Route path="/article" component={FromHome} />
      <Route path="/album" component={FromGalery} />
      <Route path="/country" component={FromCountry} />
      <Footer />
    </BrowserRouter>
  )
}

export default App;