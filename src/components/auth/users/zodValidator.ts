import { z } from "zod";

export const authUserValidation = z.object({
  username: z.string().max(60, { message: "User name must be less than 60 characters" }),
  password: z.string().min(7, { message: "Password must be at least 7 characters" }),
  email: z.string().email({ message: "Invalid Email Address" }),
  address: z.string().max(200, { message: "Address must be less than 200 characters" }),
  role:z.enum(["ADMIN","USER","OWNER"])
});

export interface AuthUserType{
    username:string,
    password:string,
    address:string,
    email:string,
    role:string
}

export const authUserLoginValidator = z.object({
   password: z.string().min(7, { message: "Password must be at least 7 characters" }),
  email: z.string().email({ message: "Invalid Email Address" })
})

export interface AuthUserLoginType{
    password:string,
    email:string
}
