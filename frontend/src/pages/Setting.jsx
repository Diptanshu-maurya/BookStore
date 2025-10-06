import React, { useState, useEffect } from "react";
import axios from "axios";

function Setting() {
   const API_URL = import.meta.env.VITE_API_URL;
  const [address, setAddress] = useState("");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          `${API_URL}/api/v1/get-user-information`,
          { headers }
        );
        setAddress(response.data.data.address || ""); // Prevents null issues
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    }
    getData();
  }, []);

  async function handleAddress() {
    if (!address.trim()) {
      alert("Address cannot be empty!");
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/api/v1/update-address/`,
        { address },
        { headers }
      );
      console.log("Address updated successfully:", response.data);
      alert("Address updated successfully!");
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address. Try again.");
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Update Address</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Address</label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          rows="3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address..."
        />
      </div>

      <button
        onClick={handleAddress}
        className="w-full bg-zinc-600 text-white py-2 px-4 rounded-lg hover:bg-zinc-700 transition"
      >
        Update Address
      </button>
    </div>
  );
}

export default Setting;
