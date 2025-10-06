import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Hero from "./components/Hero";
import AllBooks from "./pages/AllBooks";
import BookDetails from "./pages/BookDetails";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import OrderHistory from "./pages/OrderHistory";
import Setting from "./pages/Setting";
import Cart from "./pages/Cart";
import AddBook from "./pages/AddBook";
import AllOrderHistory from "./pages/AllOrderHistory";
import EditBook from "./pages/EditBook";
function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <>
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/AllBooks" element={<AllBooks />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>
        <Route path="/edit-book/:id" element={<EditBook />}></Route>
        <Route path="/Book-details/:id" element={<BookDetails />} />
        <Route path="/Profile" element={<Profile />}>
          <Route index  element={<Favorites />}></Route>
          <Route  path="Favorites" element={<Favorites />}></Route>
          <Route path="OrderHistory" element={<OrderHistory />}></Route>
          <Route path="Setting" element={<Setting />}></Route>
        </Route>
        <Route path="/Admin-Profile" element={<Profile />}>
          <Route index  element={<AddBook />}></Route>
          <Route  path="AddBook" element={<AddBook />}></Route>
          <Route path="AllOrderHistory" element={<AllOrderHistory />}></Route>
          
        </Route>

        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Login" element={<Login />}></Route>
      </Routes>
      {/* <Footer></Footer> */}
    </>
  );
}

export default App;
