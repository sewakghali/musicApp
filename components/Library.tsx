"use client"
import React from "react"
import {TbPlaylist} from "react-icons/tb"
import {AiOutlinePlus} from "react-icons/ai"
import { useUser } from "@/hooks/useUser"
import useUploadModal from "@/hooks/useUploadModal"
import { Song } from "@/types"
import MediaItem from "./MediaItem"

interface LibraryProps{
   songs: Song[]
}

const Library: React.FC<LibraryProps> = ({songs}) => {
   const {user} = useUser();
   const uploadModal = useUploadModal()
   const onclick = ()=>{
      if(!user){
         return uploadModal.onOpen();
      }
      return uploadModal.onOpen()
   }

   return (
      <div className="flex flex-col" >
         <div className="flex items-center justify-between px-5 pt-4">
            <div className="inline-flex items-center gap-x-2">
               <TbPlaylist className="text-neutral-400" size={26}/>
               <p className="text-neutral-400 font-medium text-md">Your Library</p>
            </div>
            <AiOutlinePlus onClick={onclick} className="text-neutral-400 cursor-pointer transition hover:text-white" size={20}/>
         </div>
         <div className="flex flex-col gap-y-2 mt-4 px-5">
            {songs.map((song)=>(
               <MediaItem onClick={()=>{}} key={song.id} data={song}/>
            ))}
         </div>
      </div>
      )
   }

export default Library;