"use client"
import React from "react"
import * as RadixSlider from '@radix-ui/react-slider'

interface SliderProps{
   val?: number;
   onChange?: (value:number)=>void;
   step?: number;
   label: string;
}

const Slider : React.FC<SliderProps> = ({val=1, onChange, step=0.1, label}) => {
   const handleChange = (newVal: number[])=>{
      onChange?.(newVal[0]);
   }
   return (
      <RadixSlider.Root className="relative flex items-center select-none touch-none w-full h-6 cursor-pointer" defaultValue={[1]} value={[val]} onValueChange={handleChange} max={1} step={step} aria-label={label}>
         <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
            <RadixSlider.Range className=" absolute bg-white rounded-full h-full" />
         </RadixSlider.Track>
      </RadixSlider.Root>
      )
   }

export default Slider;