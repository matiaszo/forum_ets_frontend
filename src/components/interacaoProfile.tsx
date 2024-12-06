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
        <div className="w-[100%] shadow-sm h-full p-4 rounded-lg flex flex-col gap-5 mt-5">
            {interacoes && interacoes.length > 0 ? (
                interacoes.map((interacao) => (
                    <div key={interacao.id} className="flex flex-col gap-5">
                        <div className="w-[90%] flex flex-row justify-between">
                            {interacao.type === 'like' ? (
                                <>
                                    <div className="flex flex-row items-center gap-3">
                                        <Image src={like} alt="" />
                                        <h1>
                                            Curtiu a publicação de <strong>{interacao.content.username}</strong>
                                        </h1>
                                    </div>
                                    <h2>{new Date(interacao.timestamp).toLocaleDateString()}</h2>
                                </>
                            ) : interacao.type === 'comment' ? (
                                <>
                                    <div className="flex flex-row items-center gap-3">
                                        <Image src={comment} alt="" />
                                        <h1>
                                            Comentou: <strong>{interacao.content.text}</strong> na publicação: <strong>{interacao.content.title}</strong>
                                        </h1>
                                    </div>
                                    <h2>{new Date(interacao.timestamp).toLocaleDateString()}</h2>
                                </>
                            ) : interacao.type === 'feedback' && interacao.content.public ? (
                                <>
                                    <div className="flex flex-row items-center gap-3">
                                        <Image src={stari} alt="" />
                                        <h1>
                                            Avaliou <strong>{interacao.content.username}</strong> como: <strong>{interacao.content.text}</strong>
                                        </h1>
                                    </div>
                                    <h2>{new Date(interacao.timestamp).toLocaleDateString()}</h2>
                                </>
                            ) : null}
                        </div>
                        <hr />
                    </div>
                ))
            ) : (
                <p className='text-gray-400'>Nenhuma interação encontrada.</p>
            )}
        </div>
    )
}