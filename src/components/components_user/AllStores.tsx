import { user } from "@/util/Route";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface StoreSchema {
   name: string;
   store_id: string;
   address: string;
   owner: {
      name: string;
   };
}

const AllStores = () => {
   const [stores, setStores] = useState<StoreSchema[]>([]);
   const [filteredStore, setFilteredStore] = useState<StoreSchema[]>([]);
   const [storeName, setStoreName] = useState<string>("");
   const [storeAddress, setStoreAddress] = useState<string>("");
   const [openToRate, SetOpenToRate] = useState(false);
   const [rating, setRating] = useState<number>(0);

   const getAllStores = async () => {
      const loading_toast = toast.loading("Please Wait...");
      try {
         const result = await axios.get(`${user}/stores`);
         if (result.data) {
            toast.dismiss(loading_toast);
            toast.success("Data Fetched Successfully !!");
            setStores(result.data);
            setFilteredStore(result.data);
         }
      } catch (error: any) {
         if (error?.message) {
            toast.error(`Unexpected Server Error:  ${error?.message}`);
         }
      }
   };

   const startSearching = async () => {
      const filteredData = stores.filter((item) => {
         const matchAddress =
            storeAddress.length === 0 || storeAddress === item.address;
         const matchName = storeName.length === 0 || storeName === item.name;
         return matchAddress && matchName;
      });
      setFilteredStore(filteredData);
   };
   const handleRating = async (store_id: string) => {
      const loading = toast.loading("Please Wait..");
      if (rating < 0 || rating > 5) {
         toast.error("Rating shall be between 1 and 5");
         return;
      }
      try {
         const result = await axios.post(
            `${user}/store/rate/${store_id}`,
            rating
         );
         if(result.status==200){
            toast.success(result.data.message)
         }else{
            toast.error(result.data.message)
         }
      } catch (err: any) {
         if (err?.message) {
            toast.error(`Unexpected Server Error:  ${err?.message}`);
         }
      }
      toast.dismiss(loading);
   };
   useEffect(() => {
      getAllStores();
   }, []);
   return (
      <div className="flex flex-col gap-3">
         <h3> List of Stores</h3>
         {filteredStore.length > 0 ? (
            <div>
               {filteredStore.map((item) => {
                  return (
                     <div key={item.store_id} className="flex flex-col gap-2">
                        <li>
                           <ul>Store Name: {item.name}</ul>
                           <ul> Store Owner: {item.owner.name}</ul>
                           <ul>Store Address: {item.address}</ul>
                        </li>
                        {/* Rate a Store */}
                        <button onClick={(e) => SetOpenToRate(!openToRate)}>
                           Rate the Store
                        </button>
                        {openToRate && (
                           <div>
                              <label htmlFor="rating"> Leave Rating </label>
                              <input
                                 type="number"
                                 onChange={(e) =>
                                    setRating(Number(e.target.value))
                                 }
                                 min={1}
                                 max={5}
                              />
                              <button
                                 onClick={(e) => handleRating(item.store_id)}
                              >
                                 Rate
                              </button>
                           </div>
                        )}
                     </div>
                  );
               })}
            </div>
         ) : (
            <span className="text-2xl text-gray-400">Empty</span>
         )}
         <div className="flex flex-row flex-wrap gap-2">
            <h3>Search By</h3>
            <label htmlFor="storeName">Store Name</label>
            <input
               type="text"
               value={storeName}
               onChange={(e) => setStoreName(e.target.value)}
               name="storeName"
            />
            <label htmlFor="storeName">Store Address</label>
            <input
               type="text"
               value={storeAddress}
               onChange={(e) => setStoreAddress(e.target.value)}
               name="storeAddress"
            />
            <button onClick={startSearching}>Search</button>
         </div>
      </div>
   );
};

export default AllStores;
