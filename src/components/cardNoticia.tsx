"use client"

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState } from "react";

import { CldImage  } from 'next-cloudinary';

type CardData = {
    title: string;
    image: string;
    content: string;
}

const limit = 25

const CardNoticia = ( {title, image, content} : CardData) => {
    return (
        <div className={styles.container}> 
            <div className="flex flex-row gap-5">
            <CldImage
            src={image}
            width="400" 
            height="250"
            crop={{
                type: 'auto',
                source: true
            }}
            alt="teste"
            />
                <div>
                    <h1 className={styles.title} >{title}</h1>
                    <p className={styles.question}> {content.substring(0, limit)}{content.length > limit ? "..." : ""}</p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: "w-[100%] rounded-lg p-5 shadow-[0_0_5px_2px_rgba(0,0,0,0.3)] ease-in-out duration-300 hover:bg-zinc-200 dark:hover:bg-neutral-700 dark:bg-zinc-900 hover:shadow-[0_0_2px_1px_rgba(0,0,0,0.3)] cursor-pointer",
    img: "rounded w-400 h-400",
    title: "text-blue1 text-2xl my-2 dark:text-blue5",
    question:"w-full text-sm text-gray-700 overflow-hidden overflow-ellipsis whitespace-nowrap dark:text-blue4",
  };


export default CardNoticia;
