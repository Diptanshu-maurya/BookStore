import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineFavorite } from "react-icons/md";
import { RiChatHistoryFill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { Button } from "@mui/material";
import  {useDispatch} from "react-redux"
import {authActions} from "../store/auth"
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux"
import { IoAddCircle } from "react-icons/io5";

function Sidebar({ data }) {
   const role= useSelector((state)=> state.auth.role);
    const dispatch=useDispatch();
    const nav=useNavigate();
   
    function handleLogout(){
        
      dispatch(authActions.logout());
      dispatch(authActions.changeRole("user"));
      localStorage.clear("id");
      localStorage.clear("token");
      localStorage.clear("role");
      nav("/");
       
    }


  return (
    <div className="bg-zinc-700 text-white p-6 rounded-lg flex flex-col items-center shadow-lg w-full">
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center">
        <img
          src="/img1.jpg"
          alt="Profile"
          className="h-24 w-24 rounded-full border-4 border-white shadow-md"
        />
        <p className="mt-4 font-semibold text-xl">{data.username}</p>
        <p className="text-sm text-gray-300">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-gray-500 hidden md:block"></div>
      </div>

      {/* Navigation Links */}
      {role=="user" &&
      <div className="flex flex-col mt-8 w-full gap-4">
        <Link
          to="Favorites"
          className="flex items-center gap-3 p-3 rounded-md bg-gray-600 hover:bg-gray-800 transition duration-300"
        >
          <MdOutlineFavorite className="text-xl text-red-400" />
          <span className="text-lg font-medium">Favorites</span>
        </Link>

        <Link
          to="OrderHistory"
          className="flex items-center gap-3 p-3 rounded-md bg-gray-600 hover:bg-gray-800 transition duration-300"
        >
          <RiChatHistoryFill className="text-xl text-yellow-400" />
          <span className="text-lg font-medium">Order History</span>
        </Link>

        <Link
          to="Setting"
          className="flex items-center gap-3 p-3 rounded-md bg-gray-600 hover:bg-gray-800 transition duration-300"
        >
          <IoSettingsSharp className="text-xl text-blue-400" />
          <span className="text-lg font-medium">Settings</span>
        </Link>
      </div>
      }
      {role=="admin" &&
      <div className="flex flex-col mt-8 w-full gap-4">
        <Link
          to="AddBook"
          className="flex items-center gap-3 p-3 rounded-md bg-gray-600 hover:bg-gray-800 transition duration-300"
        >
          <IoAddCircle className="text-xl text-green-400" />
          <span className="text-lg font-medium">Add Book</span>
        </Link>

        <Link
          to="AllOrderHistory"
          className="flex items-center gap-3 p-3 rounded-md bg-gray-600 hover:bg-gray-800 transition duration-300"
        >
          <RiChatHistoryFill className="text-xl text-yellow-400" />
          <span className="text-lg font-medium">All Order History</span>
        </Link>

        {/* <Link
          to="Setting"
          className="flex items-center gap-3 p-3 rounded-md bg-gray-600 hover:bg-gray-800 transition duration-300"
        >
          <IoSettingsSharp className="text-xl text-blue-400" />
          <span className="text-lg font-medium">Settings</span>
        </Link> */}
      </div>
      }
      

      {/* Logout Button */}
      <div className="mt-6 w-full" onClick={handleLogout}>
        <Button
          variant="contained"
          endIcon={<FiLogOut />}
          className="!bg-red-600 hover:!bg-red-800 w-full text-lg"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
