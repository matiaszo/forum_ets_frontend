"use client"
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import placeholder from '@/assets/placeholder.jpg'
import {CldImage} from "next-cloudinary"

interface ImageData{
    src : string;
    width : number;
    height : number;
    alt : string;
    className? : string;
}

const ImageComponent = ({src, width, height, alt, className} : ImageData) =>
{
    const [img, setImg] = useState<StaticImport>(placeholder);

    useEffect(() => 
    {
        // age antes de renderizar a tela
        import(`@/assets/${src}`)
        .then((result) =>
        {
            setImg(result.default);
        })
    }, []);
    return (
        <CldImage src={src} alt={alt} height={height} width={width} className={className}/>
                    
    )
}

export default ImageComponent;
