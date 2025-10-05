import React, { useState } from 'react'
import { Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {

    
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [address,setAddress]=useState('');

    const navigate=useNavigate();

    
   async function handleSubmit(e){
        e.preventDefault();
        try {

            if(username=='' || email=='' || password=='' || address==''){
                alert("All fields are required");
            }else{

                const response= await axios.post("http://localhost:1000/api/v1/sign-up",
                    {username,email,password,address}
                );
             //   console.log(response);
                alert(response.data.message);

                navigate("/Login");


            }
            


            
        } catch (error) {
            const errorMsg=error.response.data.message;


            alert(errorMsg)





         //   console.log(error)
        }
    }



  return (
    <section class="bg-zinc-700 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div class="w-full bg-zinc-600 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 hover:shadow-md">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                 Signup
              </h1>
              <form class="space-y-4 md:space-y-6" action="#" >
                  <div>
                      <label for="email" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">Username</label>
                      <input type="text" name="username" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required="" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" 
                      value={password} onChange={(e)=>setPassword(e.target.value)}/>
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                      <textarea type="text" name="address" id="Address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" required=""
                      value={address} onChange={(e)=>setAddress(e.target.value)}/>
                  </div>
                  
                 
                  <Button variant="contained" className='w-full' onClick={handleSubmit}>Sign up</Button>
                  <p class="text-sm font-light text-gray-400 dark:text-gray-400">
                      Already have an account? <Link to="/Login" class="font-medium text-primary-300 hover:underline dark:text-primary-200">Login here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default Signup
