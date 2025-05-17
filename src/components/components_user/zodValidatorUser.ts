
import {z} from 'zod'
export const zodForgetPassVali = z.object({
    password:z.string().min(7,{message:"Password must be atleast 7 characters"}),
    email:z.string().email()
})

export interface PassVali{
    password:string,
    email:string
}