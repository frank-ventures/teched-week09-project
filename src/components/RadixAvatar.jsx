"use client";
import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import "./radixavatarstyles.css";

const RadixAvatar = ({ src, alt }) => (
  <div style={{ display: "flex", gap: 20 }}>
    <Avatar.Root className="AvatarRoot">
      <Avatar.Image
        className="AvatarImage"
        src={src}
        alt={`Avatar of ${alt}`}
      />
      <Avatar.Fallback className="AvatarFallback" delayMs={600}>
        {alt}
      </Avatar.Fallback>
    </Avatar.Root>
  </div>
);

export default RadixAvatar;
