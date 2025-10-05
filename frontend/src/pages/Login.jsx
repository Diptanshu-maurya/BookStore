import React, { useState } from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { lightGreen } from '@mui/material/colors';
import {authActions} from '../store/auth'
import  {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Login() {

    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate()
    const dispatch=useDispatch()

   async function handleSubmit(e){
        e.preventDefault();

      try {
        if(username=='' || password==''){
            alert("All fields are required");
        }else{
            const response=await axios.post("http://localhost:1000/api/v1/sign-in",{username,password})

            console.log(response)
            
             dispatch(authActions.login());
             dispatch(authActions.changeRole(response.data.role));
            localStorage.setItem("id",response.data.id);
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("role",response.data.role);
            navigate("/");
        }
        
      } catch (error) {

        const errorMsg=error.response.data.message;


         alert(errorMsg)
       //  console.log("error",error.response.data.message)
      }

    }



  return (
    <section class="bg-zinc-700 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        
        <div class="w-full bg-zinc-600 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 hover:shadow-md">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                   Sign in
                </h1>
                <form class="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label for="email" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">Username</label>
                        <input type="text" name="username" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required="" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    
                    
                   
                    <Button variant="contained" className='w-full' onClick={handleSubmit}>Login</Button>
                    <p class="text-sm font-light text-gray-400 dark:text-gray-400">
                        Don't have an account? <Link to="/Signup" class="font-medium text-primary-300 hover:underline dark:text-primary-200">Signup here</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>
  )
}

export default Login
