import {z}from 'zod'

export const storeValidation = z.object({
    username:z.string().max(60,{message:"Maximum 60 Characters allowed"}),
    storename:z.string().max(60,{message:"Maximum 60 Characters allowed"}),
    useraddress:z.string(),
    storeaddress:z.string(),
    useremail:z.string().email(),
    storeemail:z.string().email(),
    userpassword:z.string().min(7,{message:"Minimum length of password should be 7"})
})

export interface StoreVali{
    username:string,
    storename:string,
    useraddress:string,
    storeaddress:string,
    useremail:string,
    storeemail:string,
    userpassword:string
}