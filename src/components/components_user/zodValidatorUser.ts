
import {z} from 'zod'
export const zodForgetPassVali = z.object({
    password:z.string().min(7,{message:"Password must be atleast 7 characters"}),
    confirmPass:z.string().min(7,{message:"Password must be atleast 7 characters"}),
})

export interface PassVali{
    password:string,
    confirmPass:string
}