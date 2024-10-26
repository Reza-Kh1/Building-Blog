"use client";
import Image from "next/image";
import React, { useState } from "react";
import LoadingImg from "../LoadingImg/LoadingImg";
import ImageError from "@/../public/errorImage.png";
type ImageType = {
  src: any;
  alt: string | null;
  className?: string;
  width?: number;
  height?: number;
  classPlus?: string;
  figureClass?: string;
};
export default function ImgTag({
  width,
  height,
  src,
  alt,
  className,
  classPlus,
  figureClass,
}: ImageType) {
  const [load, setLoad] = useState<boolean>(true);
  return (
    <figure className={figureClass || "w-full relative"}>
      <Image
        width={width}
        height={height}
        loading="lazy"
        // placeholder="blur"
        // blurDataURL="data:image/gif;base64,..."
        onLoad={() => setLoad(false)}
        src={src || ""}
        alt={alt || ""}
        className={
          className ||
          `${classPlus} rounded-md shadow-md  table mx-auto` ||
          "rounded-md shadow-md w-full table mx-auto object-fill"
        }
        onError={({ currentTarget }: any) => {
          currentTarget.onerror = null;
          currentTarget.src = ImageError;
        }}
      />
      {load && <LoadingImg />}
    </figure>
  );
}
