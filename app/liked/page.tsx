export const revalidate = 0;
import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";
import Image from "next/image";
import React from "react"
import LikedContent from "./components/LikedContent";

const Liked  = async () => {
   const LikedSongs = await getLikedSongs();
   return (
      <div className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
         <Header>
            <div className="mt-20">
               <div className="flex flex-col md:flex-row items-center gap-x-5">
                  <div className="relative h-32 w-32 lg:h-44 lg:w-44">
                     <Image fill src={'/images/liked.png'} alt="Liked Songs" className="object-cover"/>
                  </div>
                  <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                     <p className="hidden md:block font-semibold text-sm">PlayList</p>
                     <h1 className="tezt-white text-4xl sm:text-5xl md:text-7xl font-bold">
                        Liked Songs
                     </h1>
                  </div>
               </div>
            </div>
         </Header>
         <LikedContent songs={LikedSongs}/>
      </div>
      )
   }

export default Liked;