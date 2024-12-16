import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  GoBell,
  GoBellFill,
  GoBriefcase,
  GoHome,
  GoHomeFill,
  GoPerson,
  GoPlus,
  GoSignOut,
} from "react-icons/go";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { BiMessage, BiSolidMessage } from "react-icons/bi";
import avatar from "../../assets/avatar.png";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { logout, user } = useContext(AuthContext);

  return (
    <div className="lg:grid w-full sm:flex gap-4 h-full">
      <aside className=" lg:w-full  w-fit flex flex-row md:flex-col  lg:items-start items-center justify-between">
        {/* User Profile */}
        <div className="p-4 border-b h-20 w-full flex gap-4 items-center">
          <img
            src={avatar}
            alt="Profile"
            className="w-9 h-9 lg:w-12 lg:h-12 rounded-full"
          />
          <div className="hidden lg:block">
            <h2 className=" text-lg font-medium">{user.fname}</h2>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-1 justify-between flex-col w-full ">
          <div className="flex-1 p-3 space-y-4 w-full md:block flex">
            <SidebarItem
              to="/home"
              icon={pathname === "/home" ? <GoHomeFill /> : <GoHome />}
              label="Home"
            />

            <SidebarItem
              to="/home/messages"
              icon={
                pathname === "/home/messages" ? (
                  <BiSolidMessage />
                ) : (
                  <BiMessage />
                )
              }
              label="Messages"
            />

            {/* <SidebarItem
            to="/home/find-gigs"
            icon={<GoSearch />}
            label="Find Gigs"
          /> */}

            <SidebarItem
              to="/home/post-gigs"
              icon={<GoPlus size={20} />}
              label="Post gig"
            />

            <SidebarItem
              to="/home/my-gigs"
              icon={<GoBriefcase />}
              label="Showcase "
            />

            <SidebarItem
              to="/home/notifications"
              icon={
                pathname === "/home/notifications" ? <GoBellFill /> : <GoBell />
              }
              label="Notifications"
            />
            {/* <SidebarItem
            to="/home/wallet"
            icon={pathname === "/wallet" ? <BiSolidDashboard /> : <BiWallet />}
            label="Wallet"
          /> */}

            <SidebarItem
              to="/home/profile"
              icon={<GoPerson />}
              label="Profile"
            />
          </div>
          <div className="p-3">
            <SidebarItem
              to="/home/settings"
              icon={
                pathname === "/settings" ? (
                  <IoSettingsSharp />
                ) : (
                  <IoSettingsOutline />
                )
              }
              label="Account Settings"
            />
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 w-full hidden  items-center   lg:block md:flex justify-center border-t">
          <button
            className="flex space-x-2 items-center px-1 text-red-400 hover:text-red-600"
            onClick={logout}
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
