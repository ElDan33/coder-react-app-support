import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun} from '@fortawesome/free-solid-svg-icons'
import {ThemeContext } from '../context/ThemeContext';


const ThemeToggle = () => {

    const {darkMode, toggleDarkMode, isClicked} = useContext(ThemeContext);

    
    const themeButtonhandler = (e) => {
        toggleDarkMode();
    }
    
    return (
        <div className="">
                <button 
                    onClick={themeButtonhandler} 
                    className="w-16 h-16 lg:w-12 lg:h-12 rounded-full hover:bg-gray-600"
                    
                >   
                    {isClicked && darkMode
                        ? <FontAwesomeIcon icon={faMoon} className="lg:w-10 lg:h-10 transition ease-in-out delay-100 rotate-270 duration-500  "/> 
                        : <FontAwesomeIcon icon={faSun} className="lg:w-10 lg:h-10 transition ease-in-out delay-100 -rotate-45 duration-500  "/>
                    }
                
                </button>
        </div>
    )
}

export default ThemeToggle