import React, { useEffect, useState } from "react";
import NavbarMain from "../../components/Navbar/NavbarMain";

import GigFeed from "./GigFeed";
import BottomNavbar from "./BottomNavbar";
import Sidebar from "./SideBar";
import SearchBar from "./SearchBar";
import GigDetails from "../GigDetails/GigDetails";
import { useLocation } from "react-router-dom";
import MessagingInterface from "../Messages/MessagingInterface";
import Header from "../../components/Header";
import PostGig from "./PostGig";
import NotificationPage from "../Notifications/NotificationPage";
import ProfilePage from "../Profile/ProfilePage";
import AccountSettingsPage from "./AccountSettingsPage";
import NotificationHeader from "../../components/NotificationHeader";
import axios from "axios";

const Home = () => {
  const { pathname } = useLocation();

  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getGigs = () => {
    axios
      .get("http://localhost:5000/api/gigs")
      .then((response) => {
        setGigs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching gigs");
        setLoading(true);
      });
  };

  useEffect(() => {
    getGigs();
  },[pathname]);



  return (
    <div className="h-screen md:flex  justify-center items-center">
      <div className="md:hidden sticky top-0">
        <NavbarMain />
      </div>
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
                  {gigs.reverse().map((gig) => (
                  <GigFeed gig={gig} />
                  ))}
                </div>
              </div>
            )}

            {pathname === "/home/messages" && (
              <div className="w-full lg:basis-3/5">
                <MessagingInterface />
              </div>
            )}
            {pathname === "/home/post-gigs" && (
              <div className="w-full lg:basis-3/5 overflow-auto scrollbar-hide scroll-smooth flex-1">
                <PostGig />
              </div>
            )}
            {pathname === "/home/notifications" && (
              <div className="w-full h-full flex flex-col lg:basis-3/5">
                <NotificationHeader />
                <div className="w-full lg:basis-3/5 overflow-auto scrollbar-hide scroll-smooth flex-1">
                  <NotificationPage />
                </div>
              </div>
            )}
            {pathname === "/home/profile" && (
              <div className="w-full lg:basis-3/5 overflow-auto scrollbar-hide scroll-smooth flex-1">
                <ProfilePage />
              </div>
            )}
            {pathname === "/home/settings" && (
              <div className="w-full lg:basis-3/5 overflow-auto scrollbar-hide scroll-smooth flex-1">
                <AccountSettingsPage />
              </div>
            )}

            {pathname === "/home/gig-details" && (
              <div className="w-full h-svh md:h-full flex flex-col lg:basis-3/5">
                <Header />

                <div className=" overflow-auto scrollbar-hide scroll-smooth flex-1 ">
                  <GigDetails />
                </div>
              </div>
            )}

            <div className="lg:basis-1/5 hidden lg:block border-l"></div>
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
