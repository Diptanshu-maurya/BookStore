import React from 'react'
import  {Link}  from "react-router-dom";
import axios from 'axios';

function BookCard({bookData,fav,Cart}) {
   const API_URL = import.meta.env.VITE_API_URL;
 // console.log("bookData",bookData);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:bookData._id
  };

   async function handleFav(){

    const response=await axios.put(`${API_URL}/api/v1/remove-book-from-fav/`,{},{headers});

    alert(response.data.message)
    
    console.log(response);

   }
   async function handleRemoveCart(){

    const response=await axios.put(`${API_URL}/api/v1/remove-to-cart/`+bookData._id,{},{headers});

    alert(response.data.message)
    
    console.log(response);

   }







  return (
    <div>
    
     
     <div className='bg-zinc-600 rounded p-3 text-gray-200'>
     <Link to={`/Book-details/${bookData._id}`}>
     

       <div className='bg-zinc-700 rounded flex items-center justify-center'>

        <img src={`${bookData.url}`} alt="img" className='h-[25vh] rounded '/>
       </div>

       <h4 className='text-white mt-2 text-xl'> {bookData.title}  </h4>
       <p className='text-gray-400'> by {bookData.author} </p>
       <p className='text-lg'>₹{bookData.price}</p>
       </Link>

       {

      Cart && (
        <button className='bg-yellow-600 text-slate-300 py-2 px-2 rounded w-full' onClick={handleRemoveCart}>Remove from Cart</button>
      )
    }
     {

fav && (
  <button className='bg-yellow-600 text-slate-300 py-2 px-2 rounded w-full' onClick={handleFav}>Remove from fav</button>
)
}


       </div>
    
    
    </div>
  )
}

export default BookCard;
