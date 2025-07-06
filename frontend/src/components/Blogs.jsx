import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useState,useEffect } from "react";
import axios from "axios";

export function CardHoverEffectDemo() {

  const [blog,setBlog] = useState([]);

  useEffect(() =>{

    const fetchBlog = async () =>{
    try {
      const response = await axios.get("http://localhost:8080/blogs")
      .then(res =>{
      
      setBlog(res.data);
      
    })
    } catch (error) {
      console.log(error)
    }
  }
  fetchBlog()

  },[])

  return (
    (<div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={blog} />
    </div>)
  );
}


