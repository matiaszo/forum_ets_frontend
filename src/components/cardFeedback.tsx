
import star from "@/assets/star.png";
import stargray from "@/assets/stargray.png";
import Image from "next/image";

export const CardFeedback = ({stars, text, publico, projectName, user} : {stars : number, text: string, publico: boolean, projectName: string, user : {id : string, image: string, name: string}}) => {
  
    const maxStars = 5; 
    const starDisplay = Array.from({length: maxStars}, (_, index) => index < stars ? star : stargray); 

    return (
      <div className="flex flex-col shadow-lg rounded-lg p-8 gap-5">
        <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-4">
                <img className="w-14 rounded-full" src={user.image} alt="photo" />
                <h1>{user.name} | {projectName}</h1>
            </div>
            <div className="flex gap-1">
                {starDisplay.map((char, index) => (
                    <Image key={index} src={char} width={24} height={24} alt="image" className="w-6 h-6"/>
                ))}
            </div>
        </div>
        <h1 className="font-robFont font-bold ml-8 text-[20px]">{text}</h1>
      </div>
    );
  };
  