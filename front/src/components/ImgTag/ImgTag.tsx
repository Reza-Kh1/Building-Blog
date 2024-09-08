"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import LoadingImg from '../LoadingImg/LoadingImg';
import ImageError from "@/../public/errorImage.png"
type ImageType = {
    src: any;
    alt: string | null;
    className?: string;
    width: number;
    height: number;
    classPlus?: string;
};
export default function ImgTag({
    width, height, src, alt, className, classPlus
}: ImageType) {
    const [load, setLoad] = useState<boolean>(true);
    const [srcError, setSrcError] = useState<any>();
    return (
        <figure className="relative w-full">
            <Image
                width={width}
                height={height}
                loading="lazy"
                layout='responsive'
                // placeholder="blur"
                // blurDataURL="data:image/gif;base64,..."
                onLoad={() => setLoad(false)}
                src={srcError || src || ""}
                alt={alt || ""}
                className={
                    className ||
                    `${classPlus} rounded-md shadow-md  table mx-auto` ||
                    "rounded-md shadow-md w-full table mx-auto object-fill"
                }
                onError={() => setSrcError(ImageError)}
            />
            {load && <LoadingImg />}
        </figure>
    )
}
