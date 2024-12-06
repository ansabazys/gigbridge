import React from "react";
import herodesktop from "../../assets/605shots_so.png";
import heromobile from "../../assets/256shots_so.png";
import herotablet from "../../assets/695shots_so.png";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="flex flex-col justify-center items-center text-center">
      <div className="container px-4 flex gap-6 flex-col items-center text-center py-16 justify-center">
        <h1 className="lg:text-6xl text-5xl  font-bold tracking-tighter">
          Find Work, <br />
          Post Jobs, Get Things Done!
        </h1>
        <p className="max-w-xl text-black/80">
          GigBridge connects freelancers and employers in one seamless platform.{" "}
          Whether you're looking for work or talent, we've got you covered.
        </p>

        <div className="flex gap-4">
          <Link to={"/register"}><Button>Get GigBridge free</Button></Link>
          <button className="py-2 px-6 font-medium text-sm  bg-[#f0e4ff] text-[#4a208a]   rounded-lg z-10 hover:bg-[#b9a0df] cursor-pointer"><Link to={"/login"}>Post a Gig</Link></button>
        </div>

        <picture className="max-w-max grid place-content-center">
          {/* Load the desktop image for large screens */}
          <source media="(min-width:1024px)" srcSet={herodesktop} />

          {/* Load the tablet image for medium screens */}
          <source media="(min-width:768px)" srcSet={herotablet} />

          {/* Load the mobile image for smaller screens */}
          <source media="(max-width:767px)" srcSet={heromobile} />

          {/* Fallback image for browsers that don't support <picture> */}
          <img className="lg:-mt-[8rem]" src={heromobile} alt="Flowers" />
        </picture>
      </div>
    </section>
  );
};

export default Hero;
