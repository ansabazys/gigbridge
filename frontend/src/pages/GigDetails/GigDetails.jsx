// src/pages/GigDetails.js
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import img from "../../assets/image.jpg";
import {
  GoArrowLeft,
  GoArrowUpRight,
  GoClock,
  GoKebabHorizontal,
} from "react-icons/go";
import Countdown from "../../components/CountDown";
import { LuDot } from "react-icons/lu";

import Requirements from "../../components/Requirements";
import Location from "../../components/Location";


const GigDetails = () => {
  const { id } = useParams(); // Get the gig id from the URL parameters

  // Find the gig based on the id (in a real app, this would be fetched from a server)
  const gig = [
    {
      id: id,
      title: "Logo Design for Startup",
      description:
        "Looking for a minimalist logo designer for my tech startup. The project requires skills in Adobe Illustrator, Sketch, and Figma. Looking for a minimalist logo designer for my tech startup. The project requires skills in Adobe Illustrator, Sketch, and Figma.",
      image: img,
      user: {
        name: "John Doe",
        avatar: avatar,
      },
      postedAt: "2 h",
      location: "Thrissur",
      jobType: "remote",
      targetDate: "2024-12-14T01:00:00",
    },
  ];

  const [showMoreState, setShowMoreState] = useState(false);

  const qualifications = [
    "Proficiency in Python",
    "2+ years in graphic design",
    "Must own a laptop",
  ];

  const location = "TechHub Co-working Space, Downtown Seattle";
  const address = "1234 Innovation Avenue, Suite 567, Seattle, WA 98101";
  const notes = [
    "Accessible by public transportation (5-minute walk from Pike Place Station).",
    "Free parking available for gig workers in the building garage.",
    "Gig includes travel reimbursements up to $20 per day.",
  ];

  const dateTimeString = "2024-12-14T01:00:00";
  const readableFormat = new Date(dateTimeString).toLocaleString("en-US", {
    weekday: "long", // e.g., Saturday
    year: "numeric", // e.g., 2024
    month: "long",   // e.g., December
    day: "numeric",  // e.g., 14
    hour: "numeric", // e.g., 1 AM
    minute: "numeric", // e.g., 00
  });

  return (
    <section className="h-full">
      
      <div className="flex flex-col justify-center w-full  items-center divide-y">
        {gig.map((gig) => (
          <div className="w-full">
            {/* <div className="static">
              <Header
                avatar={avatar}
                name={gig.user.name}
                location={gig.location}
                postedAt={gig.postedAt}
              />
            </div> */}

            <section className="w-full  p-8 flex justify-center">
              <div
                to={"/home/gig-details"}
                key={gig.id}
                className="w-full max-w-xl h-full  bg-white  overflow-hidden "
              >
                {/* Content */}
                <div className=" grid gap-4">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-3xl">{gig.title}</h3>
                    <p className="italic underline">remote</p>
                  </div>

                  <p className="text-gray-700 inline">
                    <span
                      className={`${
                        showMoreState[gig.id]
                          ? "line-clamp-none"
                          : "line-clamp-2"
                      } inline-flex`}
                    >
                      {gig.description}
                    </span>
                  </p>

                  <div className="flex flex-col items-start">
                    <p className="italic">₹100/hour</p>
                    <p className="italic">{readableFormat}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  {/* Image */}
                  {gig.image ? (
                    <img
                      src={gig.image}
                      alt={gig.title}
                      className="w-full h-80 object-cover"
                    />
                  ) : null}
                  {/* 
                  <div className="mt-1 flex divide-x">
                    <div className="flex items-center gap-2 pl-2">
                      <GoClock />
                      <Countdown targetDate={"2024-12-14T01:00:00"} />
                    </div>
                  </div> */}

                  <Location
                    location={location}
                    address={address}
                    notes={notes}
                  />

                  <Requirements qualifications={qualifications} />
                </div>
              </div>
            </section>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GigDetails;
