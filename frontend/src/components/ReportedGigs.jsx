import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ReportedGigs = () => {
  const [reportedGigs, setReportedGigs] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reports/reported-gigs");
        setReportedGigs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReports();
  }, []);

  const handleDeleteGig = async (gigId) => {
    if (!window.confirm("Are you sure you want to delete this gig?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/reports/delete-gig/${gigId}`);
      setReportedGigs(reportedGigs.filter((report) => report.gigId._id !== gigId));
      alert("Gig deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error deleting gig!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Reported Gigs</h2>

      {reportedGigs.length === 0 ? (
        <p className="text-gray-500">No reported gigs.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Gig Title</th>
              <th className="border p-2">Reason</th>
              <th className="border p-2">Reported By</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {reportedGigs.map((report) => (
              <tr key={report._id} className="text-center">
                <td className="border p-2">
                  {/* Clicking the gig title will navigate to the gig details page */}
                  <Link
                    to={`/gig-details/${report.gigId._id}`}
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    {report.gigId.title}
                  </Link>
                </td>
                <td className="border p-2">{report.reason}</td>
                <td className="border p-2">{report.reportedBy.email}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDeleteGig(report.gigId._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportedGigs;
