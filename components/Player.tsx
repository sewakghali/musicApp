"use client"
import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import React from "react"
import PlayerContent from "./PlayerContent";

const Player = () => {
   const player = usePlayer()
   const {song} = useGetSongById(player.activeId);
   const songUrl = useLoadSongUrl(song!);

   return (
      <>
         {(!song || !songUrl || !player.activeId) ?
            null
         :
            <div className="bottom-0 fixed bg-black w-full py-2 h-[80px] px-4">
               <PlayerContent song={song} songUrl={songUrl} key={songUrl}/>
            </div>
         }
      </>
      )
   }

export default Player;