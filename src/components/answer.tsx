import blueColor from "@/assets/blueColor.jpg";
import Image from "next/image";


export const Answer = () =>{
    const style= {
        image: "h-[4%] w-[10px] rounded-full mt-2"
    }

    return(
        <div className="flex items-center shadow-xl rounded-l p-3 font-robFont mb-3 m-10">
            <div className="flex flex-col ml-5 min-w-[90%]">
                <div className="flex text-blue1 text-xl mb-3">
                <Image className={style.image} src={blueColor}  alt="blue"/>
                    <h1 className="ml-1">Nome do usuario</h1>
                </div>
                <h3 className="ml-1">texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta
                texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta
                texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta
                texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta
                texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta
                </h3>
            </div>
        </div>
    )
}