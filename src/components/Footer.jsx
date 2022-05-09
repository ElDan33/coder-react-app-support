import { faEnvelope, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import GreenShopIcon from '../assets/GreenShopIcon.png'

const Footer = () => {

    return (
        <footer className="flex flex-col justify-center items-center lg:flex lg:flex-row lg:justify-between select-none bg-gray-800 text-white py-4 border-t-4 border-b-4 border-double border-sky-500">
            <Link to="/" onClick={()=> window.scrollTo(0, 0)} className="flex items-center w-3/4 lg:w-44 justify-center px-2 border-2 border-solid bg-gray-700 border-sky-500 rounded-md text-shadow mb-1 lg:mb-0 hover:border-green-600">
                <img src={GreenShopIcon} alt="" className="w-8 h-8 lg:w-16 lg:h-16 py-1"/>
                <p>GreenShop</p>
            </Link>
            <div className="flex flex-col items-center divide-y divide-dashed divide-sky-500 mr-2">
                <Link to="/" onClick={()=> window.scrollTo(0, 0)} className="mb-1 hover:text-sky-500">
                    <FontAwesomeIcon icon={faHouse} className="mr-3 mt-2"/>
                    Home
                </Link>
                <Link to="Contact" className="hover:text-sky-500">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-3 mt-2 "/>
                    Contact
                </Link>
            </div>            
        </footer>
    )
}

export default Footer