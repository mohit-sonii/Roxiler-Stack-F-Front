import { user } from "@/util/Route";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface StoreSchema{
    name: string;
    store_id: string;
    address:string,
    owner: {
        name: string;
    };
}

const AllStores = () => {
   const [stores, setStores] = useState<StoreSchema[]>([]);

   const getAllStores = async() => {
      const loading_toast = toast.loading("Please Wait...");
      try {
        const result = await axios.get(`${user}/stores`)
        if(result.data){
            toast.dismiss(loading_toast)
            toast.success("Data Fetched Successfully !!")
            setStores(result.data)
        }

      } catch (error:any) {
         if (error?.message) {
            toast.error(`Unexpected Server Error:  ${error?.message}`);
         }
      }
   };

   useEffect(() => {
      getAllStores();
   }, []);
   return (
       <div>
            <h1> List of Stores</h1>
            {stores.length>0 ? <div>
                {stores.map((item,index)=>{
                    return <div key={index}> 
                        <li>
                            <ul>Store Name: {item.name}</ul>
                            <ul> Store Owner: {item.owner.name}</ul>
                            <ul>Store Address: {item.address}</ul>
                        </li>
                     </div>
                })}
            </div> : <span className="text-2xl text-gray-400">Empty</span>}
       </div>
   )
};

export default AllStores;
