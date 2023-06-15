"use client"

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"
import qs from 'query-string'
import useDebounce from "../hooks/useDebounce";
import Input from "./Input";

const SearchInput= () => {
   const router = useRouter();
   const [value, setValue] = useState<string>("");
   const debounceVal = useDebounce<string>(value, 500);

   useEffect(()=>{
      const query = {
         title: debounceVal,
      };
      const url = qs.stringifyUrl({
         url: '/search',
         query: query
      })

      router.push(url);
   },[debounceVal, router])
   return (
      <Input placeholder="What is on your mind?" value={value} onChange={(e)=>setValue(e.target.value)}/>
      )
   }

export default SearchInput;