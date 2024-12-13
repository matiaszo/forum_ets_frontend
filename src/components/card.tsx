"use client"

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState } from "react";
import { StaticImageData } from "next/image";;
import imagem from "@/assets/Matias3.jpg"

type CardData = {
    title: string;
    image: StaticImageData;
    mainQuestion: string;
}

const limit = 25

const Card = ( {title, image, mainQuestion} : CardData) => {

    // const [img, setImg] = useState<StaticImport | string>('/img')

    // import(`@/assets/${image}`).then((data) => {setImg(data.default)})
    const safeMainQuestion = typeof mainQuestion === 'string' ? mainQuestion : '';

    return (
        <>
            <div className={styles.container}> 
                <div className="">
                    <Image src={imagem} alt={"title"} width={250} height={250} className={styles.img} />
                    <h1 className={styles.title} >{title}</h1>
                    <p className={styles.question}> {safeMainQuestion.substring(0, limit)} {safeMainQuestion.length > limit ? '...' : ''}
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
