import React from 'react';
import Register from '../components/Register';
import Login from '../components/Login';
import WelcomePage from '../components/WelcomePage';

const HomeScreen = () => {
  if (!localStorage.getItem('userData')) {
    return (
      <div id='home' className='container-fluid'>
        <div className='home-container'>
          <div className='home-content mt-5 h2 font-weight-light'>
            <h3 className='display-4 mb-5 home-header'>
              Welcome to Stock Trader
            </h3>
            <p>Experience the thrill of the stock market without the risk.</p>
            <p>Before you start, you must first register.</p>
            <p>
              Once you have registered, you will be automatically logged in.
            </p>
            <div className='home-buttons-wrapper'>
              <Register />
              <Login />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <WelcomePage />;
  }
};

export default HomeScreen;
