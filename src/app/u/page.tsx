"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'
import { user } from '@/util/Route'

const page = () => {
    const router = useRouter()
    const handleNavigate = ()=>{
        router.push("/stores")
    }
    const handleLogout = async()=>{
        const loading = toast.loading("Please Wait ..")
        try{
            const result = await axios.get(`${user}/logout`)
            toast.success(result.data.message)
            router.replace(`${user}/login`)
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
      <button onClick={handleNavigate}>View All Stores</button>
    </div>
  )
}

export default page
