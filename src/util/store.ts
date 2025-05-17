
import {create}from 'zustand'
type ModalState={
    userId:string;
    updateUserId:(newId:string)=>void;
}
export const userStore  =    create<ModalState>((set)=>({
    userId:'',
    updateUserId:(newId:string)=>set({userId:newId})
}))