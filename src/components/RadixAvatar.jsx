"use client";
import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import "./radixavatarstyles.css";
import { square } from "ldrs";

square.register();

const RadixAvatar = ({ src, alt }) => (
  <div style={{ display: "flex", gap: 20 }}>
    <Avatar.Root className="AvatarRoot">
      <Avatar.Image
        className="AvatarImage"
        src={src}
        alt={`Avatar of ${alt}`}
      />
      {/* I don't think this is working...yet! */}
      <Avatar.Fallback className="AvatarFallback" delayMs={1000}>
        <l-square
          size="35"
          stroke="5"
          stroke-length="0.25"
          bg-opacity="0.1"
          speed="1.2"
          color="white"
        ></l-square>
      </Avatar.Fallback>
    </Avatar.Root>
  </div>
);

export default RadixAvatar;
