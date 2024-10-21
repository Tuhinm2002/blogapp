"use client";
import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "@/components/ui/tracing-beam";
import axios from "axios";
import { useState,useEffect } from "react";
import calsans from "cal-sans";



export default function TracingBeamDemo() {
      
    const curr_val = window.location.href.slice(-1);
    
    const [responseData,setResponseData] = useState([])
    const [imageUrl,setImageUrl] = useState("");
    
    useEffect(() =>{
        const fetchProduct = async () =>{
        try {
        const val = await axios.get(`http://localhost:8080/blogs/${curr_val}`)
        .then(res =>{
        setResponseData(res.data);

        
        if(res.data.image){
          // fetchImage();
          const fetchImage = async () => {
            const response = await axios.get(
              `http://localhost:8080/blogs/${curr_val}/image`,
              { responseType: "blob" }
            );
            setImageUrl(URL.createObjectURL(response.data));
          };
          fetchImage()
        }

        })
        } catch (error) {
            console.log(error);
        }
        
        }
        fetchProduct()
    },[]) 

  return (
    (<TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
          
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {responseData.username}
            </h2>

            <p className={twMerge(calsans.className, "text-xl mb-4")}>
              {responseData.topic}
            </p>

            <div className="text-sm  prose prose-sm dark:prose-invert">
                
                <Image
                  src={imageUrl}
                  alt="blog thumbnail"
                  height="1000"
                  width="1000"
                  className="rounded-lg mb-10 object-cover" />
              
              {responseData.text}
            
            </div>
          </div>
      
    </TracingBeam>)
  );
}