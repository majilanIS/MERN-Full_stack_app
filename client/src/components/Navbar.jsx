import React, { useContext } from 'react';
import { assets } from '../assets/assets.js';
import classes from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/appContext.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, setUserData, setIsLoggedin } = useContext(AppContext);

  return (
    <div className={classes.container}>
      <img src={assets.logo} alt="Logo" className={classes.logo} />
      {userData ? (
        <div>{userData?.name?.[0]?.toUpperCase()}</div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className={classes.loginButton}
        >
          Login <img src={assets.arrow_icon} alt="Arrow" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
