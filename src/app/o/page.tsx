"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'
import { owner } from '@/util/Route'

const page = () => {
    const router = useRouter()
    const handleLogout = async()=>{
        const loading = toast.loading("Please Wait ..")
        try{
            const result = await axios.get(`${owner}/logout`)
            toast.success(result.data.message)
            router.replace(`${owner}/login`)
        }catch(err:any){
            if(err?.message){
                toast.error(err?.message)
            }
        }
        toast.dismiss(loading)
    }
    const handleNavigate = ()=>{
        router.push("/dashboard")
    }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleNavigate}>List Of Users</button>
    </div>
  )
}

export default page
