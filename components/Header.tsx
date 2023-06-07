"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"
import {twMerge} from 'tailwind-merge'
import {RxCaretLeft, RxCaretRight} from 'react-icons/rx'
import {FaUserAlt} from 'react-icons/fa'
import {HiHome} from 'react-icons/hi'
import {BiSearch} from 'react-icons/bi'
import useAuthModal from "@/hooks/useAuthModal";
import {useSupabaseClient} from '@supabase/auth-helpers-react'
import {toast} from 'react-hot-toast'
import Button from "./Button";
import { useUser } from "@/hooks/useUser";

interface HeaderProps{
   children: React.ReactNode;
   className?: string
}

const Header : React.FC<HeaderProps> = ({children, className}) => {
   const router = useRouter();
   const supabaseClient = useSupabaseClient();
   const {user} = useUser();
   const {onOpen} = useAuthModal()
   // const [count, setCount] = useState(0);

   const handleLogout = async()=>{
      const {error}= await supabaseClient.auth.signOut();
      router.refresh()
      if(error) toast.error(error.message)
      else toast.success('Logged Out');
   }
   // const colors= ['red','yellow','emerald', 'orange', 'purple', 'violet', 'blue', 'amber', 'rose']

   return (
      <div className={twMerge(`page-fit bg-gradient-to-b from-blue-800 p-6`, className)}>
         <div className="w-full mb-4 flex items-center justify-between">
            <div className="hidden md:flex gap-x-2 items-center">
               <button className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition" onClick={()=>router.back()}>
                  <RxCaretLeft className="text-white" size={35}/>
               </button>
               <button className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition" onClick={()=>router.forward()}>
                  <RxCaretRight className="text-white" size={35}/>
               </button>
            </div>

            <div className="flex md:hidden gap-x-2 items-center">
               <button className="rounded-full p-2 bg-white flex items-center hover:opacity-75 justify-center transition">
                  <HiHome size={20} className="text-black"/>
               </button>
               <button className="rounded-full p-2 bg-white flex items-center hover:opacity-75 justify-center transition">
                  <BiSearch size={20} className="text-black"/>
               </button>
            </div>
            <div className="flex justify-between items-center gap-x-4">
               {user ? 
               <div className="flex gap-x-4 items-center">
                  <Button onClick={handleLogout} className="bg-white text-black px-6 py-2 font-bold">Logout</Button>
                  <Button onClick={()=>router.push('/account')}>
                     <FaUserAlt/>
                  </Button>
               </div> :
               <>
               <div>
                  <Button onClick={onOpen} className="bg-transparent text-neutral-300 font-medium">Sign up</Button>
               </div>
               <div>
                  <Button onClick={onOpen} className="bg-white px-6 py-2">Log in</Button>
               </div>
               </>
               }
            </div>
         </div>
         {children}
      </div>
      )
   }

export default Header;