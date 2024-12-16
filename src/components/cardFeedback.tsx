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

    const [eye, setEye] = useState(publico ? view : hide);
    console.log("public", publico)
    // --- MODAL
    const openModal = async () => {

        
        try {
          const response = await fetch(`http://localhost:8080/profile/feedback/${id}`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            }
          });
  
          if (!response.ok) {
            throw new Error('Falha ao alterar a visibilidade do feedback');
          }
  
          const result = await response.text();
          console.log(result);
          
            if (result === "true") {
                setEye(view); 
            } else {
                setEye(hide);
            }
    
        } catch (error) {
          console.error('Erro ao atualizar o feedback:', error);
        }
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
            <h1>ID: {id}</h1>
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
  