import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoChevronDownSharp, IoChevronUp, IoSearch } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { FiInbox } from "react-icons/fi";
import Filter from "../../pages/Home/Filter";

const NavbarMain = () => {
  const [drop, setDrop] = useState(false);
  const [role, setRole] = useState("worker");
  return (
    <div>
      <header className="p-4 md:border-b z-20 flex justify-center items-center w-full flex-col border-black/15 md:border-none bg-white sticky top-0  md:backdrop-blur-none backdrop-blur">
        <div className="container">
          <div className="flex justify-between items-center border-black/15  rounded-2xl  mx-auto">
            <div className=" flex gap-4 items-center">
              <div className="border h-10 w-10 rounded-lg inline-flex justify-center items-center border-black/15">
                <Link to={"/"} className="text-2xl font-bold">
                  G
                </Link>
              </div>
              <div>
                <div
                  className="hover:border py-[.25rem] px-[.6875rem] flex justify-center items-center gap-1  rounded-lg "
                  onClick={() => setDrop((prev) => !prev)}
                >
                  <button>{role}</button>
                  {drop ? <IoChevronUp /> : <IoChevronDownSharp />}
                </div>

                {drop && (
                  <div className="absolute p-1 mt-1 rounded-lg flex flex-col justify-center items-center gap-2 bg-white border">
                    <button
                      className={` ${
                        role === "worker" && "bg-gray-100"
                      } rounded-lg py-[.25rem] px-4`}
                      onClick={() =>
                        setRole(
                          (prev) => "worker",
                          setDrop((prev) => !prev)
                        )
                      }
                    >
                      Worker
                    </button>
                    <button
                      className={` ${
                        role === "client" && "bg-gray-100"
                      } rounded-lg py-[.25rem] px-4`}
                      onClick={() =>
                        setRole(
                          (prev) => "client",
                          setDrop((prev) => !prev)
                        )
                      }
                    >
                      Client
                    </button>
                  </div>
                )}
              </div>
            </div>

           <Filter/>
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavbarMain;
