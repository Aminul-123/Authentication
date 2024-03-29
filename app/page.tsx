//import Image from "next/image";
"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function Home() {
  const router =useRouter()
  const logoutHandler = async() => {
    
   try {
    const res =await axios.get("/api/users/logout");
    router.push("/login");
    toast.success(res.data.message);

   } catch (error:any ) {
    toast.error(error.response.data.message)

   }
  }
  return (
   <>
   <h1>I am Home</h1>
   <button className="bg-zinc-300 px-2 py-2 mx-4 my-4 rounded-md "
   onClick={logoutHandler} >Logout</button>

   </>
        
  )
}
