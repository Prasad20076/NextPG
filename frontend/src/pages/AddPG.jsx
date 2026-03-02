import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../services/api";

function AddPG() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pgName: "",
    ownerName: "",
    city: "",
    address: "",
    rent: "",
    contactNumber: "",
    photos: "",
    foodFacility: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      photos: formData.photos ? [formData.photos] : []
    };

    await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex justify-center items-center p-6 relative">

      {/* 🔥 BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-emerald-400 hover:text-emerald-300 transition font-medium"
      >
        ← Back
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-5"
      >
        <h2 className="text-3xl font-bold text-emerald-400 text-center mb-4">
          Add New PG
        </h2>

        <input
          name="pgName"
          placeholder="PG Name"
          value={formData.pgName}
          onChange={handleChange}
          required
          className="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        <input
          name="ownerName"
          placeholder="Owner Name"
          value={formData.ownerName}
          onChange={handleChange}
          required
          className="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
          className="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        <input
          name="rent"
          type="number"
          placeholder="Rent"
          value={formData.rent}
          onChange={handleChange}
          required
          className="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        <input
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
          className="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        <input
          name="photos"
          placeholder="Photo URL"
          value={formData.photos}
          onChange={handleChange}
          className="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="foodFacility"
            checked={formData.foodFacility}
            onChange={handleChange}
            className="accent-emerald-500"
          />
          <label className="text-gray-300">
            Food Facility Available
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 transition py-3 rounded-lg font-semibold shadow-md"
        >
          Add PG
        </button>

      </form>
    </div>
  );
}

export default AddPG;