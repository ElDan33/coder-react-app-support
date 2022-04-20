import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext';

const ContactUs = () => {

  const {darkMode} = useContext(ThemeContext);

  return (
    <div className={darkMode ? "App-header-dark": "App-header"}>
      <h1>Contact Us</h1> 
    </div>
  )
}

export default ContactUs
