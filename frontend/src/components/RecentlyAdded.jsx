import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from "./BookCard"
import { FaArrowRightLong } from "react-icons/fa6";
import Loader from './Loader';

function RecentlyAdded() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [data,setData]=useState();


    useEffect(()=>{

      async function getData(){
         const response=await axios.get(`${API_URL}/api/v1/get-recent-books/`);
        // console.log(response.data);
         setData(response.data.data);
      }

      getData();


    },[])


  return (
    
    <div className='bg-zinc-800 p-4'>
      <span className='text-xl font-bold text-gray-100 tracking-wide '>
        RECENTELY ADDED BOOKS:
      </span>
      {!data && <div className='flex items-center justify-center my-5'>
        <Loader></Loader>
       </div>}
      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4'>
       {data && data.map((bookData,i)=>(
        <div key={i}>
          <BookCard bookData={bookData}></BookCard>
        </div>
        
       ))}
       </div>
    </div>
  )
}

export default RecentlyAdded
