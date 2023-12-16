"use client"

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router=useRouter();
  const handleForm=async(e)=>{
    e.preventDefault();
    // console.log({email,password})
    try{
      const res= await signIn('credentials',{
         email,password,redirect:false  
       })
       console.log('log res',res);
       if (res.error) {
           setError('invailed credentails');
           return;
           
       }
       router.replace("dashboard")

   }catch(error){
       console.log(error);

   }
  }
    return (
        <form className="max-w-sm mx-auto shadow-lg p-4 border-t-4 border-t-green-600" onSubmit={handleForm}>
        <h2 className='my-3 font-bold text-center uppercase underline underline-offset-8'>
                            login now
                        </h2>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required  onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  placeholder='enter your password' onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          {
            error && (<div className="flex items-start mb-5 bg-red-500 w-fit p-2 rounded-md">
            
           {error}
          </div>

            )
          }
          
         
          <button  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
         <div className='text-right mt-2'>
         <Link href={'/register'}>Dont have an account? <span className='underline'>Register</span></Link>
         </div>
        </form>
    );
};

export default LoginForm;