import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import classes from './Home.module.css'
const Home = () => {
  return (
      <div className={classes.home_container}>
          <Navbar />
          <Header />
    </div>
  )
}

export default Home
