import React from "react";
import NavbarMain from "../../components/Navbar/NavbarMain";

import GigFeed from "./GigFeed";
import BottomNavbar from "./BottomNavbar";
import Sidebar from "./SideBar";
import SearchBar from "./SearchBar";
import GigDetails from "../GigDetails/GigDetails";
import { useLocation } from "react-router-dom";
import MessagingInterface from "../Messages/MessagingInterface";

const Home = () => {
  const { pathname } = useLocation();
  return (
    <div className="h-screen md:flex  justify-center items-center">
      {/* <div className="md:hidden">
        <NavbarMain />
      </div> */}
      <div className="md:h-[93svh] h-full md:container w-full">
        <main className="flex items-center justify-center  md:h-full ">
          <div className=" w-full flex md:flex-row md:h-full flex-col-reverse   border">
            <div className="hidden md:block lg:basis-1/5 border-r ">
              <Sidebar />
            </div>

            {pathname === "/home" && (
              <div className="w-full h-full flex flex-col lg:basis-3/5">
                <div className="hidden md:block">
                  <SearchBar />
                </div>
                <div className="overflow-auto scrollbar-hide scroll-smooth flex-1">
                  <GigFeed />
                </div>
              </div>
            )}

            {pathname === "/home/messages" && (
              <div className="w-full lg:basis-3/5">
                <MessagingInterface />
              </div>
            )}

            {pathname === "/home/gig-details" && (
              <div className="w-full h-svh md:h-full lg:basis-3/5"> 
                <GigDetails />
              </div>
            )}

            {/* <div className="lg:basis-1/5 hidden lg:block border-l">
            </div> */}
            <div className="md:hidden">
              <BottomNavbar />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;

