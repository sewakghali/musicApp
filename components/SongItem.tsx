"use client"
import useLoadImage from "../hooks/useLoadImage";
import { Song } from "../types";
import React, { use, useEffect, useState } from "react"
import Image from "next/image"
import PlayButton from "./PlayButton";
import usePlayer from "../hooks/usePlayer";

interface SongItemProps{
   onClick: (id:string)=>void;
   data: Song;
   // isActive?: boolean
}

const SongItem : React.FC<SongItemProps> = ({onClick, data}) => {
   const player= usePlayer();
   const [isPlaying, setIsPlaying] = useState(false);
   // const [isCurrent, setCurrent] = useState(player.activeId);
   const imagePath = useLoadImage(data)
   const handleOnClick = (val: string)=>{
      // whenever player.isPlaying change, it toggle music pause/play.
      if(data.id === player.activeId && isPlaying){
         setIsPlaying(false)
         player.setIsPlaying(true);
      }
      else if(data.id === player.activeId && !isPlaying){
         setIsPlaying(true);
         player.setIsPlaying(false);
      }
      else{
         player.setIsPlaying(false);
         setIsPlaying(true);
         onClick(val);
      }
   }

   useEffect(()=>{
       if(data.id === player.activeId && !isPlaying){
         setIsPlaying(true);
      }
   },[player.activeId]);

   return (
      <div onClick={()=>{handleOnClick(data.id)}} className={`relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-300/100 group transition p-3 ${(isPlaying && player.activeId === data.id) && " border-slate-400 border-2"}`}>
         <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
            <Image className="object-cover" src={imagePath || '/images/liked.png'} fill alt="SongCoverImage"/>

            {/* if the music is playing, it renders this scaleloader */}
            
         </div>
         <div className="flex flex-col items-start w-full pt-4 gap-y-1">
            <p className="font-semibold group-hover:text-black  truncate w-full">{data.title}</p> 
            <p className="text-neutral-400 group-hover:text-black text-sm pb-4 truncate w-full">{data.author}</p>       
         </div>
         <div className="absolute bottom-24 right-5">
            {/* if the music isPlaying, it shows pause button and vice-versa */}
            <PlayButton isPlaying={(isPlaying && player.activeId === data.id) ? true : false}/>
         </div>
      </div>
      )
   }

export default SongItem;