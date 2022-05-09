import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const WrongPath = () => {

    const {darkMode} = useContext(ThemeContext);
    const currentPath = window.location.pathname;
    console.log(window.location.pathname)
    console.log(currentPath);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <div className={darkMode ? "App-header-dark w-full h-screen flex flex-col items-center justify-around lg:w-full lg:h-screen" : "App-header w-full h-screen flex flex-col items-center justify-around lg:w-full lg:h-screen"}>
            <h2 className="animate__animated animate__bounceIn text-red-600 text-5xl text-center">Page not found!</h2>
            <p className="animate__animated animate__bounceIn text-center">The path "<span className="text-red-600 underline">{currentPath}</span>" entered is incorrect.</p>
            <Link to="/" className={darkMode ? "animate__animated animate__bounceIn flex flex-row font-bold border-2 border-solid p-2 rounded-2xl shadow-md shadow-white/40" : "animate__animated animate__bounceIn flex flex-row font-bold border-2 border-solid p-2 rounded-2xl shadow-md "}>
                <FontAwesomeIcon icon={faArrowLeft} className="mr-3 mt-2"/>
                <p>Back to Home</p>
            </Link>
        </div>
    )
}

export default WrongPath
