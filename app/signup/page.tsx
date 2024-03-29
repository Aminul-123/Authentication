"use client"
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function SignPage() {
    const router =useRouter()


    const [user, setUser] = useState({ 
        username:"",
        email:"", password: "",})
    const submitHandler = async(e:any) => {
        e.preventDefault();
        try {
            const res = await axios.post ("/api/users/signup", user);
           
            router.push("/login")
            console.log(res.data.message)

            toast.success(res.data.message);
         
        } catch (error:any)  {
            console.log(error)
            toast(error.response.data.message);
        }


        //console.log(user);
    }
     
    const [disable , setDisable] =useState(true);
    useEffect(() => {
        if(user.email.length > 0 && user.password.length >0 && user.username.length>0) {
            setDisable(false);
        } else {
            setDisable(true);
        }

    }, [user])


    return (
  <>
      <div  className='h-[100vh] w-[100vw] bg-gray-200 flex justify-center
         items-center'>
        <div  className='h-[25rem] w-[25rem] bg-white rounded-md  '>
          <form >
              <h1 className='ml-4 mt-3 text-lg font-bold '>  SIGNUP    </h1>

              <div className='px-3 mt-4 flex flex-col'>
                  <label className=' pr-2'>Username  </label>
                  <input type="text"
                  value={user.username}
                  onChange={(e) => setUser({...user, username: e.target.value})}
                  className='outline-none border-2 border-gray-200
                  rounded-md pl-2 h-[2rem]
                  w-auto '
                  placeholder='Enter usename'  />
              </div>
  
              <div className='px-3 py-4 flex flex-col'>
                  <label className=' pr-2'>Email  </label>
                  <input type="email"
                  value={user.email}
                  onChange={(e) => setUser({...user, email: e.target.value})}
                  className='outline-none border-2 border-gray-200
                  rounded-md pl-2 h-[2rem]
                  w-auto '
                  placeholder='Enter Email'  />
              </div>
  
              
              <div className='px-3 flex flex-col '>
                  <label className=' pr-2'>Password  </label>
                  <input type="password" 
                  value={user.password}
                  onChange={(e) => setUser({...user, password: e.target.value})}
                  className='outline-none  h-[2rem]
                  w-auto border-2 border-gray-200
                  rounded-md pl-2 h-[2rem] '
                  placeholder='Enter Password'  />
              </div>
  
              <button className={` ${disable ? "bg-[#e1e1e1] cursor-not-allowed " : ""}  ml-3 h-[2rem] border-none bg-pink-400 
            w-[23rem]  mt-4 text-md font-bold text-white `}
            onClick={submitHandler}
            >Signup</button>
          
          </form>
          <p 
          className="mt-4 mx-4"
          >Already have an account ? <Link 
          className="text-blue-700 font-bold"
          href={"/login"}>Login</Link> </p>
        </div>
      </div>
  
      </>
      
    )
  }
  
  export default SignPage;