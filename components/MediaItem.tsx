"use client"
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import React from "react"
import {twMerge} from "tailwind-merge";

interface MediaItemProps{
   data: Song;
   onClick?: (id:string)=>void;
   className?: string
}

const MediaItem : React.FC<MediaItemProps> = ({data, onClick, className}) => {
   const imageUrl = useLoadImage(data);

   const handleClick =()=>{
      if(onClick) return onClick(data.id);
      // return 
   }
   return (
      <div className={twMerge("flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md", className)} onClick={handleClick}>
         <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
            <Image src={imageUrl || '/images/liked.png'} alt={"media item"} className="object-cover" fill/>
         </div>
         <div className="flex flex-col gap-y-1 overflow-hidden">
            <p className="text-white truncate">{data.title}</p>
            <p className="text-neutral-400 text-sm truncate">{data.author}</p>
         </div>
      </div>
      )
   }

export default MediaItem;