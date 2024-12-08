import React, { useState } from "react";
import { BiMenuAltRight, BiX } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = ["Features", "How it works?", "Contact"];
  const location = useLocation();

  const handleMenuBar = () => {
    setMenuOpen((prev) => !prev);
  };

  console.log(location.pathname);

  return (
    <header className="p-4 border-b z-20 flex justify-center items-center w-full flex-col border-black/15 md:border-none bg-white sticky top-0  md:backdrop-blur-none backdrop-blur">
      <div className="container">
        <div className="flex justify-between items-center border-black/15  rounded-2xl  mx-auto">
          <div className="md:px-4 w-52 ">
            <div className="border h-10 w-10 rounded-lg inline-flex justify-center items-center border-black/15">
              <Link to={"/"} className="text-2xl font-bold">
                G
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <nav className="flex gap-6 ">
              {navLinks.map((item) => (
                <a
                  className="text-black/60 hover:text-black transition hover:border border-none py-0.5 border-black/15 px-2.5 rounded-md hover:bg-gray-200"
                  href="#"
                  key={Math.random()}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex gap-4 items-center lg:w-56 justify-end  md:pr-4">
            <button className="py-[.25rem] px-[.6875rem] hover:border border-black/15 rounded-lg font-medium md:block hidden">
              {location.pathname === "/register" ? (
                <Link to={"/login"}>Log in</Link>
              ) : location.pathname === "/login" ? (
                <Link to={"/register"}>Sign up</Link>
              ) : (
                <Link to={"/login"}>Log in</Link>
              )}
            </button>

            {location.pathname === "/register" ||
            location.pathname === "/login" ? null : (
              <button className="py-[.25rem] px-[.6875rem] hidden md:block bg-gray-200 rounded-lg">
                <Link to={"/register"}>Try it for free</Link>
              </button>
            )}

            {menuOpen ? (
              <BiX size={30} className="lg:hidden" onClick={handleMenuBar} />
            ) : (
              <BiMenuAltRight
                size={30}
                className="lg:hidden"
                onClick={handleMenuBar}
              />
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="w-full transition pt-8">
          <nav className="flex flex-col gap-3 items-start  ">
            {navLinks.map((item) => (
              <a
                className="text-black/60 hover:text-black transition hover:border border-none py-0.5 border-black/15 px-2.5 rounded-md hover:bg-gray-200"
                href="#"
                key={Math.random()}
              >
                {item}
              </a>
            ))}

            <button className="py-[.25rem] px-[.6875rem]  hover:border border-black/15 rounded-lg font-medium block md:hidden">
              {location.pathname === "/register" ? (
                <Link to={"/login"}>Log in</Link>
              ) : location.pathname === "/login" ? (
                <Link to={"/register"}>Sign in</Link>
              ) : (
                <Link to={"/login"}>Log in</Link>
              )}
            </button>
            <button className="py-[.25rem] px-[.6875rem] md:hidden block bg-gray-200 rounded-lg">
              Try it for free
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
