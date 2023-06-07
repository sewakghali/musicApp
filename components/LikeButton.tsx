"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"
import useAuthModal from "@/hooks/useAuthModal";
import {useSessionContext} from '@supabase/auth-helpers-react'
import { useUser } from "@/hooks/useUser";
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import {toast} from 'react-hot-toast'

interface LikeButtonProps{
   id: string;
}

const LikeButton : React.FC<LikeButtonProps> = ({id}) => {
   const router = useRouter();
   const {supabaseClient} = useSessionContext();
   const authModal = useAuthModal();
   const {user} = useUser();

   const [isLiked, setIsLiked] = useState(false);

   const handleLike = async ()=>{
      if(!user) return authModal.onOpen();
      if(isLiked) {
         const {error} = await supabaseClient.from('liked_songs').delete().eq('user_id', user.id).eq('song_id', id).single()
         if(error) toast.error(error.message)
         else{
            setIsLiked(false);
         }
      }else{
         const {error} = await supabaseClient.from('liked_songs').insert({'user_id': user.id, 'song_id': id})
         if(error) toast.error(error.message)
         else{
            toast.success('Liked');
            setIsLiked(true);
         }
      }
      router.refresh()
   }

   useEffect(()=>{
      if(!user?.id) return;

      const fetchData = async()=>{
         const {data, error} = await supabaseClient.from('liked_songs').select('*').eq('user_id', user.id).eq('song_id', id).single();

         if (!error && data) setIsLiked(true)
      }

      fetchData()
   },[id, supabaseClient, user?.id])

   const Icon = isLiked ? AiFillHeart : AiOutlineHeart
   return (
      <button  className="hover:opacity-75 transition" onClick={handleLike}>
         <Icon color={isLiked? '#22c55e': 'white'}/>
      </button>
      )
   }

export default LikeButton;