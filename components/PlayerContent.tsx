"use client"
import { Song } from "@/types";
import React, { useEffect, useState } from "react"
import {BsPauseFill, BsPlayFill} from 'react-icons/bs'
import {AiFillStepBackward, AiFillStepForward} from 'react-icons/ai'
import {HiSpeakerXMark, HiSpeakerWave} from 'react-icons/hi2'
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import useSound from "use-sound";

interface PlayerContentProps{
   song: Song,
   songUrl: string,
}

const PlayerContent : React.FC<PlayerContentProps> = ({song, songUrl}) => {
   const player = usePlayer();
   const [volume, setVolume] = useState(1);
   const [isPlaying, setIsPlaying] = useState(false);
   const [play, {pause, sound}] = useSound(songUrl, {
      volume: volume,
      onplay: ()=>setIsPlaying(true),
      onend: ()=>{
         setIsPlaying(false)
         onPlayNext()
      },
      onpause: ()=>setIsPlaying(false),
      format: ['mp3']
   })
   
   useEffect(()=>{
      sound?.play();
      
      return()=>{
         sound?.unload();
      }
   },[sound])

   const Icon = isPlaying ? BsPauseFill : BsPlayFill
   const VolumeIcon = volume === 0? HiSpeakerXMark: HiSpeakerWave;
   
   const handlePlay = ()=>{
      if (isPlaying) pause()
      else play()
   }

   const toggleMute = ()=>{
      if(volume === 0) setVolume(1)
      else setVolume(0);
   }

   const onPlayNext = ()=>{
      if(player.ids.length === 0) return;

      const currIndex = player.ids.findIndex((id)=>id === player.activeId);
      const nextSong = (currIndex === player.ids.length -1) ? player.ids[0] : player.ids[currIndex+1];
      player.setId(nextSong);
   };

   const onPlayPrevious = ()=>{
      if(player.ids.length === 0) return;

      const currIndex = player.ids.findIndex((id)=>id === player.activeId);
      const nextSong = (currIndex === 0) ? player.ids[player.ids.length-1] : player.ids[currIndex-1];
      player.setId(nextSong);
   };

   return (
      <div className="grid grid-cols-2 md:grid-cols-3 h-full">
         <div className="flex w-full justify-start">
            <div className="flex items-center gap-x-4">
               <MediaItem data={song}/>
               <LikeButton id={song.id}/>
            </div>
         </div>
         <div className="flex md:hidden col-auto w-full justify-end items-center">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer">
               <Icon className="text-black" size={30}/>
            </div>
         </div>
         <div className="md:flex hidden h-full max-w-[722px] gap-x-6 w-full justify-center items-center">
            <AiFillStepBackward size={30} className="text-neutral-400 cursor-pointer hover:text-white transition" onClick={onPlayPrevious}/>
            <div onClick={handlePlay} className="flex h-10 w-10 rounded-full bg-white p-1 cursor-pointer justify-center items-center">
                  <Icon className="text-black" size={30}/>
            </div>
            <AiFillStepForward size={30} className="text-neutral-400 cursor-pointer hover:text-white transition" onClick={onPlayNext}/>
         </div>

         <div className="hidden md:flex w-full justify-end pr-2">
            <div className="flex items-center gap-x-2 w-[120px]">
               <VolumeIcon onClick={toggleMute} className="cursor-pointer" size={30}/>
               <Slider val={volume} onChange={(value)=> setVolume(value)}/>
            </div>
         </div>
      </div>
      )
   }

export default PlayerContent;