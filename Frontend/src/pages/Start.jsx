import React from 'react'
import {Link} from 'react-router-dom'

const Start = () => {
  return (
    <div className="h-screen w-full">
      <div className="bg-cover bg-top md:bg-left bg-[url('https://images.unsplash.com/photo-1624724126923-e2c021df1311?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0')] h-full flex flex-col justify-between">
        
        {/* Logo */}
        <img
          className="w-16 ml-8 mt-6 md:w-24 md:ml-12 md:mt-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber"
        />

        {/* Content box */}
        <div className="
          bg-white py-6 px-5 pb-8 
          md:rounded-2xl md:shadow-lg md:max-w-md md:mx-auto md:my-auto
        ">
          <h2 className="text-3xl md:text-4xl font-bold">Get Started with Uber</h2>
          <Link to={"/login"} className=" flex justify-center items-center w-full hover:cursor-pointer bg-black text-white py-3 rounded mt-5 hover:bg-gray-800 transition">
            Continue
          </Link>
        </div> 
      </div>
    </div>
  )
}

export default Start;
