import blueColor from "@/assets/blueColor.jpg";
import Image from "next/image";
import { Answer } from "@/components/answer"

export default function Topic(){
    const style= {
        image: "h-[4%] w-[10px] rounded-full mt-3"
    }

    return(
        <>
            <div className="flex m-12 flex-col">
            <h1 className="text-blue1 text-3xl mb-3">Titulo do tópico</h1>

            <div className="flex items-center shadow-2xl rounded-xl p-3 font-robFont mb-3">
                <div className="flex flex-col ml-10 min-w-[90%]">
                    <h3 className="ml-1">Texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta
                    texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta
                    texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta
                    </h3>
                    <div className="flex justify-end text-blue3">Nome do usuario</div>
                </div>
            </div>

            <Answer/>
            </div>
        </>
    )
}