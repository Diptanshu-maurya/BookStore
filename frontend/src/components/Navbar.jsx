import React, { useState } from "react";
import { GiBookmarklet } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
 const isLoggedIn= useSelector((state)=> state.auth.isLoggedIn);
 console.log("isLoggedIn",isLoggedIn)

  return (
    <div>
      <div className="bg-zinc-800 text-white p-5 flex items-center justify-between sticky top-0 z-50">

        <Link to="/">
        <div className="flex gap-2 justify-center items-center text-xl font-semibold">
          <div>
            <span className="text-4xl">
              <GiBookmarklet />
            </span>
          </div>
          <div>Page-Turner</div>
        </div>
        </Link>
        

        {/* Toggle mobile menu */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white text-2xl"
          >
            {isMobileMenuOpen ? "X" : "☰"}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-evenly gap-4 text-md">
          <Link to="/">Home</Link>
          <Link to="/AllBooks">All Books</Link>
        {isLoggedIn==true &&   <Link to="/Profile">Profile</Link>}
        {isLoggedIn==true &&    <Link to="/Cart">Cart</Link>}

        {isLoggedIn==false && <>
          <Link to="/Login">
            <Button variant="outlined">Login</Button>
          </Link>
          <Link to="/Signup">
            <Button variant="contained">Sign up</Button>
          </Link></>}
          
         
          
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} bg-zinc-800 p-4 text-white`}
      >
        <Link to="/" className="block py-2">Home</Link>
       

        <Link to="/AllBooks" className="block py-2">All Books</Link>
        <Link to="/Profile" className="block py-2">Profile</Link>
        <Link to="/Cart" className="block py-2">Cart</Link>

        {isLoggedIn==false && <>

          <Link to="/Login" className="block py-2">
          <Button variant="outlined">Login</Button>
        </Link>
        <Link to="/Signup" className="block py-2">
          <Button variant="contained">Sign up</Button>
        </Link>
        
        
        </>}
        
      </div>
    </div>
  );
}

export default Navbar;
