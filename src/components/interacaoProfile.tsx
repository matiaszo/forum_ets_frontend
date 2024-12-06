import { CardFeedback } from "./cardFeedback"

import like from "@/assets/like.png";
import stari from "@/assets/stari.png";
import comment from "@/assets/comment.png";


import Image from "next/image";

interface interacao {
    id: string,
    type : string,
    timestamp : Date,
    content : {
        text : string | null,
        username : string | null,
        title : string | null,
        public : boolean | null,
    }
}

export const InteracaoProfile = ({interacoes} : {interacoes : interacao[]}) => {
    
    return (
        <div className="w-[100%] flex flex-col gap-5 mt-5">
            {interacoes.map((interacoes) => (
                <div key={interacoes.id} className="flex flex-col gap-5 ">
                    <div className="w-[90%] flex flex-row justify-between">
                        {interacoes.type == 'like' ? (
                            <>
                                <div className="flex flex-row items-center gap-3">
                                    <Image src={like} alt="" />
                                    <h1>Curtiu a publicação de <strong>{interacoes.content.username}</strong></h1>
                                </div>
                                <h2>{interacoes.timestamp.toLocaleDateString()}</h2>
                            </>
                        ) : interacoes.type == 'comment' ? (
                            <>
                                <div className="flex flex-row items-center gap-3">
                                    <Image src={comment} alt="" />
                                    <h1>Comentou: <strong>{interacoes.content.text}</strong> na publicação: <strong>{interacoes.content.title}</strong></h1>
                                </div>
                                <h2>{interacoes.timestamp.toLocaleDateString()}</h2>
                            </>
                        ) : (
                            interacoes.content.public ? (
                                <>
                                    <div className="flex flex-row items-center gap-3">
                                        <Image src={stari} alt="" />
                                        <h1>Avaliou <strong>{interacoes.content.username}</strong> como: <strong>{interacoes.content.text}</strong></h1>
                                    </div>
                                    <h2>{interacoes.timestamp.toLocaleDateString()}</h2>
                                </>
                            ) : (
                                <></>
                            )
                        )}
                    </div>
                    <hr />  
                </div>
            ))}
        </div>
    )
}