"use client";
import { FloatingNavDemo } from "@/components/NavBar";
import { CardHoverEffectDemo } from "@/components/Blogs";

export default function Home() {

  

  return (
    <>
    <FloatingNavDemo></FloatingNavDemo>
    <p className="dark:text-white text-neutral-600 text-center text-4xl mt-40 font-bold">
        Your feed
      </p>
    <CardHoverEffectDemo></CardHoverEffectDemo>
    </>
  );
}
