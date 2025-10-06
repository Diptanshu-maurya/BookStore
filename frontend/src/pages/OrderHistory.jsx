import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

function OrderHistory() {
   const API_URL = import.meta.env.VITE_API_URL;
  const [orderHistory, setOrderHistory] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get(
          `${API_URL}/api/v1/get-order-history`,
          { headers }
        );
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    }
    fetch();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Order History</h1>

      {!orderHistory ? (
        <div className="flex items-center justify-center my-5">
          <Loader />
        </div>
      ) : (
        <div className="relative w-full overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full text-left min-w-max text-gray-800">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4 text-sm font-semibold">Sr No.</th>
                <th className="p-4 text-sm font-semibold">Book</th>
                <th className="p-4 text-sm font-semibold">Price</th>
                <th className="p-4 text-sm font-semibold">Status</th>
                <th className="p-4 text-sm font-semibold">Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((item, i) => (
                <tr
                  key={item.book_id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-4 font-bold">{i + 1}</td>
                  <td className="p-4">
                    <Link
                      to={`/Book-details/${item.book._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {item.book.title}
                    </Link>
                  </td>
                  <td className="p-4">Rs.{item.book.price}</td>
                  <td className="p-4">{item.status}</td>
                  <td className="p-4">Cash On Delivery</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
