"use client"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router=useRouter();
  const handleForm=async(e)=>{
    e.preventDefault();
    if (!name || !email || !password) {
      setError('required to fill all input');
      return;
      
    }
    // console.log({name,email,password});
    try{
      const userExist=await fetch('api/userExist',{
        method:'POST',
          headers:{
            'content-type': 'application/json'
          },
          body:JSON.stringify({email})
      })
      console.log('userExist',userExist);
      const {user}=await userExist.json();
     if (user) {
      setError('user is exist');
      return
      
     }
      const res=await fetch('api/register',{
        method:'POST',
          headers:{
            'content-type': 'application/json'
          },
          body:JSON.stringify({name,email,password})
      });
      console.log('res',res);
      if (res.ok) {
        const form=e.target;
        form.reset();
        toast.success("user registration successfully")
        router.push('/login')
        
      }else{
        console.log('user registration is failed');
        toast.error("user registration failed")
      }

    }catch(error){
      console.log('error occurs while registration',error);
      toast.error("user registration failed")

    }
    
  }
    return (
      <div>
      <form className="max-w-sm mx-auto shadow-lg p-4 border-t-4 border-t-green-600" onSubmit={handleForm}>
          <h2 className='my-3 font-bold text-center uppercase underline underline-offset-8'>
              register now
          </h2>
<div className="mb-5">
<label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
<input type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your name"  onChange={(e)=>setName(e.target.value)}/>
</div>
<div className="mb-5">
<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
<input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com"  onChange={(e)=>setEmail(e.target.value)}/>
</div>
<div className="mb-5">
<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
<input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder='enter your password' onChange={(e)=>setPassword(e.target.value)}/>
</div>
{
error && (
<div className="flex items-start mb-5 bg-red-500 w-fit p-2 rounded-md">

{error}
</div>

)
}


<button  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type='submit' >Submit</button>

<div className='text-right mt-2 text-sm'>
<Link href={'/login'}>Already have an account? <span className='underline'>Login</span></Link>
</div>
</form>
<ToastContainer position="top-right"
autoClose={2000}/>
  </div>
    );
};

export default RegisterForm;