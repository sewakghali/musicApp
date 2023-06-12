"use client"
import { Song } from "@/types";
import React, { AudioHTMLAttributes, useEffect, useState, useRef } from "react"
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { HiSpeakerXMark, HiSpeakerWave } from 'react-icons/hi2'
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";

interface PlayerContentProps {
   song: Song,
   songUrl: string,
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
   const player = usePlayer();
   const [volume, setVolume] = useState(0.6);
   const [isPlaying, setIsPlaying] = useState(player.isPlaying);
   const [isMuted, setIsMuted] = useState(false);
   const [duration, setDuration] = useState(0);
   const [currentTime, setCurrentTime] = useState(0);
   const audioRef = useRef<HTMLAudioElement>(null);


   // let playerTimer = (time: number) => {
   //    const hrs = ~~(time / 3600);
   //    const mins = ~~((time % 3600) / 60);
   //    const secs = ~~time % 60;
      
   //    // Output like "1:01" or "4:03:59" or "123:03:59"
   //    let ret = "";
      
   //    if (hrs > 0) {
   //       ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
   //    }
      
   //    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
   //    ret += "" + secs;
      
   //    return ret;
   // }

   const Icon = isPlaying ? BsPauseFill : BsPlayFill
   const VolumeIcon = isMuted ? HiSpeakerXMark : HiSpeakerWave;
   
   const onPlayNext = () => {
      if (player.ids.length === 0)  {
         if (audioRef.current) {
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
            // audioRef.current
         }
         return;
      }

      if (player.ids.length === 1) {
         if (audioRef.current) {
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
            audioRef.current.play();
         }
         return;
      }

      const currIndex = player.ids.findIndex((id) => id === player.activeId);
      const nextSong = (currIndex === player.ids.length - 1) ? player.ids[0] : player.ids[currIndex + 1];
      player.setId(nextSong);
   };

   const onPlayPrevious = () => {
      if (player.ids.length === 0) return;
      if (player.ids.length === 1)  {
         if (audioRef.current) {
            setCurrentTime(0);
            audioRef.current.currentTime = 0;
         }
         return;
      }

      const currIndex = player.ids.findIndex((id) => id === player.activeId);
      const nextSong = (currIndex === 0) ? player.ids[player.ids.length - 1] : player.ids[currIndex - 1];
      player.setId(nextSong);
   };

   const handleLoadedMetadata = (e: React.ChangeEvent<HTMLAudioElement>) => {
      setDuration(e.target.duration);
   };

   const handleTimeUpdate = (e: React.ChangeEvent<HTMLAudioElement>) => {
      setCurrentTime(Math.floor(e.target.currentTime));
   };


   const togglePlay = () => {
      if (isPlaying && audioRef) {
         audioRef.current?.pause();
      } else {
         audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
      console.log('play stat: ',isPlaying)
   };

   const changeVolume = (val: number) => {
      setVolume(val)
      if (val === 0) setIsMuted(true);
      if (audioRef.current) {
         audioRef.current.volume = val;
      }
   };

   const toggleMute = () => {
      if (volume === 0 && isMuted) {
         changeVolume(0.6);
      }
      setIsMuted(!isMuted);
   };
   const changePos = (val: number) => {
      // const val = e.target.value;
      setCurrentTime(val * duration)
      if (audioRef.current) {
         audioRef.current.currentTime = val * duration;
      }
      console.log(val*duration);

   }

   useEffect(()=>{
      togglePlay();
   },[songUrl, song, player.isPlaying])

   return (
      <div>
         <audio ref={audioRef} onEnded={onPlayNext} src={songUrl} muted={isMuted} onLoadedMetadata={handleLoadedMetadata} onTimeUpdate={handleTimeUpdate}/>

         <Slider val={(currentTime / duration)} step = {1/duration} onChange={(value) => changePos(value)} label="time bar" />
        
         <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            
            <div className="flex justify-start w-full ">
               <div className="flex items-center gap-x-4 max-w-[100%] truncate">
                  <MediaItem data={song} className="w-[80%]"/>
                  <LikeButton id={song.id} />
               </div>
            </div>
      
            <div className="flex h-full max-w-[722px] md:gap-x-6 gap-x-3 w-full justify-center items-center">
               <AiFillStepBackward size={30} className="text-neutral-400 cursor-pointer hover:text-white transition" onClick={onPlayPrevious} />
               <div onClick={togglePlay} className="flex h-8 w-8 md:w-10 md:h-10 rounded-full bg-white p-1 cursor-pointer justify-center items-center">
                  <Icon className="text-black" size={30} />
               </div>
               <AiFillStepForward size={30} className="text-neutral-400 cursor-pointer hover:text-white transition" onClick={onPlayNext} />
            </div>

            <div className="hidden md:flex w-full justify-end pr-2">
               <div className="flex items-center gap-x-2 w-[120px]">
                  <VolumeIcon onClick={toggleMute} className="cursor-pointer" size={30} />
                  <Slider val={volume} onChange={(value) => changeVolume(value)} label="volume"/>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PlayerContent;