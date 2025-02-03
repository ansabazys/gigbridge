import React, { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../../context/AuthContext";
import Apply from "./Apply";

const Home = () => {
  const { pathname } = useLocation();

  const [gigs, setGigs] = useState([]); // Original list of gigs
  const [filteredGigs, setFilteredGigs] = useState([]); // Filtered gigs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGigUser, setIsGigUser] = useState(false);
  const [filter, setFilter] = useState({
    search: "",
    category: [],
    location: "",
    jobType: "",
  });

  const { user } = useContext(AuthContext);
  const { fname, lname, _id } = user;


  const getGigs = () => {
    axios
      .get("http://localhost:5000/api/gigs")
      .then((response) => {
        setGigs(response.data);
        setFilteredGigs(response.data); // Initialize filtered gigs with all gigs
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching gigs");
        setLoading(true);
      });
  };

  useEffect(() => {
    getGigs();
  }, [pathname, loading]);

  // Handle delete action
  const handleDelete = async (deleteId) => {
    if (window.confirm("Are you sure you want to delete this gig?")) {
      try {
        setLoading(true);

        // Send the DELETE request with a valid authorization token
        const token = localStorage.getItem("token"); // Replace with your token storage mechanism
        const response = await axios.delete(
          `http://localhost:5000/api/gigs/delete/${deleteId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.message);
        setLoading(false);

        // Optionally, remove the gig from the local UI
        // Example: If you're maintaining a list of gigs, filter out the deleted one
      } catch (error) {
        console.error("Error deleting gig:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFilter = (key, value) => {
    console.log(key);
    setFilter((prev) => {
      const updatedFilter = { ...prev, ...value };

      console.log(updatedFilter);

      // Safely handle values
      const searchValue =
        typeof updatedFilter.search === "string" ? updatedFilter.search : "";
      const categoryValue = updatedFilter.category || [];
      const locationValue =
        typeof updatedFilter.location === "string"
          ? updatedFilter.location.trim()
          : "";
      const jobTypeValue =
        typeof updatedFilter.jobType === "string"
          ? updatedFilter.jobType.trim()
          : "";

      // // Apply strict filtering logic
      // const filtered = gigs.filter((gig) => {
      //   const matchesSearch = searchValue === "" || gig.title.toLowerCase().includes(searchValue);
      //   const matchesCategory = categoryValue.length === 0 || categoryValue.some((cat) => gig.category.includes(cat));
      //
      //   const matchesJobType = jobTypeValue === "" || gig.jobType === jobTypeValue;

      //   // Ensure the gig matches all active filters
      //   return matchesSearch || matchesCategory || matchesLocation || matchesJobType;
      // });

  

      const filtered = gigs.filter((gig) => {
        console.log(gig);
        const matchesSearch =
          searchValue === "" ||
          gig.title.toLowerCase().includes(searchValue.toLowerCase());
        const matchesCategory =
          categoryValue.length === 0 ||
          categoryValue.some((cat) => gig.category.includes(cat));
        const matchesJobType =
          jobTypeValue === "" || gig.jobType === jobTypeValue;
        const matchesLocation =
          locationValue === "" || gig.location === locationValue;

        return (
          matchesSearch && matchesCategory && matchesLocation && matchesJobType
        );
      });

      console.log(filtered);

      setFilteredGigs(filtered); // Update filtered gigs
      return updatedFilter; // Update the filter state
    });
  };

  return (
    <div className="h-screen md:flex justify-center items-center">
      <div className="md:hidden sticky top-0">
        <NavbarMain />
      </div>
      <div className="md:h-[93svh]  md:container w-full">
        <main className="flex  justify-center h-full md:h-full">
          <div className="w-full flex md:flex-row md:h-full flex-col-reverse border">
            <div className="hidden md:block lg:basis-1/5 border-r">
              <Sidebar />
            </div>

            {pathname === "/home" && (
              <div className="w-full flex flex-col lg:basis-3/5">
                <div className="hidden md:block">
                  <SearchBar
                    searchValue={(value) => handleFilter("search", value)}
                    locationValue={(value) => handleFilter("location", value)}
                    jobTypeValue={(value) => handleFilter("jobType", value)}
                    categoryValue={(value) => handleFilter("category", value)}
                  />
                </div>
                <div className="overflow-auto scrollbar-hide scroll-smooth flex-1">
                  {filteredGigs.length > 0 ? (
                    filteredGigs.reverse().map((gig) => {
                      const isApplied = gig.application.some(
                        (item) => item.applicantId === _id
                      );
                      
                      return (
                        <GigFeed
                          gig={gig}
                          key={gig._id}
                          handleDelete={handleDelete}
                          isGigUser={gig.user === _id}
                          isApplied = {isApplied}
                        />
                      );
                    })
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <p>Not found</p>
                    </div>
                  )}
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
                  <NotificationPage userId={_id} gigs={filteredGigs}  />
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

            {pathname.includes("apply") && (
              <div className="w-full h-svh md:h-full flex flex-col lg:basis-3/5">
                <div className=" overflow-auto scrollbar-hide scroll-smooth flex-1 ">
                  <Apply />
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
