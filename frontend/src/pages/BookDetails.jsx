import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect,useState } from 'react';
import Loader from '../components/Loader';
import { MdLanguage } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { MdOutlineFavorite } from "react-icons/md";
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";

import { MdDelete } from "react-icons/md";








function BookDetails() {
  const {id}=useParams();
  const [bookData,setBookData]=useState();
  const isLoggedIn= useSelector((state)=> state.auth.isLoggedIn);
  const role=useSelector((state)=> state.auth.role);



  useEffect(()=>{

     async function getData(){
      const response=await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`)
      console.log(response.data.data.author);
      setBookData(response.data.data);
    }
    getData();
         
},[])

const headers = {
  id: localStorage.getItem("id"),
  authorization: `Bearer ${localStorage.getItem("token")}`,
  bookid:id
};

async function handleFav(){
      const response=await axios.put("http://localhost:1000/api/v1/add-book-to-fav/",{},{headers});

      alert(response.data.message)
      console.log(response);
 }

 async function handleCart(){
  const response=await axios.put("http://localhost:1000/api/v1/add-to-cart/",{},{headers});
  alert(response.data.message)
  console.log(response);
}


  console.log("id",id);

  return (
    <div className='px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 text-white'>
     <div className='bg-zinc-700 rounded p-4 h-[88vh] w-full lg:w-3/6 flex items-center justify-center'>
     <img src="/img1.jpg" alt=""  className=' h-[40vh] lg:h-[50vh] rounded' /></div>
     <div className='p-4 w-3/6'>
     {!bookData && <div> <Loader></Loader></div>}
     {bookData && 
      <div>
        <h1 className='text-3xl font-bold'>{bookData.title}</h1>
      <p className='text-zinc-300'>by {bookData.author}</p>
      <p className='text-zinc-400 mt-2'>{bookData.desc}</p>
      <div className='text-zinc-400 mt-2 flex items-center gap-2'>
       
      <span className='mt-1'><MdLanguage /></span>
      <p>  {bookData.language}</p>
      </div>
      

      <p className='text-zinc-200 mt-2 text-2xl font-bold'>Price :₹{bookData.price}</p>
      </div>

     }
     <div>
      <hr  className='m-4'/>
      {
        isLoggedIn==true && role=='user' && 
        <div className='flex justify-evenly mt-4'>

        <button className='flex p-2 gap-2 items-center justify-center border rounded-md bg-red-800  hover:opacity-85  focus:ring-1' onClick={handleFav}>
        <div className=''>
          Add to fav 
          
          </div>
          <span>
          <MdOutlineFavorite />
          </span>
          

        </button>
       
        <button className='flex p-2 gap-2 items-center justify-center border rounded-md bg-yellow-800 hover:bg-yellow-900' onClick={handleCart}>
        <div className=''>
          Add to Cart
          
          </div>
          <span>
          <FaCartPlus />
          </span>
          

        </button>
      </div> 
      }
      {
        isLoggedIn==true && role=='admin' && 
        <div className='flex justify-evenly mt-4'>

        <button className='flex p-2 gap-2 items-center justify-center border rounded-md bg-red-800  hover:opacity-85  focus:ring-1'>
        <div className=''>
          Edit
          
          </div>
          <span>
          <FaEdit />
          </span>
          

        </button>
       
        <button className='flex p-2 gap-2 items-center justify-center border rounded-md bg-yellow-800 hover:bg-yellow-900'>
        <div className=''>
          Delete
          
          </div>
          <span>
          <MdDelete />
          </span>
          

        </button>
      </div> 
      }
      
     </div>

     
     
     </div>
     <div> 


     </div>
      
    </div>
  )
}

export default BookDetails;
