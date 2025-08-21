import React from 'react';
import { assets } from '../assets/assets.js';
import classes from './Navbar.module.css';
import { Navigate, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const Navigate = useNavigate()
  return (
    <div className={classes.container}>
      <img src={assets.logo} alt="Logo" className={classes.logo} />

         <button onClick={()=>Navigate('/login')}
        className={classes.loginButton}>
        Login <img src={assets.arrow_icon} alt="Arrow" />
      </button>
    </div>
  );
}

export default Navbar;
