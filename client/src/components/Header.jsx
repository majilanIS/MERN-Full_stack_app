import React from 'react';
import { assets } from '../assets/assets';
import classes from './Header.module.css';

const Header = () => {
  return (
    <div className={classes.container}>
      <img 
        src={assets.robot_assistant} 
        alt='Profile' 
        className={classes.profile} 
      />

      <h1 className={classes.title}>
        Hey Developer 
        <img src={assets.hand_wave} alt="Wave" className={classes.wave} />
      </h1>

      <h2 className={classes.subtitle}>Welcome to Our app</h2>

      <p className={classes.description}>
        Let's start with a quick product tour and we will have you up and running in no time
      </p>

      <button className={classes.button}>Get Started</button>
    </div>
  )
}

export default Header;
