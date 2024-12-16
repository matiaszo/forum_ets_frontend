"use client";
import star from "@/assets/star.png";
import stargray from "@/assets/stargray.png";
import Image from "next/image";
import { useState } from "react";

import view from "@/assets/view.png";
import hide from "@/assets/hide.png";

export const CardFeedback = ({id, stars, text, publico, projectName, isUser, user} : {id: number, stars : number, text: string, publico: boolean, projectName: string, user : {id : number, image: string, name: string}, isUser: Boolean}) => {
  
    const maxStars = 5; 
    const starDisplay = Array.from({length: maxStars}, (_, index) => index < stars ? star : stargray); 

    const [eye, setEye] = useState(view); 

    // --- MODAL
    const openModal = () => {
      publico = !publico;
      setEye(publico ? view : hide);
    };

    return (
      <div className="flex flex-col shadow-md rounded-lg p-8 gap-5 mb-3">
        <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-4">
                <img className="w-14 h-14 object-cover rounded-full" src={user.image} alt="photo" />
                <h1 className="capitalize">{user.name} | {projectName}</h1>
            </div>
            <div className="flex gap-1">
                {starDisplay.map((char, index) => (
                    <Image key={index} src={char} width={24} height={24} alt="image" className="w-6 h-6"/>
                ))}
            </div>
        </div>
        <h1 className="font-robFont font-bold ml-8 text-[20px]">{text}</h1>
        <div className="w-[100%] justify-end flex">
            {isUser ? (
                <button onClick={openModal} >
                    <Image src={eye} alt="edit" className="cursor-pointer" />
                </button>
            ) : (
                <>
                </>
            )}
        </div>
      </div>
    );
  };
  