import { userStore } from '@/util/store'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { owner } from '@/util/Route';
import toast from 'react-hot-toast';

interface UserListType {
    rating:number,
    name:string,
    email:string,
    address:string
}
const UserRatingList = () => {
    const {userId} = userStore();
    const [totalUser,setTotalUser] = useState<number>(0)
    const [users,setUsers] = useState<UserListType[]>([])
    const [averageRating,setAverageRating] = useState<number>(0)
    const findList = async()=>{
        const loading = toast.loading("Please Wait..")
        try{
            const result = await axios.get(`${owner}/${userId}/dashboard/ratings/list`)
            toast.dismiss(loading);
            if(result.status!==200){
                toast.error(result.data.message)
                return;
            }
            setTotalUser(result.data.data[0])
            setUsers(result.data.data[1])
            setAverageRating(result.data.data[2])

        }catch(err:any){
            if(err?.message){
                toast.error(err?.message)
            }
        }
    }
    useEffect(()=>{
        findList()
    },[])
  return (
    <div>
        <h3>Shop Rating Details</h3>
        <span>Total User: {totalUser}</span>
        <span>Average Rating: {averageRating}</span>
        {users.map((item,index)=>(
                <div className="flex flex-col gap-2" key={index}>
                    <span>Name: {item.name}</span>
                    <span>Email: {item.email}</span>
                    <span>Address: {item.address}</span>
                    <span>Ratings: {item.rating}</span>
                </div>
            )
        )}
      
    </div>
  )
}

export default UserRatingList
