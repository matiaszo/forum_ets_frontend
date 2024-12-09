"use client"

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState } from "react";

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
                <img src={image} alt={title} width={400} height={400} className={styles.img} />
                <div>
                    <h1 className={styles.title} >{title}</h1>
                    <p className={styles.question}> {content.substring(0, limit)}{content.length > limit ? "..." : ""}</p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: "w-[100%] rounded-lg p-5 shadow-[0_0_5px_2px_rgba(0,0,0,0.3)] ease-in-out duration-300 hover:bg-zinc-200 hover:shadow-[0_0_2px_1px_rgba(0,0,0,0.3)] cursor-pointer",
    img: "rounded w-400 h-400",
    title: "text-blue1 text-2xl my-2",
    question:"w-full text-sm text-gray-700 overflow-hidden overflow-ellipsis whitespace-nowrap",
  };


export default CardNoticia;
