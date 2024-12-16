import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Filter from "../../pages/Home/Filter";
import { GoArrowLeft, GoBell, GoBellFill, GoComment } from "react-icons/go";


const NavbarMain = () => {

  const {pathname} = useLocation()

  return (
    <div>
      <header className="p-3 md:border-b z-20 flex justify-center items-center w-full flex-col border-black/15 md:border-none bg-white sticky top-0  md:backdrop-blur-none backdrop-blur">
        <div className="container">
          <div className="flex justify-between items-center border-black/15  rounded-2xl  mx-auto">
            <div className=" flex gap-4 items-center">
              <div className=" h-10 w-10 rounded-lg inline-flex justify-center items-center border-black/15">

                <Link to={pathname === "/home" ? "/" : "/home"} className="text-2xl font-bold">
                  {pathname === "/home" ? "G" : <GoArrowLeft/>}
                </Link>
              </div>
            </div>
            {/* 
            <Filter /> */}
            <div className="flex  gap-4">
              <Link
                to="/home/notifications"
                className="text-gray-600 hover:text-blue-500 flex flex-col justify-center md:hidden items-center"
              >
                {pathname.includes("notification") ? <GoBellFill className="text-2xl" /> : <GoBell className="text-2xl" />}
              </Link>
              <Link
                to="/home/messages"
                className="text-gray-600 hover:text-blue-500 flex flex-col justify-center md:hidden items-center"
              >
                <GoComment className="text-2xl" />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavbarMain;
