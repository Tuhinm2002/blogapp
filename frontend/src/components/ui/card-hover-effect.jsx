"use client";
import { cn } from "@/lib/utils";
import { ThreeDCardDemo } from "../BlogCard";

export const HoverEffect = ({
  items,
  className
}) => {

  return (
    (<div
      className={cn("grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 gap-x-8", className)}>
      {items.map((item, idx) => (
        <ThreeDCardDemo></ThreeDCardDemo>
      ))}
    </div>)
  );
};

