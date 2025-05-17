import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { StoreVali, storeValidation } from "./zodStoreValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { admin } from "@/util/Route";
import axios from "axios";

const StoreCreation = () => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<z.infer<typeof storeValidation>>({
      resolver: zodResolver(storeValidation),
   });
   const creationHandler = handleSubmit(async (data: StoreVali) => {
      const loading = toast.loading("Please Wait..");
      try {
         const result = await axios.post(`${admin}/addStore`, data, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });
         if (result.status === 201) {
            toast.success(result.data.message);
            reset();
         } else {
            toast.error(result.data.message);
         }
      } catch (error: any) {
         console.log(error);
         if (error?.message) {
            toast.error(error.message);
         }
      } finally {
         toast.dismiss(loading);
      }
   });
   useEffect(() => {
      if (Object.keys(errors).length > 0) {
         for (const field in errors) {
            const err = errors[field as keyof typeof errors];
            if (err?.message) {
               toast.error(`${field.toUpperCase()} : ${err.message}`);
            }
         }
      }
   }, [errors]);

   return (
      <div>
         <h1> Store Creation Form</h1>
         <form
            onSubmit={creationHandler}
            className="flex flex-col w-[90%] xl:w-1/2"
         >
            <div className="flex flex-col gap-2">
               <label htmlFor="username">Username</label>
               <input
                  {...register("username")}
                  defaultValue={""}
                  type="text"
                  placeholder="Enter your name"
               />
            </div>
            <div className="flex flex-col gap-2">
               <label htmlFor="useremail">User Email</label>
               <input
                  {...register("useremail")}
                  defaultValue={""}
                  type="text"
                  placeholder="Enter Your Email"
               />
            </div>
            <div className="flex flex-col gap-2">
               <label htmlFor="useraddress">User Address</label>
               <input
                  {...register("useraddress")}
                  defaultValue={""}
                  type="text"
                  placeholder="Enter your address"
               />
            </div>
            <div className="flex flex-col gap-2">
               <label htmlFor="userpassword">User Password</label>
               <input
                  {...register("userpassword")}
                  defaultValue={""}
                  type="text"
                  placeholder="Enter your Password"
               />
            </div>
            <div className="flex flex-col gap-2">
               <label htmlFor="storename">Store Name</label>
               <input
                  {...register("storename")}
                  defaultValue={""}
                  type="text"
                  placeholder="Enter your Store name"
               />
            </div>
            <div className="flex flex-col gap-2">
               <label htmlFor="storeaddress">Store Address</label>
               <input
                  {...register("storeaddress")}
                  defaultValue={""}
                  type="text"
                  placeholder="Enter your Store Address"
               />
            </div>
            <div className="flex flex-col gap-2">
               <label htmlFor="storeemail">Store Email</label>
               <input
                  {...register("storeemail")}
                  defaultValue={""}
                  type="text"
                  placeholder="Enter your Store Email"
               />
            </div>
         </form>
      </div>
   );
};

export default StoreCreation;
