"use client"

import React, { useState } from "react";
import blueColor from "@/assets/blueColor.jpg";
import Image from "next/image";


export const Answer = () =>{
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const style= {
        image: "h-[3%] w-[6px] rounded-full mt-2"
    }

    return(
        <>
        {isOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md
              transition-all duration-300 ease-out transform opacity-0 translate-y-[-50px] 
                       animate-[fadeInDown_0.6s_ease-out_forwards]">
                <h2 className="text-2xl font-xl mb-4">Digite sua resposta</h2>
                <div className="flex flex-col border-blue5 border-2 rounded-md m-1">
                    <textarea name="ans" id="ans"  className="m-1 text-black placeholder-blue0 p-1 h-30 mb-1 focus:outline-none focus:border-none" placeholder="  Digite aqui"></textarea>
                    <button className="bg-blue5 w-20 rounded-md p-2 ml-auto m-1 text-alice">Send</button>
                </div>
                    <button className="flex flex-end items-center justify-center text-alice bg-red-500 w-16 rounded-md p-1 ml-auto m-1" onClick={closeModal}>Close</button>
              </div>
            </div>
      )}
    
        <div className="flex flex-col bg-blue5 rounded-md shadow-xl mb-3 m-10">
            <div className="flex items-center shadow-inner rounded-md p-3 text-black font-robFont mt-4 m-10 bg-alice">
                <div className="flex flex-col ml-5 min-w-[90%]">
                    <div className="flex text-blue1 text-md mb-3">
                    <Image className={style.image} src={blueColor}  alt="blue"/>
                        <h1 className="ml-1">Nome do usuario</h1>
                    </div>
                    <h3 className="ml-1 text-sm">texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta
                    texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta
                    texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta
                    texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta
                    texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta
                    </h3>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <p className="ml-10 mb-5">Resposta resposta resposta resposta resposta resposta resposta resposta resposta resposta resposta resposta resposta
                resposta resposta resposta resposta resposta resposta resposta resposta resposta resposta resposta resposta resposta resposta resposta
                resposta resposta resposta resposta resposta resposta resposta resposta resposta 
                </p>
                <button className="bg-alice rounded-md mr-10 m-5 p-2" onClick={openModal}>Answer</button>
            </div>
        </div>
        </>
    )
}