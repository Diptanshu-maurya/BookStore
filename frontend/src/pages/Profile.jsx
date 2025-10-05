import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader";

function Profile() {
  const API_URL = import.meta.env.VITE_API_URL;
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [profile, setProfile] = useState();

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `${API_URL}/api/v1/get-user-information`,
        { headers }
      );
      setProfile(response.data.data);
    }
    getData();
  }, []);

  return (
    <div className="bg-zinc-600 px-4 md:px-8 flex flex-col md:flex-row min-h-screen py-6 gap-6">

      {!profile ? (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-full md:w-1/4 bg-zinc-400 p-4 rounded-lg shadow-lg">
            <Sidebar data={profile} />
          </div>
          <div className="w-full md:w-3/4 bg-zinc-400 p-6 rounded-lg shadow-lg">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
