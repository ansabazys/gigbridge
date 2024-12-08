import React from "react";
import { Link } from "react-router-dom";
import { GoHome, GoBell, GoSearch, GoPerson, GoPlus } from "react-icons/go";
import avatar from '../../assets/avatar.png'

const BottomNavbar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around items-center h-12">
      <Link to="/home" className="text-gray-600 hover:text-blue-500 flex flex-col justify-center items-center">
        <GoHome className="text-2xl" />
      </Link>
      <Link to="/search" className="text-gray-600 hover:text-blue-500 flex flex-col justify-center items-center">
        <GoSearch className="text-2xl" />
      </Link>
      {/* <Link to="/search" className="text-gray-600 hover:text-blue-500 flex flex-col justify-center items-center">
        <GoPlus className="text-2xl" />
      </Link> */}
      <Link to="/notifications" className="text-gray-600 hover:text-blue-500 flex flex-col justify-center items-center">
        <GoBell className="text-2xl" />
      </Link>
      <Link to="/profile" className="text-gray-600 hover:text-blue-500 flex flex-col justify-center items-center">
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
