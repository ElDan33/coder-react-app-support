import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext';

const Contact = () => {

  const {darkMode} = useContext(ThemeContext);


  return (
    <div className={darkMode ? "App-header-dark py-12 w-screen h-full flex items-center justify-center": "App-header py-12 w-screen h-full flex items-center justify-center "}>
      <div className="flex flex-col items-center w-1/3 ">
        <h1 className="font-bold text-3xl mb-10">Contact Us</h1>
        <form action="" className={darkMode ? "flex flex-col space-y-6 w-full p-6 rounded-xl shadow-md shadow-white" : "flex flex-col space-y-6 w-full bg-orange-200 p-6 rounded-xl shadow-md shadow-gray-300"}>
          <div className="w-full flex flex-col">
            <label className="text-center" htmlFor="">Name:</label>
            <input className="p-4 rounded-xl text-black" type="text"  name="Name"   placeholder="Full name..." pattern="[a-zA-Z]+\s[a-zA-Z]+\s?[a-zA-Z]+\s?" required />
          </div>
          <div className="w-full flex flex-col">
            <label className="text-center" htmlFor="">E-mail:</label>
            <input className="p-4 rounded-xl text-black" type="email"  name="Email"  placeholder="E-mail..." pattern="^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]{2,}$" required />
          </div>
          <div className="w-full flex flex-col">
            <label className="text-center" htmlFor="">Telephone:</label>
            <input className="p-4 rounded-xl text-black" type="number"  name="Telephone"  placeholder="Telephone..." required />
          </div>
          <div className="w-full flex flex-col">
            <label className="text-center" htmlFor="">Query:</label>
            <textarea className="p-4 rounded-xl h-36 text-black" placeholder="Your query..." maxLength="250" required></textarea>
          </div>
          <button className={darkMode ? "w-full border rounded-xl shadow-sm shadow-white hover:bg-gray-600" : "w-full border rounded-xl shadow-sm shadow-white bg-orange-300 hover:bg-orange-100"}>SEND</button>
        </form>
      </div>
      
    </div>
  )
}

export default Contact
