import React from "react";
import { useState ,useRef} from "react";
import { useEffect } from "react";
import axios from "axios";

function AddBook() {
   const API_URL = import.meta.env.VITE_API_URL;
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [language, setLanguage] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const imageInputRef = useRef();

  async function handleAddBook() {
    if (!image || !title || !author || !language || !description || !price) {
    alert("❌ Please fill in all fields.");
    return;
  }
    const formdata = new FormData();
    console.log("hello")
    formdata.append("image", image);
    formdata.append("title", title);
    formdata.append("language", language);
    formdata.append("desc", description);
    formdata.append("author", author);
    formdata.append("price", price);

    try {
      const response =await axios.post(`${API_URL}/api/v1/add-book/`,formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,

        },
      }
    );
    console.log(response);
     setImage(null);
     imageInputRef.current.value = null;
     setAuthor('')
     setDescription('');
     setLanguage('');
     setPrice('');
     setTitle('');
    alert("✅ Book added successfully!");
      
    } catch (error) {

   console.log(error);
      
    }

    
  }

  return (
    <div className="min-h-screen bg-zinc-700 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-zinc-800 text-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Book</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-zinc-300">Image</label>
            <input
              type="file"
              required
              accept="image/*"
              name="image"
              ref={imageInputRef}
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full bg-zinc-700 text-sm text-zinc-200 file:bg-zinc-600 file:text-zinc-100 file:border-none file:px-4 file:py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-zinc-300">
              Title of Book
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="Enter book title"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-zinc-300">
              Author of Book
            </label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="Enter author name"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-zinc-300">Language</label>
            <input
              type="text"
              required
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="Enter language"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-zinc-300">
              Description
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="Short description"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-zinc-300">Price</label>
            <input
              type="number"
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="Enter price"
            />
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg mt-4 transition"
            onClick={handleAddBook}
          >
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
