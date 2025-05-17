"use client";
import React, { useEffect } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { owner, user } from "@/util/Route";
import { PassVali, zodForgetPassVali } from "./zodValidatorUser";
import { userStore } from "@/util/store";

const ForgetPass = () => {
   const router = useRouter();
   const { userId } = userStore();

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<z.infer<typeof zodForgetPassVali>>({
      resolver: zodResolver(zodForgetPassVali),
   });
   const registerHandler = handleSubmit(async (data: PassVali) => {
      const loadingToast = toast.loading("Please wait...");
      try {
         const pathUrl = usePathname();
         const result = await axios.post(
            `${pathUrl.startsWith("/u") ? user : owner}/reset-pass/${userId}`,
            data,
            {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            }
         );
         toast.dismiss(loadingToast);
         if (result.status === 200) {
            toast.success(result.data.message);
            reset();
            router.replace(`${pathUrl.startsWith("/u") ? user : owner}/login`);
         } else {
            toast.error(result.data.message);
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
         <h1> Update Password Form</h1>
         <form
            onSubmit={registerHandler}
            className="flex flex-col w-[90%] xl:w-1/2"
         >
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
               <label htmlFor="confirmPass">Confirm Password</label>
               <input
                  {...register("confirmPass")}
                  defaultValue={""}
                  type="text"
                  placeholder="Re Enter Password"
               />
            </div>
         </form>
      </div>
   );
};

export default ForgetPass;
