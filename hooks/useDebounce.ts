import { useState, useEffect } from "react";

export default function useDebounce<T>(value:T, delay?: number):T{
   const [DbnVal, setDbnVal] = useState<T>(value);
   useEffect(()=>{
      const timer = setTimeout(()=>{
         setDbnVal(value)
      }, delay || 500);

      return ()=>{clearTimeout(timer)};
   },[value, delay])
   return DbnVal;
}