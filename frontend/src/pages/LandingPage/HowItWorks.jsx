import React from 'react';
import { FaUserPlus, FaSearch, FaComments, FaWallet } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-blue-500 text-5xl" />,
      title: "Sign Up for Free",
      description: "Whether you're a freelancer or an employer, setting up your account is quick and easy."
    },
    {
      icon: <FaSearch className="text-green-500 text-5xl" />,
      title: "Find the Right Opportunity",
      description: "Freelancers can search for jobs that match their skills. Employers can post detailed gig requirements."
    },
    {
      icon: <FaComments className="text-yellow-500 text-5xl" />,
      title: "Communicate Effectively",
      description: "Use our built-in messaging system to discuss details and ensure smooth collaboration."
    },
    {
      icon: <FaWallet className="text-purple-500 text-5xl" />,
      title: "Secure Payments",
      description: "Submit your work, get approval, and receive your payment through our secure system."
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-6">How It Works</h2>
        <p className="text-lg text-gray-700 mb-12">
          Getting started with GigWork is simple. Follow these easy steps to find or post gigs today!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12">
          <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:opacity-90 transition duration-300">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
