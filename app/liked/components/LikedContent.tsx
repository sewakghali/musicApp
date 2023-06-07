"use client"

import LikeButton from "@/components/LikeButton"
import MediaItem from "@/components/MediaItem"
import { useUser } from "@/hooks/useUser"
import { Song } from "@/types"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

interface LikedContentProps{
   songs: Song[]
}

const LikedContent : React.FC<LikedContentProps> = ({songs}) => {
   const router = useRouter();
   const {isLoading, user} = useUser();

   useEffect(()=>{
      if(!isLoading && !user){
         router.replace('/');
      }
   },[isLoading, user, router])

   return (
      <>
         {songs.length === 0 ? 
            <div className="flex flex-col gap-y-2 px-6 w-full text-neutral-400">No songs here</div> 
         :
         <div className="flex flex-col gap-y-2 px-6 w-full">
            {songs.map((song)=>(
               <div key={song.id} className="flex items-center gap-x-4 w-full">
                  <div className="flex-1">
                     <MediaItem onClick={()=>{}} data={song}/>
                  </div>
                  <LikeButton id={song.id}/>
               </div>
            ))}
         </div>
         }
      </>
      )
   }

export default LikedContent;