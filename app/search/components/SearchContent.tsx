"use client"

import LikeButton from "@/components/LikeButton"
import MediaItem from "@/components/MediaItem"
import useOnPlay from "@/hooks/useOnPlay"
import { Song } from "@/types"
import React from "react"

interface SearchContentProps{
   songs: Song[]
}

const SearchContent : React.FC<SearchContentProps> = ({songs}) => {
   const onPlay = useOnPlay(songs)
   return (
      <>
         {songs.length === 0 ? 
            <div className="flex flex-col gap-y-2 px-6 w-full text-neutral-400">No songs match your search</div> 
         :
         <div className="flex flex-col gap-y-2 px-6 w-full">
            {songs.map((song)=>(
               <div key={song.id} className="flex items-center gap-x-4 w-full">
                  <div className="flex-1">
                     <MediaItem onClick={(id:string)=>{onPlay(id)}} data={song}/>
                  </div>
                  <LikeButton id={song.id}/>
               </div>
            ))}
         </div>
         }
      </>
      )
   }

export default SearchContent;