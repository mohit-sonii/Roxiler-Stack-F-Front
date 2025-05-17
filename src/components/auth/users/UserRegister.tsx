"use client";
import React, { useEffect } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AuthUserType, authUserValidation } from "./zodValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { user } from "@/util/Route";

const UserRegister = () => {
  const router = useRouter()
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<z.infer<typeof authUserValidation>>({
      resolver: zodResolver(authUserValidation),
   });
   const registerHandler = handleSubmit(async (data: AuthUserType) => {
      const loadingToast = toast.loading("Please wait...");
      try {
         const result = await axios.post(`${user}/register`, data, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });
         if (result.status === 201) {
          toast.success(result.data.message)
          reset()
          router.replace(`${user}/login`)
         }else{
          toast.error(result.data.message)
         }
      } catch (error: any) {
         console.log(error);
         if (error?.message) {
            toast.error(error.message);
         }
      }finally{
         toast.dismiss(loadingToast)
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
         <h1> User Registration Form</h1>
         <form
            onSubmit={registerHandler}
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
               <label htmlFor="password">Password</label>
               <input
                  {...register("password")}
                  defaultValue={""}
                  type="text"
                  placeholder="Enter Password"
               />
            </div>
            <div className="flex flex-col gap-2">
               <label htmlFor="email">Email</label>
               <input
                  {...register("email")}
                  defaultValue={""}
                  type="text"
                  placeholder="Enter your personal email"
               />
            </div>
            <div className="flex flex-col gap-2">
               <label htmlFor="address">Address</label>
               <input
                  {...register("address")}
                  defaultValue={""}
                  type="text"
                  placeholder="Enter your home address"
               />
            </div>
            <div className="flex flex-col gap-2">
               <label htmlFor="role">Role</label>
               <input
                  {...register("role")}
                  defaultValue={""}
                  type="text"
                  placeholder="Enter the user role"
               />
            </div>
         </form>
      </div>
   );
};

export default UserRegister;
