import React from "react";
import NavbarMain from "../../components/Navbar/NavbarMain";

import GigFeed from "./GigFeed";
import BottomNavbar from "./BottomNavbar";
import Sidebar from "./SideBar";
import SearchBar from "./SearchBar";
import GigDetails from "../GigDetails/GigDetails";

const Home = () => {
  return (
    <div className="h-lvh">
      <NavbarMain />
      <main className="flex items-center justify-center">
        <div className="md:container w-full flex md:flex-row flex-col-reverse border">
          <div className="hidden md:block lg:basis-1/5  ">
            <Sidebar />
          </div>

          <div className="w-full lg:basis-3/5">
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <div className="overflow-auto ">
              <GigFeed />
            </div>
          </div>
          <div className="md:hidden">
            <BottomNavbar />
          </div>
          <div className="lg:basis-1/5 hidden lg:block">
            <GigDetails />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
