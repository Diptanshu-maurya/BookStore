import React from 'react'
import { Button } from '@mui/material'
import { FaArrowRightLong } from "react-icons/fa6";

function Hero() {
  return (

    <section class="bg-zinc-900 dark:bg-gray-900">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-zinc-200">Unleash your reading power</h1>
            <p class="max-w-2xl mb-6 font-light text-gray-200 lg:mb-8 md:text-lg lg:text-xl ">Browse thousands of books and get them delivered to your doorstep.</p>
            <div className='flex gap-2 items-center '>
            {/* <Button variant="contained" endIcon={<FaArrowRightLong />}>
          Get started 
</Button> */}
             
            </div>
           
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="img1.jpg" alt="mockup" className=' rounded-lg'/>
        </div>                
    </div>
</section>

  )
}

export default Hero
