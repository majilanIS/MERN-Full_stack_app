import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import classes from './Login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import { backendUrl, isLoggedin, setIsLoggedin } from '../context/appContext.js'

const Login = () => {
  const { backendUrl, isLoggedin, setIsLoggedin } = useContext(AppContext);
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { backendUrl } = useContext(AppContext)
  // Handle form submission
  const onSummitHandler = async (e) => {
    try {
      e.preventDefault()
      axios.defaults.withCredentials = true
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + 'api/auth/register', { name, email, password })
        if (data.success) {
          setIsLoggedin(true)
          navigate('/')
        } else {
          alert(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + 'api/auth/register', { name, email, password })
        if (data.success) {
          setIsLoggedin(true)
          navigate('/')
        }
      }
    } catch (error) {
      return res.json({ succcess: false })
    };

    return (
      <div className={classes.container}>
        <img
          src={assets.logo}
          alt="Logo"
          className={classes.logo}
          onClick={() => navigate('/')}
        />

        <div className={classes.content}>
          <h2>
            {state === 'Sign Up'
              ? 'Create your account'
              : 'Login to your account'}
          </h2>
          <p>
            {state === 'Sign Up'
              ? 'Create your account'
              : 'Login to your account!'}
          </p>

          <form onSubmit={onSummitHandler}>
            {state === 'Sign Up' && (
              <div className={classes.formGroup}>
                <img src={assets.person_icon} alt="Person Icon" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Full Name"
                  required
                  className={classes.input}
                />
              </div>
            )}

            <div className={classes.formGroup}>
              <img src={assets.mail_icon} alt="Mail Icon" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                required
                className={classes.input}
              />
            </div>

            <div className={classes.formGroup}>
              <img src={assets.lock_icon} alt="Lock Icon" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className={classes.input}
              />
            </div>

            <p
              className={classes.forgotten}
              onClick={() => navigate('/reset-password')}
            >
              Forgot password?
            </p>

            <button type="submit" className={classes.submitButton}>
              {state}
            </button>
          </form>

          {state === 'Sign Up' ? (
            <p className={classes.login}>
              Already have an account?
              <span onClick={() => setState('Login')}> Login here</span>
            </p>
          ) : (
            <p className={classes.signup}>
              Don't have an account?
              <span onClick={() => setState('Sign Up')}> Sign Up</span>
            </p>
          )}
        </div>
      </div>
    );
  };
}
export default Login;
