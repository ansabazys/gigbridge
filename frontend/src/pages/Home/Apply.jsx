import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Apply = () => {
  const { id } = useParams(); // Get the gig ID from the URL params
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [msg, setMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolio: "",
    coverLetter: "",
  });

  const [loading, setLoading] = useState(false);
  const [gig, setGig] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getGig = async () => {
    const response = await axios.get(`http://localhost:5000/api/gigs/${id}`);
    setGig(response.data);
  };

  useEffect(() => {
    getGig();
  }, []);

  //   // Handle form submission
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     if (
  //       !formData.name ||
  //       !formData.email ||
  //       !formData.portfolio ||
  //       !formData.coverLetter
  //     ) {
  //       toast.error("Please fill in all the fields.");
  //       return;
  //     }

  //     try {
  //       setLoading(true);
  //       const token = localStorage.getItem("token"); // Fetch the token from localStorage

  //       const response = await axios.post(
  //         `http://localhost:5000/api/gigs/${id}/apply`,
  //         formData,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       toast.success("Application submitted successfully!");
  //       navigate(`/gigs/${gigId}`); // Redirect to the gig details page
  //     } catch (error) {
  //       console.error("Error applying to gig:", error);
  //       toast.error(
  //         error.response?.data?.message || "Failed to submit application."
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/gigs/${id}/apply`,
        {
          applicantId: user._id,
          applicantName: `${user.fname} ${user.lname}`,
          message: msg,
        }
      );

      console.log("Application successful:", response.data);
      navigate("/home");
    } catch (error) {
      console.error(
        "Error applying to gig:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-md shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-5">{gig.title}</h2>
      <p>{gig.description}</p>
      <form onSubmit={handleApply}>
        <div className="mb-4">
          <label
            htmlFor="coverLetter"
            className="block text-sm font-medium text-gray-700"
          >
            Cover Letter
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Write a brief cover letter explaining why you're a good fit for this gig"
            rows="5"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default Apply;
