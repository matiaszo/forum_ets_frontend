"use client"

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState } from "react";
import ImageComponent from "./image";
import { CldImage } from "next-cloudinary";

type CardData = {
    title: string;
    image: string;
    mainQuestion: string;
}

const limit = 25

const Card = ( {title, image, mainQuestion} : CardData) => {

    // const [img, setImg] = useState<StaticImport | string>('/img')

    // import(`@/assets/${image}`).then((data) => {setImg(data.default)})
    return (
        <>
            <div className={styles.container}> 
                <div className="h-">
                <CldImage
                src={image}
                width="300" 
                height="200"
                crop={{
                    type: 'auto',
                    source: true
                }}
                alt="teste"
                />
                    <h1 className={styles.title} >{title}</h1>
                    <p className={styles.question}> {mainQuestion.substring(0, limit)}{mainQuestion.length > limit ? "..." : ""}
                    </p>
                </div>
            </div>
        </>
    );
}

const styles = {
    container:
      "flex justify-center items-center rounded p-4 shadow-[0_0_5px_2px_rgba(0,0,0,0.3)] ease-in-out duration-300 hover:bg-zinc-200 hover:shadow-[0_0_2px_1px_rgba(0,0,0,0.3)] cursor-pointer",
    img: "rounded h-44 object-cover",
    title: "text-blue1 text-2xl my-2",
    question:"w-full text-sm text-gray-700 overflow-hidden overflow-ellipsis whitespace-nowrap",
  };


export default Card;
