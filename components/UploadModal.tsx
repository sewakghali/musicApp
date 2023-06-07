"use client"

import React, { useEffect, useState } from "react"
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import useUploadModal from "@/hooks/useUploadModal";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import {toast} from 'react-hot-toast'
import Input from "./Input";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import uniqid from 'uniqid'
import {useSupabaseClient} from '@supabase/auth-helpers-react'

const UploadModal = () => {
   const [isLoading, setIsLoading]=useState(false);
   const router = useRouter();
   const uploadModal = useUploadModal()
   const {user} = useUser()
   const supabaseClient = useSupabaseClient();
   const{register,handleSubmit, reset} = useForm<FieldValues>({
      defaultValues:{
         author: '',
         title: '',
         song: null,
         image: null
      }
   })

   const onChange = (open: boolean)=>{
      if(!open){
         reset()
         uploadModal.onClose();
      }
   }

   const onSubmit: SubmitHandler<FieldValues> = async(values)=>{
      try{
         setIsLoading(true);
         const ImgFile = values.image?.[0];
         const songFile = values.song?.[0];
         if (!user){
            setIsLoading(false);
            return toast.error("Please log in to upload songs")
         }
         if(!ImgFile || !songFile){
            setIsLoading(false);
            toast.error("Missing fields")
            return;
         }

         const unqiueId = uniqid();
         
         const {data:songData, error: songError} = await supabaseClient.storage.from('songs').upload(`song-${values.title}-${unqiueId}`, songFile, {
            cacheControl: '3600',
            upsert: false
         });

         if(songError) {
            setIsLoading(false)
            return toast.error('Failed to upload song'+ songError.message)
         }

         const {data:imgData, error: imgErr} = await supabaseClient.storage.from('images').upload(`image-${values.title}-${unqiueId}`, ImgFile, {
            cacheControl: '3600',
            upsert: false
         });

         if(imgErr) {
            setIsLoading(false)
            return toast.error('Failed to upload image.')
         }

         const {error: supabaseErr} = await supabaseClient.from('songs').insert({
            user_id: user.id,
            title: values.title,
            author: values.author,
            image_path: imgData.path,
            song_path: songData.path
         })

         if(supabaseErr){
            setIsLoading(false);
            return toast.error(supabaseErr.message)
         }

         router.refresh();
         setIsLoading(false);
         toast.success('song uploaded successfully');
         reset();
         uploadModal.onClose();

      }catch(err){
         toast.error("Something went wrong");
      }finally{
         setIsLoading(false);
      }
   }

   useEffect(()=>{
      uploadModal.onClose();
   },[router, uploadModal.onClose])
   return (
      <Modal title="Add a song" description="Upload mp3 files" isOpen={uploadModal.isOpen} onChange={onChange}>
         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
            <Input id="title" disabled={isLoading} {...register('title', {required:true})}placeholder="Song title"/>
            <Input id="author" disabled={isLoading} {...register('author', {required:true})}placeholder="Author name"/>
            <div>
               <div>
                  Select a song file
               </div>
            <Input id="song" disabled={isLoading} type="file" accept=".mp3, .mpeg" {...register('song', {required:true})}/>
            </div>
            <div>
               <div>
                  Select an image
               </div>
            <Input id="song" disabled={isLoading} type="file" accept=".png, .jpg, .jpeg, .svg" {...register('image', {required:true})}/>
            </div>
            <Button disabled={isLoading} type="submit">Create</Button>
         </form>
      </Modal>
      )
   }

export default UploadModal;