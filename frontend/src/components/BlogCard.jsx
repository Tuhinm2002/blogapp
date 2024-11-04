"use client";

import Image from "next/image";
import React from "react";
import {useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export function ThreeDCardDemo(props) {


    const {id} = useParams();
    // const {prodId} = params;
    const [imageUrl,setImageUrl] = useState("");
  
    // {`/src/components/images/${props.imageUrl}`}
  
    useEffect(() => {
    const fetchImage = async () => {
      const responseData = await axios.get(
        `http://localhost:8090/blogs/${props.ind}/image`,
        { responseType: "blob" }
      );
      setImageUrl(URL.createObjectURL(responseData.data));
    };
    fetchImage()
  
  },[id])

  async function deleteBlog(e){
    e.preventDefault()
    try {
      await axios.delete(`http://localhost:8090/blogs/${props.ind}`)
      
    }
    catch(error){
      console.log(error)
    }
  };



  return (
    (<CardContainer className="inter-var">
      <CardBody
        className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white">
          {props.name}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          {props.topic}
        </CardItem>
        <CardItem translateZ="100" rotateX={20} rotateZ={-10} className="w-full mt-4">
          <Image
            src={imageUrl}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail" />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <a
            translateZ={20}
            translateX={-40}
            href={`/update/${props.ind}`}
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
            update →
          </a>

          <button
            translateZ={20}
            translateX={-20}
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            onClick={deleteBlog}>
            delete →
          </button>
          
          <a
            translateZ={20}
            translateX={40}
            // as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            href={`/blogs/${props.ind}`}
            >

            Read more
          </a>
        
        </div>
      </CardBody>
    </CardContainer>)
  );
}
