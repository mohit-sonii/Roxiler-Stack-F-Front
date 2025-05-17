"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'
import { admin } from '@/util/Route'

const page = () => {
    const router = useRouter()
    const handleLogout = async()=>{
        const loading = toast.loading("Please Wait ..")
        try{
            const result = await axios.get(`${admin}/logout`)
            if(result.status===200){
                toast.success(result.data.message)
                router.replace(`${admin}/login`)
            }else{
                toast.error(result.data.message)
            }
        }catch(err:any){
            if(err?.message){
                toast.error(err?.message)
            }
        }
        toast.dismiss(loading)
    }
  
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={(e)=>router.push("/create-user")}>Register a User</button>
      <button onClick={((e)=>router.push("/get-counts"))}>Get Count Details</button>
      <button onClick={(e)=>router.push("/all-users")}>Get All User</button>
      <button onClick={(e)=>router.push("/all-stores")}>Get All Store</button>
    </div>
  )
}

export default page
