import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PostGig = () => {

  const [error, setError] = useState(null)
  const {user} = useContext(AuthContext)

  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    jobType: "",
    user: user._id,
    location: "",
    budget: "",
    deadline: "",
  });

  const categories = ["Design", "Development", "Marketing", "Writing", "Other"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/gigs",
        formData,
        {
          withCredentials: true, // Include credentials for authentication
        }
      );

      console.log("Gig Posted:", response.data);
      navigate("/home"); // Redirect to home or gig feed after posting
    } catch (err) {
      console.error("Error posting gig:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Failed to post gig");
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Post a Gig</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Gig Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter a title for your gig"
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide a detailed description of the gig"
            className="w-full border rounded-lg p-2 h-24"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block font-medium mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Job Type */}
        <div>
          <label className="block font-medium mb-1">Job Type</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="jobType"
                value="remote"
                checked={formData.jobType === "remote"}
                onChange={handleInputChange}
              />
              Remote
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="jobType"
                value="on-site"
                checked={formData.jobType === "on-site"}
                onChange={handleInputChange}
              />
              On-site
            </label>
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block font-medium mb-1">
            Location (if on-site)
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter the location"
            className="w-full border rounded-lg p-2"
            disabled={formData.jobType === "remote"}
          />
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budget" className="block font-medium mb-1">
            Budget ($)
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            placeholder="Enter your budget"
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Deadline */}
        <div>
          <label htmlFor="deadline" className="block font-medium mb-1">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Post Gig
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostGig;
