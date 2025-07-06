"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "@/components/ui/tracing-beam";
import axios from "axios";
import calsans from "cal-sans";
import useSWR from "swr";

const curr_val = window.location.href[window.location.href.length - 1];

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function TracingBeamDemo() {
  const [imageUrl, setImageUrl] = useState("");
  const { data, error } = useSWR(`http://localhost:8080/blogs/${curr_val}`, fetcher);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/blogs/${curr_val}/image`,
          { responseType: "blob" }
        );
        const imgUrl = URL.createObjectURL(response.data);
        console.log("Image URL:", imgUrl);
        setImageUrl(imgUrl);
      } catch (err) {
        console.error("Image fetch error:", err);
      }
    };

    if (data && data.image) {
      fetchImage();
    }
  }, [data]);

  if (error) return <div className="text-red-500">Failed to load data.</div>;
  if (!data) return <div className="text-gray-500">Loading...</div>;

  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
          {data.username || "No username"}
        </h2>

        <p className={twMerge(calsans.className, "text-xl mb-4")}>
          {data.topic || "No topic"}
        </p>

        <div className="text-sm prose prose-sm dark:prose-invert">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="blog thumbnail"
              height={1000}
              width={1000}
              className="rounded-lg mb-10 object-cover"
            />
          ) : (
            <div className="text-gray-400">No image available</div>
          )}

          {data.text ? <p>{data.text}</p> : <p className="text-gray-400">No content</p>}
        </div>
      </div>
    </TracingBeam>
  );
}
