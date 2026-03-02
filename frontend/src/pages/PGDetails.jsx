import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PGDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pg, setPg] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/pgs/${id}`)
      .then((res) => res.json())
      .then((data) => setPg(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!pg)
    return (
      <div className="min-h-screen flex items-center justify-center text-emerald-400">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-200 p-10">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-emerald-400 hover:underline"
      >
        ← Back
      </button>

      <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl shadow-xl overflow-hidden">

        {pg.photos && pg.photos.length > 0 && (
          <img
            src={pg.photos[0]}
            alt="PG"
            className="w-full h-80 object-cover"
          />
        )}

        <div className="p-8 space-y-4">

          <h1 className="text-3xl font-bold text-white">
            {pg.pgName}
          </h1>

          <p><span className="text-gray-400">Owner:</span> {pg.ownerName}</p>
          <p><span className="text-gray-400">City:</span> {pg.city}</p>
          <p><span className="text-gray-400">Address:</span> {pg.address}</p>
          <p><span className="text-gray-400">Rent:</span> ₹{pg.rent}</p>
          <p><span className="text-gray-400">Contact:</span> {pg.contactNumber}</p>

          <p>
            {pg.foodFacility ? (
              <span className="text-emerald-400 font-semibold">
                Food Available 🍽
              </span>
            ) : (
              <span className="text-red-400 font-semibold">
                No Food Facility ❌
              </span>
            )}
          </p>

        </div>
      </div>
    </div>
  );
}

export default PGDetails;