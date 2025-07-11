"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FloatingNavDemo } from "@/components/NavBar";
import { useState } from "react";
import axios from "axios";


export default function SignupFormDemo() {

  const curr_val = window.location.href.slice(-1);

  const [email,setEmail] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [text,setText] = useState("");
  const [topic,setTopic] = useState("");
  const [file, setFile] = useState([]);
  
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  


  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    const username = firstName + lastName;
    formdata.append("username",username);
    formdata.append("text",text);
    formdata.append("email",email);
    formdata.append("topic",topic);
    formdata.append("img",file);

    console.log(formdata)

    try {

     axios.put(`http://localhost:8080/update/${curr_val}`,
        formdata, {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      ).then(response =>{
        console.log(response.data)
      })
      
    } catch (error) {
      console.log(error);
    }
  };


  return (
  
    (
      <>
      <FloatingNavDemo></FloatingNavDemo>
    <div
      className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to BugBlogger App
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Write your blogs on bugs or some other creative tech ideas here 
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div
          className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          
          
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" 
            value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          </LabelInputContainer>
          
          
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" 
            value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          </LabelInputContainer>
        
        </div>
        
        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" 
          value={email} onChange={(e) => setEmail(e.target.value)}/>
        </LabelInputContainer>
        
        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="techStack">Tech Stack or Topic</Label>
          <Input id="techStack" placeholder="java,js,python,etc" type="text" 
          value={topic} onChange={(e) => setTopic(e.target.value)}/>
        </LabelInputContainer>
        
        
        <LabelInputContainer className="mb-8 h-48">
          <Label htmlFor="blogText" >Your Idea</Label>
          <textarea id="blogText" placeholder="let your creativity out here" type="text" 
          className="h-48 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
        file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
        focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
         disabled:cursor-not-allowed disabled:opacity-50
         dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
         group-hover/input:shadow-none transition duration-400" 
         value={text} onChange={(e) => setText(e.target.value)}/>
        </LabelInputContainer>

        <div
      className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <input type="file" onChange={handleFileUpload} />
      </div>
        
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit">
          Update Blog &rarr;
          <BottomGradient />
        </button>
      
      </form>
    </div>
    </>)
  );
}

const BottomGradient = () => {
  return (<>
    <span
      className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span
      className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>);
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    (<div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>)
  );
};
