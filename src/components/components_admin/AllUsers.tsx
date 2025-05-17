import { admin } from "@/util/Route";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

type roleTypes = "USER" | "ADMIN" | "OWNER";

interface ResType {
    name: string;
    email: string;
    address: string;
    role: roleTypes;
}[]

const AllUsers = () => {
   const [username, setUsername] = useState<string>("");
   const [usermail, setUsermail] = useState<string>("");
   const [useraddress, setUseraddress] = useState<string>("");
   const [userrole, setUserrole] = useState<roleTypes>("USER");
   const [data,setData] = useState<ResType[]>([])

   const handleSearch = async() => {
      const loading = toast.loading("Please Wait..");
      try {
        const result = await axios.get(`${admin}/list/users?username=${username}&usermail=${usermail}&useraddress=${useraddress}&userrole=${userrole}`)
        if(result.status===200){
            setData(result.data.data);
            toast.success(result.data.message)
        }else{
            toast.error(result.data.message)
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
                  value={username}
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
               />
               <input
                  type="text"
                  value={usermail}
                  name="usermail"
                  onChange={(e) => setUsermail(e.target.value)}
               />
               <input
                  type="text"
                  value={useraddress}
                  name="useraddress"
                  onChange={(e) => setUseraddress(e.target.value)}
               />
               <select
                  value={userrole}
                  name="userrole"
                  onChange={(e) => setUserrole(e.target.value as roleTypes)}
                  className="border rounded p-2"
               >
                  <option value="">Select a role</option>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="OWNER">Owner</option>
               </select>
            </div>
            <button onClick={handleSearch}>Search</button>
         </div>

         {/* Iterate the data */}
        <div>
            {data && data.map((item,index)=>(
                <div key={index}>
                    <span>Username : {item.name}</span>
                    <span>Email: {item.email}</span>
                    <span>Address: {item.address}</span>
                    <span>Role: {item.role}</span>
                </div>
            ))}
        </div>
      </div>
   );
};

export default AllUsers;
