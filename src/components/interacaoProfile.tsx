import { useState, useEffect } from "react";
import { CardFeedback } from "./cardFeedback";
import like from "@/assets/like.png";
import stari from "@/assets/stari.png";
import comment from "@/assets/comment.png";
import Image from "next/image";

interface Interacao {
    id: string;
    type: string;
    timestamp: Date;
    content: {
        text: string | null;
        username: string | null;
        title: string | null;
        public: boolean | null;
    };
}

export const InteracaoProfile = () => {
    const [interacoes, setInteracoes] = useState<Interacao[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getAuthData = () => {
        return {
            token: localStorage.getItem("token"),
            id: localStorage.getItem("id"),
        };
    };

    const retorno = getAuthData();

    useEffect(() => {
        const fetchInteracoes = async () => {
            try {
                const response = await fetch(`http://localhost:8080/profile/interactions/${retorno.id}`, {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${retorno.token}` 
                    }
                  });
                if (!response.ok) {
                    throw new Error("Erro ao buscar interações");
                }
                const data = await response.json();
                console.log("DATAAA INTRA",data);
                setInteracoes(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInteracoes();
    }, []);

    if (loading) {
        return <p>Carregando interações...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="w-[100%] shadow-sm h-full p-4 rounded-lg flex flex-col gap-5 mt-5">
            {interacoes && interacoes.length > 0 ? (
                interacoes.map((interacao, index) => (
                    <div key={interacao.id || index} className="flex flex-col gap-5">
                        <div className="w-[90%] flex flex-row justify-between">
                            {interacao.type === "LIKE" ? (
                                <>
                                    <div className="flex flex-row items-center gap-3">
                                        <Image src={like} alt="Like" />
                                        <h1>
                                            Curtiu a publicação de{" "}
                                            <strong>{interacao.content.username}</strong>
                                        </h1>
                                    </div>
                                    <h2>{new Date(interacao.timestamp).toLocaleDateString()}</h2>
                                </>
                            ) : interacao.type === "COMMENT" ? (
                                <>
                                    <div className="flex flex-row items-center gap-3">
                                        <Image src={comment} alt="Comment" />
                                        <h1>
                                            Comentou: <strong>{interacao.content.text}</strong> na
                                            publicação: <strong>{interacao.content.title}</strong>
                                        </h1>
                                    </div>
                                    <h2>{new Date(interacao.timestamp).toLocaleDateString()}</h2>
                                </>
                            ) : interacao.type === "FEEDBACK" && interacao.content.public ? (
                                <>
                                    <div className="flex flex-row items-center gap-3">
                                        <Image src={stari} alt="Feedback" />
                                        <h1>
                                            Avaliou <strong>{interacao.content.username}</strong> como:{" "}
                                            <strong>{interacao.content.text}</strong>
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
                <p className="text-gray-400">Nenhuma interação encontrada.</p>
            )}
        </div>
    );
};
