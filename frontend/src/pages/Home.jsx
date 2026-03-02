import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getPGs, BASE_URL } from "../services/api";


function Home() {
  const [pgs, setPgs] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    rent: "",
    foodFacility: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (customFilters = {}) => {
    const data = await getPGs(customFilters);
    setPgs(data || []);
  };

  const handleSearch = () => {
    fetchData(filters);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await fetch(`${BASE_URL}/api/pgs/${id}`, {
        method: "DELETE",
      });
      setPgs((prev) => prev.filter((pg) => pg._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (id, e) => {
    e.stopPropagation();
    navigate(`/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-200">

      {/* HEADER */}
      <div className="flex justify-between items-center px-10 py-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold tracking-wide text-emerald-400">
          NextPG
        </h1>

        <button
          onClick={() => navigate("/add")}
          className="bg-emerald-500 hover:bg-emerald-600 transition px-6 py-2 rounded-full font-semibold shadow-lg shadow-emerald-900/40"
        >
          + Add PG
        </button>
      </div>

      {/* SEARCH SECTION */}
      <div className="flex flex-wrap gap-4 justify-center mt-10 px-6">
        <input
          placeholder="Search by City"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          className="bg-gray-800 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <input
          placeholder="Max Rent"
          type="number"
          value={filters.rent}
          onChange={(e) => setFilters({ ...filters, rent: e.target.value })}
          className="bg-gray-800 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <select
          value={filters.foodFacility}
          onChange={(e) =>
            setFilters({ ...filters, foodFacility: e.target.value })
          }
          className="bg-gray-800 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Food Facility</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>

        <button
          onClick={handleSearch}
          className="bg-emerald-500 hover:bg-emerald-600 px-5 py-2 rounded-lg font-semibold transition shadow-md"
        >
          Search
        </button>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">

        {pgs.map((pg) => (
          <div
            key={pg._id}
            onClick={() => navigate(`/pg/${pg._id}`)}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-emerald-900/30 transition duration-300 group cursor-pointer relative"
          >

            {pg.photos && pg.photos.length > 0 && (
              <img
                src={pg.photos[0]}
                alt="PG"
                className="h-52 w-full object-cover group-hover:scale-105 transition duration-300"
              />
            )}

            <div className="p-5">

              <h3 className="text-xl font-semibold text-white mb-2">
                {pg.pgName}
              </h3>

              <p className="text-gray-400">City: {pg.city}</p>
              <p className="text-gray-400">Rent: ₹{pg.rent}</p>

              <p className="mt-2 text-sm">
                {pg.foodFacility ? (
                  <span className="text-emerald-400">Food Available 🍽</span>
                ) : (
                  <span className="text-red-400">No Food ❌</span>
                )}
              </p>

              {/* BOTTOM RIGHT ICONS */}
              <div className="absolute bottom-4 right-5 flex gap-4">

                {/* EDIT */}
                <div className="relative group/icon">
                  <FaEdit
                    onClick={(e) => handleEdit(pg._id, e)}
                    className="text-emerald-400 hover:text-emerald-500 cursor-pointer text-lg"
                  />
                  <span className="absolute bottom-7 left-1/2 -translate-x-1/2 text-xs bg-gray-800 px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 transition whitespace-nowrap">
                    Edit
                  </span>
                </div>

                {/* DELETE */}
                <div className="relative group/icon">
                  <FaTrash
                    onClick={(e) => handleDelete(pg._id, e)}
                    className="text-red-400 hover:text-red-500 cursor-pointer text-lg"
                  />
                  <span className="absolute bottom-7 left-1/2 -translate-x-1/2 text-xs bg-gray-800 px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 transition whitespace-nowrap">
                    Delete
                  </span>
                </div>

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Home;