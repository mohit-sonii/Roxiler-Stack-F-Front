import { admin } from "@/util/Route";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const GetCountDetails = () => {
   const [userCount, setCount] = useState<number>(0);
   const [storeCount, setStoreCount] = useState<number>(0);
   const [ratingsCount, setRatingsCount] = useState<number>(0);

   const findAll = async () => {
      const loading = toast.loading("Please Wait.. ");
      try {
         const result = await axios.get(`${admin}/dashboard/counts`);
         if (result.status !== 200) {
            toast.error(result.data.message);
            return;
         }
         setCount(result.data.data[0]);
         setStoreCount(result.data.data[1]);
         setRatingsCount(result.data.data[2]);
         toast.success("Successfully Fetched Data");
      } catch (error: any) {
         if (error?.message) {
            toast.error(error.message);
         }
         toast.dismiss(loading);
      }
   };
   useEffect(() => {
      findAll();
   }, []);

   return (
    <div>
        <h3>Counting Details</h3>
        <span>Total Users: {userCount}</span>
        <span>Total Store: {storeCount}</span>
        <span>Total Submitted Ratings: {ratingsCount}</span>
    </div>
   )
};

export default GetCountDetails;
