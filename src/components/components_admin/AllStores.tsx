import { admin } from "@/util/Route";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface ResType {
   name: string;
   email: string;
   address: string;
   ratings: {
      rating: number;
      user: {
         name: string;
      };
   }[];
}
[];

const AllUsers = () => {
   const [shoprating, setShoprating] = useState<string>("");
   const [shopaddress, setShopaddress] = useState<string>("");
   const [data, setData] = useState<ResType[]>([]);

   const handleSearch = async () => {
      const loading = toast.loading("Please Wait..");
      try {
         const result = await axios.get(
            `${admin}/list/store?shoprating=${shoprating}&shopaddress=${shopaddress}`
         );
         if (result.status === 200) {
            setData(result.data.data);
            toast.success(result.data.message);
         } else {
            toast.error(result.data.message);
         }
      } catch (error: any) {
         if (error?.message) {
            toast.error(error.message);
         }
      } finally {
         toast.dismiss(loading);
      }
   };

   return (
      <div>
         {/* First to accept the field */}
         <div className="flex flex-col gap-2">
            <div>
               <input
                  type="text"
                  value={shopaddress}
                  name="shopaddress"
                  onChange={(e) => setShopaddress(e.target.value)}
               />
               <input
                  type="text"
                  value={shoprating}
                  name="shoprating"
                  onChange={(e) => setShoprating(e.target.value)}
               />
            </div>
            <button onClick={handleSearch}>Search</button>
         </div>

         {/* Iterate the data */}
         <div>
            {data &&
               data.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                     <span>Username : {item.name}</span>
                     <span>Email: {item.email}</span>
                     <span>Address: {item.address}</span>
                     {item.ratings.map((item,index)=>(
                        <div className="flex flex-row gap-2 flex-wrap" key={index}>
                            <span>Rating: {item.rating}</span>
                            <span>Username: {item.user.name}</span>
                        </div>
                     ))}
                  </div>
               ))}
         </div>
      </div>
   );
};

export default AllUsers;
