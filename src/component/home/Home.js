import {React, useEffect} from "react";
import "./Homepage.css";
import { BrowserRouter as Router, Route, Switch, Link, useLocation } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    document.title='Home'
  }, [])
  return (
    <div className="landing-page">
      <div className="landing-left">
        <div className='land-year'>
          <h1 className='landYear'>Year 2021</h1>
        </div>
        <div className='landHead'>
          <h1 className="land-head">Monk Quiz Online</h1>
        </div>
        <div className='landPara'>
            <span className='paraInfo'>Monk quiz platform is a unique place on web. Where we have mapped questions from computer science and technology.</span>
        </div>
        <div className='landSignUp'>
            <Link className='signUpBtn' exact to='/sign-up'>Enroll Now</Link>
        </div>
      </div>
      <div className="landing-right">
        <img className="lr-pic" src="/img/land-right.jpg" alt="" />
      </div>
    </div>
  );
};

export default Home;
