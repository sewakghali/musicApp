import React from "react"
import {FaPlay, FaPause} from 'react-icons/fa'

interface PlayButtonProps{
   isPlaying?: boolean;
}

const PlayButton: React.FC<PlayButtonProps> = ({isPlaying=false}) => {
   return (
      <button className="transition opacity-0 bg-green-500 rounded-full flex items-center justify-center p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
         {isPlaying ? <FaPause className="text-black"/>:<FaPlay className="text-black"/>}
      </button>
      )
   }

export default PlayButton;