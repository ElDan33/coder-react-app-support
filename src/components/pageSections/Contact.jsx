import React, { useState, useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext';
import {collection, getFirestore, serverTimestamp, addDoc} from 'firebase/firestore';
import {useForm} from 'react-hook-form'
import Loader from '../Loader';

const Contact = () => {

  const {darkMode} = useContext(ThemeContext);
  const {register, handleSubmit, reset,formState: { errors }} = useForm();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const submitHandler = (data) => {
    console.log(data);
    let userQuery = {
      user: {fullName, email, phone},
      date: serverTimestamp(),
      query
    } 

    setIsLoading(true);
    const db = getFirestore();
    const queriesCollection = collection(db, "usersQueries");
    addDoc(queriesCollection, userQuery).then(({id})=>{
      console.log(id);

    }).finally(()=>{
      setTimeout(()=>{
        setIsLoading(false);
        setIsSuccess(true);
        reset();
      },1000)
    });
  }

  return (
    <div className={darkMode ? "App-header-dark w-screen h-full flex items-start justify-center lg:h-screen": "App-header w-screen h-full flex items-start justify-center lg:h-screen"}>
      <div className="flex flex-col items-center w-2/4 ">
        <h1 className="font-bold text-3xl mt-6 mb-28">Contact Us</h1>
        {
            isLoading
              ? <Loader text={"Sending your query..."} contactLoading={isLoading}/>
              : ( isSuccess
                  ? (
                    <div className="fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-800 opacity-90 overscroll-auto lg:w-screen lg:h-screen lg:overscroll-auto">
                    <div className="animate__animated animate__fadeInDown block relative ml-24 w-2/3 h-68 p-2  bg-green-300 opacity-90 rounded-2xl font-mono lg:mx-auto lg:my-36 lg:w-1/3 ">
                        <p className="px-6 text-md w-fit rounded-xl cursor-pointer text-gray-500 hover:text-white hover:bg-green-600 text-shadow" onClick={()=>setIsSuccess(false)}>x</p>
                        <h3 className="text-center mb-4">- Query sent -</h3>
                        <hr />
                        <p className="text-center my-4 font-bold">🎉Sending successful!!🎉</p>
                        <button 
                            className="ml-80 mt-4 mb-2  w-1/4 bg-green-600 rounded-lg text-white text-shadow-h1 hover:bg-green-700" 
                            onClick={()=>setIsSuccess(false)}
                        >
                            OK
                        </button>
                    </div>
                </div>
                  )
                  :(<form onSubmit={handleSubmit(submitHandler)} className={darkMode ? "flex  justify-around space-x-6 w-full p-6 rounded-xl shadow-md shadow-white" : "flex  justify-around space-x-6 w-full bg-orange-200 p-6 rounded-xl shadow-md shadow-gray-300"}>
                    <div className="w-full flex flex-col">
                      <label className="text-center" htmlFor="">Full Name:</label>
                      <input className="p-4 rounded-xl text-black" type="text"  {...register("fullName", {required:true, pattern: /^[A-Za-z]+\s[A-Za-z]+$/i})} onChange={(e)=>setFullName(e.target.value)} placeholder="Full name..."  />
                        {errors?.fullName?.type === "required" && <p className="text-red-500 text-md">This field is required.</p>}
                        {errors?.fullName?.type === "pattern" && <p className="text-red-500 text-md">Incorrect format. E.g: Peter Parker.</p>}
                    
                      <label className="text-center" htmlFor="">E-mail:</label>
                      <input className="p-4 rounded-xl text-black" type="email"  {...register("email", {required:true, pattern: /^\S+@\S+\.[a-z]{2,3}$/})} onChange={(e)=>setEmail(e.target.value)} placeholder="E-mail..."  />
                        {errors?.email?.type === "required" && <p className="text-red-500 text-md">This field is required.</p>}
                        {errors?.email?.type === "pattern" && <p className="text-red-500 text-md">Incorrect e-mail format. E.g.: mymail@mail.com.</p>}
                    
                      <label className="text-center" htmlFor="">Telephone:</label>
                      <input className="p-4 rounded-xl text-black" type="text"  {...register("phone", {required:true, pattern: /^[+]*[(]{0,1}[0-9]{1,4}\s[)]{0,1}[\s/0-9]{0,12}$/g})} onChange={(e)=>setPhone(e.target.value)} placeholder="Telephone..." />
                        {errors?.phone?.type === "required" && <p className="text-red-500 text-md">This field is required.</p>}
                        {errors?.phone?.type === "pattern" && <p className="text-red-500 text-md">Incorrect phone format. E.g.: +xx xxx-xxxxxxx</p>}
                    </div>
                    <div className="w-full flex flex-col space-y-6">
                      <div className="w-full flex flex-col">
                        <label className="text-center" htmlFor="">Query:</label>
                        <textarea className="p-4 rounded-xl h-52 text-black" {...register("query", {required:true, maxLength:250})} onChange={(e)=>setQuery(e.target.value)} placeholder="Your query..."  ></textarea>
                          {errors?.query?.type === "required" && <p className="text-red-500 text-md">This field is required.</p>}
                      </div>
                      <input type="submit" value="Send" className={darkMode ? "w-full border rounded-xl shadow-sm shadow-white hover:bg-gray-600" : "w-full border rounded-xl shadow-sm shadow-white bg-orange-300 hover:bg-orange-100"}/>
                    </div>
                  </form>)
              )
          }
      </div>
    </div>
  )
}

export default Contact
