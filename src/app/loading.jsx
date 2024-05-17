"use client";
import { square } from "ldrs";

export default function HomeLoading() {
  square.register();

  return (
    <div className="flex gap-4 justify-center items-center">
      <l-square
        size="35"
        stroke="5"
        stroke-length="0.25"
        bg-opacity="0.1"
        speed="1.2"
        color="white"
      ></l-square>
    </div>
  );
}

// Default values shown
