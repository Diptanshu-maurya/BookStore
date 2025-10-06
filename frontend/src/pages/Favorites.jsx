import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';

function Favorites() {
   const API_URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getFav() {
      try {
        const headers = {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        const response = await axios.get(`${API_URL}/api/v1/get-fav-books/`, { headers });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }
    getFav();
  }, []);

  return (
    <div className="bg-zinc-400 min-h-screen text-gray-600 p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Your Favorites</h1>

      {data.length === 0 ? (
        <div className="text-center text-xl text-gray-400">Nothing in Favorites</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((book, i) => (
            <BookCard key={i} bookData={book} fav={true} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
