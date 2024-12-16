import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GoHome, GoBell, GoSearch, GoPerson, GoPlus, GoHomeFill, GoBellFill, GoBriefcase } from "react-icons/go";
import avatar from '../../assets/avatar.png'

const BottomNavbar = () => {

  const {pathname} = useLocation()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white  shadow-md flex justify-around items-center h-12">
      <Link to="/home" className="hover:text-blue-500 flex flex-col w-9 justify-center items-center">
      { pathname === '/home' ? <GoHomeFill className="text-2xl" /> : <GoHome className="text-2xl"/>}
        
      </Link>
      <Link to="/search" className="text-gray-600 hover:text-blue-500 w-9 flex flex-col justify-center items-center">
      { pathname === '/search' ? <GoSearch className="text-2xl font-bold text-black" /> : <GoSearch className="text-2xl"/>}
      </Link>
      <Link to="/home/post-gigs" className="text-gray-600 hover:text-blue-500 w-9 flex flex-col justify-center items-center">
      { pathname === '/post-gig' ? <GoPlus className="text-3xl font-bold text-black" /> : <GoPlus className="text-3xl"/>}
      </Link>
      <Link to="/showcase" className="text-gray-600 hover:text-blue-500 w-9 flex flex-col justify-center items-center">
      { pathname === '/showcase' ? <GoBriefcase className="text-2xl font-bold text-black" /> : <GoBriefcase className="text-2xl"/>}
      </Link>
      <Link to="/home/profile" className="text-gray-600 w-9 hover:text-blue-500 flex flex-col justify-center items-center">
      <img
          src={avatar}
          alt="Profile"
          className="w-9 h-9 rounded-full"
        />
      </Link>
    </div>
  );
};

export default BottomNavbar;
