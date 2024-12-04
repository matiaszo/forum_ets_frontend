import blueColor from "@/assets/blueColor.jpg";
import Image from "next/image";
import { Answer } from "@/components/answer"
import arrow_send from "@/assets/arrow_black.png"

export default function Topic(){
    const style= {
        image: "h-[4%] w-[10px] rounded-full mt-3"
    }

    return(
        <div className="h-screen">
            <div className="flex m-12 flex-col">
                <h1 className="text-blue1 text-3xl mb-3">Titulo do tópico</h1>

                <div className="flex flex-col items-center rounded-xl p-3 font-robFont mb-3 text-black">
                    <div className="flex flex-col ml-10 min-w-[90%]">
                        <h3 className="ml-1">Texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta
                        texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta
                        texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta texto/pergunta
                        </h3>
                        <div className="flex justify-end text-blue1">Nome do usuario</div>
                    </div>
                    <hr className="w-full border-t-1 border-black"/>
                </div>

                <div className="flex flex-col border-blue5 border-2 rounded-md m-10">
                    <textarea name="ans" id="ans"  className="m-1 text-black placeholder-blue0 p-1 h-30 mb-1 focus:outline-none focus:border-none" placeholder="  Digite sua resposta"></textarea>
                    <button className="bg-blue5 w-20 rounded-md p-2 ml-auto m-1">Send</button>
                </div>
                <Answer/> 
            </div>
        </div>
    )
}