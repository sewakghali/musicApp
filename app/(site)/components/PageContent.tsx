"use client"
import { Song } from "@/types";
import React from "react"
import SongItem from "../../../components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";

interface PageContentProps{
   songs: Song[];
}

const PageContent : React.FC<PageContentProps> = ({songs}) => {
   const onPlay = useOnPlay(songs);
   return (
      <>
      { songs.length === 0 ? 
         <div className="mt-4 text-neutral-400"> No Songs Available</div> 
         :
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-4 2xl:grid-cols-8 gap-4 mt-4">
            {songs.map((song)=>(
               <SongItem data={song} key={song.id} onClick={(id:string)=>{onPlay(id)}}/>
            ))}

         </div>
      }
      </>
   )
}

export default PageContent;