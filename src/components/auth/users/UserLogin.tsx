"use client";
import React, { useEffect } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AuthUserLoginType, authUserLoginValidator } from "./zodValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { admin, owner, user } from "@/util/Route";
import { userStore } from "@/util/store";

const UserLogin = () => {
  const router = useRouter()
  const updateUserId = userStore(state=>state.updateUserId)
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<z.infer<typeof authUserLoginValidator>>({
      resolver: zodResolver(authUserLoginValidator),
   });
   const loginHandler = handleSubmit(async (data: AuthUserLoginType) => {
      const loadingToast = toast.loading("Please wait...");
      try {
         const currentPath = usePathname()
         const result = await axios.post(currentPath.startsWith("/o")?owner : currentPath.startsWith("/a")? admin : user, data, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });
         toast.dismiss(loadingToast)
         if (result.status === 201) {
          toast.success(result.data.message)
          const userId = result.data
          updateUserId(userId)
          reset()
          if(currentPath.startsWith("/u")){
             router.replace(`${user}/stores`)
          }
         }else{
          toast.error(result.data.message)
         }
      } catch (error: any) {
         console.log(error);
         if (error?.message) {
            toast.error(error.message);
         }
         toast.dismiss(loadingToast);
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
         <h1> Login Form</h1>
         <form
            onSubmit={loginHandler}
            className="flex flex-col w-[90%] xl:w-1/2"
         >
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
               <label htmlFor="password">Password</label>
               <input
                  {...register("password")}
                  defaultValue={""}
                  type="text"
                  placeholder="Enter Password"
               />
            </div>
         </form>
      </div>
   );
};

export default UserLogin;
