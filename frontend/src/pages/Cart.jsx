import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const nav = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    async function getFav() {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-user-cart/", { headers });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }
    getFav();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const totalAmount = data.reduce((sum, item) => sum + item.price, 0);
      setTotal(totalAmount);
    }
  }, [data]);

  async function handlePlaceOrder() {
    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/place-order/",
        { order: data },
        { headers }
      );
      alert(response.data.message);
      setData([]);
      nav("/Profile/OrderHistory");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  }

  return (
    <div className="bg-zinc-700 min-h-screen text-gray-100 p-4">
      <h1 className="text-3xl font-semibold text-center my-6">Your Cart</h1>

      {data.length === 0 ? (
        <div className="text-center text-xl text-gray-400">Nothing in Cart</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((book, i) => (
              <BookCard key={i} bookData={book} Cart={true} />
            ))}
          </div>

          <div className="bg-zinc-800 p-6 mt-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Order Summary</h2>
            <div className="flex justify-between text-lg mb-2">
              <span>{data.length} books</span>
              <span>Price: ₹{total}</span>
            </div>
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-lg transition-all"
              onClick={handlePlaceOrder}
            >
              Place Your Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
