// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';
import * as ROUTES from './constants/routes';
// import { Helmet } from 'react-helmet'; // Dynamic Meta Info in header

// pages
import Home from './Home';
import Origami from './Origami';
import Add from './Add';
import TVmaze from './TVmazeDemo';
import AdminPage from './components/Auth/Admin';
// import Subreddit from './Subreddit'; 

// components
import Navbar from './components/Navbar';


const App = () => {
  return (
    
    <React.Fragment>
      <div className="header">
        <Navbar />
      </div>
       <div className="App">
         <BrowserRouter basename='/Firebase_Admin_Console_UI'>
         <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/origami' element={<Origami/>} />
          <Route path='/post' element={<Add/>} />
          <Route path='/tvdemo' element={<TVmaze/>} />
          <Route path='/admin' element={<AdminPage/>} />

        </Routes>
        
        {/* <Routes>
          <Route exact path="/subredditcool" element={<Subreddit/>} />
        </Routes> */}
      </BrowserRouter>
      </div>
    </React.Fragment>
  );
};

export default App;
