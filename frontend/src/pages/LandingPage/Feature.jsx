import React from "react";
import {
  FaBriefcase,
  FaDollarSign,
  FaShieldAlt,
  FaUserCircle,
  FaRegCommentDots,
  FaBell,
} from "react-icons/fa";
import chain from "../../assets/chain.png";

const Feature = () => {
  const features = [
    {
      icon: <FaBriefcase className="text-purple-500 text-5xl" />,
      title: "Easy Job Management",
      description:
        "Post jobs, accept applications, and manage projects all in one place.",
      link: "More about job management",
    },
    {
      icon: <FaDollarSign className="text-green-500 text-5xl" />,
      title: "Secure Payments",
      description:
        "Get paid securely with reliable payment methods and real-time payouts.",
      link: "More about payments",
    },
    {
      icon: <FaShieldAlt className="text-blue-500 text-5xl" />,
      title: "Verified Security",
      description:
        "Your data and transactions are protected with top-tier encryption.",
      link: "Learn about security",
    },
    {
      icon: <FaUserCircle className="text-teal-500 text-5xl" />,
      title: "Customizable Profiles",
      description:
        "Build your unique profile to showcase your skills and experience.",
      link: "More about profiles",
    },
    {
      icon: <FaRegCommentDots className="text-orange-500 text-5xl" />,
      title: "24/7 Customer Support",
      description:
        "Get help anytime with our responsive customer support team.",
      link: "Contact support",
    },
    {
      icon: <FaBell className="text-yellow-500 text-5xl" />,
      title: "Instant Notifications",
      description:
        "Receive real-time updates on job applications, messages, and more.",
      link: "Learn about notifications",
    },
  ];

  return (
    <section className="flex justify-center p-4 ">
      <div className="container flex flex-col items-center">
        <div className="text-center">
          <h2 className="text-5xl tracking-tighter font-semibold mb-4">
            Why Choose GigWork?
          </h2>
          <p className="text-xl text-gray-700 mb-12">
            Discover the features that make managing gigs, projects, and
            payments easy.
          </p>
        </div>

        <div className="md:grid flex flex-col md:grid-cols-3  gap-4 max-w-5xl">

          <div className="border grid col-span-2 p-5 rounded-xl">
            <h1>conversion</h1>
            <div className="flex">
              <div className=" content-end grid gap-3">
                <h1 className="text-3xl leading-7 font-bold tracking-tighter">
                  Easy Job <br /> Management
                </h1>
                <p className="leading-5">
                  Post jobs, accept applications, and manage projects all in one
                  place.
                </p>
              </div>
              <div>
                <img src={chain} width={200} alt="" />
              </div>
            </div>
          </div>

          <div className="border grid gap-4 rounded-xl p-5">
            <h1>conversion</h1>
            <div className="flex justify-center items-center">
              <img src={chain} width={200} alt="" />
            </div>
            <div className="">
              <div className="gap-3 grid">
                <h1 className="text-3xl leading-7 tracking-tighter font-bold">
                Secure Payments
                </h1>
                <p className="leading-5">
                Get paid securely with reliable payment methods and real-time payouts.
                </p>
              </div>
            </div>
          </div>

          <div className="border grid gap-4 rounded-xl p-5">
            <h1>conversion</h1>
            <div className="flex justify-center items-center">
              <img src={chain} width={200} alt="" />
            </div>
            <div className="">
              <div className="gap-3 grid">
                <h1 className="text-3xl leading-7 tracking-tighter font-bold">
                Verified Security
                </h1>
                <p className="leading-5">
                Your data and transactions are protected with top-tier encryption.",
                link: "Learn about security
                </p>
              </div>
            </div>
          </div>

          <div className="border grid col-span-2 p-5 rounded-xl">
            <h1>conversion</h1>
            <div className="flex">
              <div className=" content-end grid gap-3">
                <h1 className="text-3xl leading-7 font-bold tracking-tighter">
                Instant Notifications
                </h1>
                <p className="leading-5">
                Receive real-time updates on job applications, messages, and more.
                </p>
              </div>
              <div>
                <img src={chain} width={200} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
