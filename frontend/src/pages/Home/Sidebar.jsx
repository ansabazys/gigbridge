import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GoBell, GoBellFill, GoComment, GoHome, GoHomeFill, GoQuestion, GoSignOut } from "react-icons/go";
import {  IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { BiSolidDashboard, BiSolidMessage, BiWallet } from "react-icons/bi";
import avatar from '../../assets/avatar.png'




const Sidebar = ({ user, onLogout }) => {

    const {pathname} = useLocation()


  return (
    <div className="lg:grid w-full sm:flex gap-4">
    <aside className=" border-r lg:w-full  w-fit flex md:h-[91svh]  flex-row md:flex-col  lg:items-start items-center justify-between">
      {/* User Profile */}
      <div className="p-4 border-b h-20 w-full flex gap-4 items-center">
        <img
          src={avatar}
          alt="Profile"
          className="w-9 h-9 lg:w-14 lg:h-14 rounded-full"
        />
        <div className="hidden lg:block" >
        <h2 className=" text-lg font-semibold">Ansab</h2>
        <span className="text-sm text-gray-400">Worker</span>
        </div>
      </div>  


      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-4 w-full md:block flex">
        <SidebarItem to="/home" icon={pathname === "/home" ? <GoHomeFill/> : <GoHome/>} label="Home" />
        {/* {user.role === "worker" && (
          <SidebarItem to="/home/find-gigs" icon={<FaSearch />} label="Find Gigs" />
        )} */}
        {/* {user.role === "client" && (
          <SidebarItem to="/home/my-gigs" icon={<FaFolder />} label="My Gigs" />
        )} */}
        <SidebarItem to="/home/messages" icon={pathname === "/messages" ? <BiSolidMessage /> : <GoComment />}  label="Messages" />
        <SidebarItem to="/home/notifications" icon={pathname === "/notifications" ?<GoBellFill /> : <GoBell />} label="Notifications" />
        <SidebarItem to="/home/wallet" icon={pathname === "/wallet" ?<BiSolidDashboard /> : <BiWallet />} label="Wallet" />
        <SidebarItem to="/home/settings" icon={pathname === "/settings" ?<IoSettingsSharp/> : <IoSettingsOutline/>} label="Account Settings" />
      </nav>

      {/* Logout Button */}
      <div className="p-4 w-full hidden  lg:block md:flex justify-center border-t">
        <button
          className="flex items-center space-x-2 text-red-400 hover:text-red-600"
          onClick={onLogout}
        > 
          <GoSignOut />
          <span className="hidden lg:block">Logout</span>
        </button>
      </div>
    </aside>
    </div>
  );
};

const SidebarItem = ({ to, icon, label }) => {
  console.log(label)
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 p-2 rounded-lg w-full hover:bg-gray-100`}
    >
      <span className="text-xl">{icon}</span>
      <span className="hidden lg:block">{label}</span>
    </Link>
  );
};

export default Sidebar;
