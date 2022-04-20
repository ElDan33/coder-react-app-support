import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun} from '@fortawesome/free-solid-svg-icons'
import {ThemeContext } from '../context/ThemeContext';


const ThemeToggle = () => {

    const {darkMode, toggleDarkMode} = useContext(ThemeContext);
    
    return (
        <div>
                <input 
                    onClick={toggleDarkMode} 
                    type="checkbox" 
                    className="checkbox"
                    id="checkbox"
                />
                <label 
                    htmlFor="checkbox" 
                    className={darkMode ? "label-dark" : "label"}
                >
                    <FontAwesomeIcon icon={faMoon} />
                    <FontAwesomeIcon icon={faSun} />
                    <div className={darkMode ? "ball-dark" : "ball"}/>
                </label>
        </div>
    )
}

export default ThemeToggle