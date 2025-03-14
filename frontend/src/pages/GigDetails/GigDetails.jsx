import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const GigDetails = () => {
  const { gigId } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);

  useEffect(() => {
    const fetchGigDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/gigs/${gigId}`
        );
        setGig(response.data);
      } catch (error) {
        console.error("Error fetching gig details:", error);
      }
    };

    fetchGigDetails();
  }, [gigId]);

  console.log(gig);

  if (!gig) return <p>Loading gig details...</p>;

  return (
    <section className="h-full">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
      >
        ← Back
      </button>
      <div className="flex flex-col justify-center w-full  items-center divide-y">
        <div className="w-full">
          {/* <div className="static">
            <Header
              avatar={avatar}
              name={gig.user.name}
              location={gig.location}
              postedAt={gig.postedAt}
            />
          </div> */}

          <section className="w-full  p-4 flex justify-center">
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
                  >
                    {gig.description}
                  </span>
                </p>

                <div className="flex flex-col items-start">
                  <p className="italic">₹100/hour</p>
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

              
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default GigDetails;
